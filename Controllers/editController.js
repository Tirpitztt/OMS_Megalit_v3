const {COMPLECT_TYPE, DETAIL_TYPE,
    HANDEL_TYPE, MONTAZ_TYPE, CARDS_TYPE} = require('../Utils/const_variables')
const History = require('../Utils/Classes/History')
const Model = require('../models')
const calc = require('../Utils/support')
const HandlingHistory = require("../Utils/Classes/Handling-History");
const MontazHistory = require("../Utils/Classes/Montaz-History");
const ResultHistoryObj = require('../Utils/Classes/Result-History-obj')

class EditController {
    constructor() {
        this.updateOrder = this.updateOrder.bind(this)

    }
    async editOrder(req,res){ //выдает заказ на просмотр и редактирование
        try{
            let isFind = false
            const order = await Model.orders.findOne({
                where:{
                    id:req.params['orderId']
                },include:[{
                    model:Model.termins
                },{
                    model:Model.complects,
                    include:Model.complect_items
                },{
                    model:Model.handlings,
                    include:Model.handling_items
                },{
                    model:Model.montaz,
                    include:Model.montaz_items
                },{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.cards
                }]
            })
            let customer = null
            if(order){
                isFind = true
                customer = await Model.customers.findOne({
                    where:{
                        id:order.customerId
                    }
                })
            }
            const result = {customer,order,isFind}


            return res.status(201).json(result);
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }


    async updateOrder(req,res){
        try{
            let result = false
            const history = new History(req.body.orderOption.orderId) // создаем историю заказа
            history.setBaseOptions({
                employer:req.body.orderOption.employer,
                date:req.body.orderOption.today
            })
            const handHistory = new HandlingHistory(req.body.orderOption.orderId)  //создаем историю обработки
            const montazHistory = new MontazHistory(req.body.orderOption.orderId)  //создаем историю монтажа
            const originalOrder = await Model.orders.findOne({
                where:{
                    id:req.body.orderOption.orderId
                },include:[{
                    model:Model.termins
                },{
                    model:Model.complects,
                    include:Model.complect_items
                },{
                    model:Model.handlings,
                    include:Model.handling_items
                },{
                    model:Model.montaz,
                    include:Model.montaz_items
                },{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.cards
                }]
            })
            if(originalOrder.termin.date_finish !== req.body.orderOption.termin){
                const result = await this.updateTermin(originalOrder,req.body.orderOption.termin,res)
                history.setTermin(result)
            }
            if(originalOrder.handling.hydrophob !== req.body.newOrder.handling.hydrophob){
                const result = await this.updateHydrophob(originalOrder,req.body.newOrder)
                handHistory.setHydrophob(result)
                history.setEdit(true)
            }
            if(originalOrder.handling.text_grav !== req.body.newOrder.handling.text_grav){
                const result = await this.updateText(originalOrder,req.body.newOrder,res)
                handHistory.setTextGrav(result)
                history.setEdit(true)
            }
            if(originalOrder.montaz.height !== req.body.newOrder.montaz.height ||
                originalOrder.montaz.width !== req.body.newOrder.montaz.width ||
                originalOrder.montaz.weight !== req.body.newOrder.montaz.weight){
                    const result = await  this.updateSize(originalOrder,req.body.newOrder,res)
                    montazHistory.setSize(result)
                    history.setEdit(true)
            }
            if(originalOrder.montaz.delivery !== req.body.newOrder.montaz.delivery){
                const result = await  this.updateDelivery(originalOrder,req.body.newOrder,res)
                montazHistory.setDelivery(result)
                history.setEdit(true)
            }
            if(originalOrder.montaz.delivery_point !== req.body.newOrder.montaz.delivery_point){
                const result = await  this.updateDeliveryPoint(originalOrder,req.body.newOrder,res)
                montazHistory.setDeliveryPoint(result)
                history.setEdit(true)
            }
            if(originalOrder.montaz.guaranties !== req.body.newOrder.montaz.guaranties){
                const result = await  this.updateGuaranties(originalOrder,req.body.newOrder,res)
                montazHistory.setGuaranties(result)
                history.setEdit(true)
            }
            if(originalOrder.notice !== req.body.orderOption.notice){
                const result = await this.updateNotice(originalOrder,req.body.orderOption,res)
                history.setNotice(result)
            }
            if(originalOrder.calculation.total_cost !== req.body.newOrder.calculation.new_total_cost){
                const result = await this.updateCalculation(originalOrder,req.body.newOrder,res)
                history.setCalculation(result)
                history.setEdit(true)
            }

            history.setHandling(handHistory) //сохраняем обработку в историю
            history.setMontaz(montazHistory) // сохраняем монтаж в историю
            const beforeComplects = [...originalOrder.complects]
            const afterComplects = [...req.body.newOrder.complects]
            const beforeHandel = [...originalOrder.handling.handling_items]
            const afterHandel = [...req.body.newOrder.handling.handling_items]
            const beforeMontaz = [...originalOrder.montaz.montaz_items]
            const afterMontaz = [...req.body.newOrder.montaz.montaz_items]
            const beforeCards = [...originalOrder.cards]
            const afterCards = [...req.body.newOrder.cardsList]

            //получаем уникальные наборы деталей у которых нет пары
            const uniqueComplects = this.getUniqueKit([...beforeComplects,...afterComplects])
            const uniqueHandel = this.getUniqueKit([...beforeHandel,...afterHandel])
            const uniqueMontaz = this.getUniqueKit([...beforeMontaz,...afterMontaz])
            const uniqueCards = this.getUniqueKit([...beforeCards,...afterCards])

            //получаем удаленные и добавленные детали из наборов
            const handling_items = await this.editComplects(beforeHandel,afterHandel,uniqueHandel,HANDEL_TYPE,res)
            history.setHandlingItems(handling_items)
            const montaz_items = await this.editComplects(beforeMontaz,afterMontaz,uniqueMontaz,MONTAZ_TYPE,res)
            history.setMontazItems(montaz_items)
            const complects = await this.editComplects(beforeComplects,afterComplects,uniqueComplects,COMPLECT_TYPE,res)
            history.setComplects(complects)
            const cards = await this.editComplects(beforeCards,afterCards,uniqueCards,CARDS_TYPE,res)
            history.setCards(cards)

            //получаем наборы деталей у которых есть пара
            const doubleComplects = this.getDoubleKit([...beforeComplects,...afterComplects])

            //получаем уникальные наборы деталей из парных наборов комплектов
            if(doubleComplects.length && beforeComplects.length && afterComplects.length){ // работает только с теми комплектами у которых есть пара айдишников
                for(let i=0;i < beforeComplects.length;i++){
                    for(let j = 0;j < afterComplects.length;j++){
                        if(beforeComplects[i].id === afterComplects[j].id){  //ищем совпадение айдишников
                            const uniqueDetails = this.getUniqueKit([...beforeComplects[i].complect_items,...afterComplects[j].complect_items])
                            const tempObj = await this.editComplects(beforeComplects[i].complect_items,afterComplects[j].complect_items,uniqueDetails,DETAIL_TYPE,res) // проверяем детали на добавление или удаление
                            history.setComplectItems(tempObj)
                        }
                    }
                }
            }
            if(history.isEdit){
                result = await this.addEditHistory(history,res)
            }
            return res.status(200).json(result)
        }catch (e) {
            return res.status(500).json({message:'update order err...'+ e.message});
        }
    }
    //достаем уникальные объекты, те у которых нет пары в объединенном массиве
    getUniqueKit(mergeArray){
        const count = new Map()  //здесь храним счетчик вхождений в массив
        for(const obj of mergeArray){
            const key = obj.id
            count.set(key,(count.get(key)||0)+1)  //сетаем в Мар количество вхождений в массив
        }
        return mergeArray.filter(obj=>{
            const key = obj.id
            return count.get(key) === 1  //отбираем только те что входят единожды
        })

    }
    // достаем только парные объекты в объединенном массиве
    getDoubleKit(mergeArray){
        const count = new Map()  //здесь храним счетчик вхождений в массив
        for(const obj of mergeArray){
            const key = obj.id
            count.set(key,(count.get(key)||0)+1)  //сетаем в Мар количество вхождений в массив
        }
        const matchComplects = mergeArray.filter(obj=>{
            const key = obj.id
            return count.get(key) > 1   //отбираем комплекты у которых есть пары
        })
        return Array.from(new Map(matchComplects.map(obj=>[obj.id,obj])).values()) // удаляем дубликаты
    }
    //внутренний метод
    async editComplects(before,after,uniqueComplects,type,res){
        try{
            let deleted = []
            let added = []

            // проверяем каждый комплект на наличие в before (удален) и в after (добавлен)
            for(let i = 0;i<uniqueComplects.length;i++){
                for(let j = 0;j<before.length;j++){
                    if(uniqueComplects[i].id === before[j].id){
                        if(type === COMPLECT_TYPE){
                            await this.deleteComplectOfId(uniqueComplects[i].id,res)
                            deleted.push(uniqueComplects[i])
                        }else if(type === DETAIL_TYPE){
                            //метод удаления детали
                            await this.deleteDetail(uniqueComplects[i].id,res)
                            deleted.push(uniqueComplects[i])
                        }else if(type === HANDEL_TYPE){
                            //метод удаления детали обработки
                            await this.deleteHandel(uniqueComplects[i].id,res)
                            deleted.push(uniqueComplects[i])
                        }else if(type === MONTAZ_TYPE){
                            //метод удаления детали монтажа
                            await this.deleteMontaz(uniqueComplects[i].id,res)
                            deleted.push(uniqueComplects[i])
                        }else if(type === CARDS_TYPE){
                            //метод удаления эскиза
                            await this.deleteCard(uniqueComplects[i].id,res)
                            deleted.push(uniqueComplects[i])
                        }
                    }
                }
                for(let l = 0;l<after.length;l++){
                    if(uniqueComplects[i].id === after[l].id){
                        if(type === COMPLECT_TYPE){
                            //метод добавления комплектов
                            await this.addComplect(uniqueComplects[i],res)
                            added.push(uniqueComplects[i])
                        }else if(type === DETAIL_TYPE){
                            //метод добавления детали
                            await this.addDetail(uniqueComplects[i],res)
                            added.push(uniqueComplects[i])
                        }else if(type === HANDEL_TYPE){
                            //метод добавления детали обработки
                            await this.addHandlings(uniqueComplects[i],res)
                            added.push(uniqueComplects[i])
                        }else if(type === MONTAZ_TYPE){
                            //метод добавления детали монтажа
                            await this.addMontaz(uniqueComplects[i],res)
                            added.push(uniqueComplects[i])
                        }else if(type === CARDS_TYPE){
                            //метод добавления эскиза
                            await this.addCard(uniqueComplects[i],res)
                            added.push(uniqueComplects[i])
                        }
                    }
                }
            }

            return {
                added:added,
                deleted:deleted
            }
        }catch (e) {
            return res.status(500).json({message:'edit complect method err...'+ e.message});
        }
    }
    //внутренний метод
    async addComplect(complect,res){
        //console.log(complect)
        try{
            const complectNew = await Model.complects.create({
                orderId:complect.orderId,
                summComplect:complect.summComplect,
                type:complect.type
            })
            complect.complect_items.forEach(await function(detal){
                Model.complect_items.create({
                    complectId:complectNew.id,
                    name:detal.name,
                    articul:detal.articul,
                    type:detal.type,
                    sort:detal.sort,
                    material:detal.material,
                    status:detal.status,
                    local:detal.local,
                    height:detal.height,
                    width:detal.width,
                    weight:detal.weight,
                    price:detal.price,
                    amount:detal.amount,
                    rate:detal.rate
                });
            })

        }catch (e) {
            return res.status(500).json({message:'complect not added...'+ e.message});
        }
    }
    //внутренний метод
    async addDetail(detal,res){
        try{
            Model.complect_items.create({
                complectId:detal.complectId,
                name:detal.name,
                articul:detal.articul,
                type:detal.type,
                sort:detal.sort,
                material:detal.material,
                status:detal.status,
                local:detal.local,
                height:detal.height,
                width:detal.width,
                weight:detal.weight,
                price:detal.price,
                amount:detal.amount,
                rate:detal.rate
            })
        }catch (e) {
            return res.status(500).json({message:'detail not added...'+ e.message});
        }

    }
    //внутренний метод
    async addHandlings(handel,res){
        try{
           await Model.handling_items.create({
                handlingId:handel.handlingId,
                name:handel.name,
                category:handel.category,
                size:handel.size,
                price:handel.price,
                amount:handel.amount,
                rate:handel.rate
            })

        }catch (e) {
            return res.status(500).json({message:'add Handel is broken...'+ e.message});
        }
    }
    //внутренний метод
    async addMontaz(montaz,res){
        try{
            await Model.montaz_items.create({
                montazId:montaz.montazId,
                name:montaz.name,
                category:montaz.category,
                type:montaz.type,
                price:montaz.price,
                amount:montaz.amount,
                rate:montaz.rate
            })

        }catch (e) {
            return res.status(500).json({message:'add montaz is broken...'+ e.message});
        }
    }
    //внутренний метод
    async addCard(card,res){
        try{
            await Model.cards.create({
                orderId:card.orderId,
                type:card.type,
                link:card.link
            })
        }catch (e) {
            return res.status(500).json({message:'add CARD is broken...'+ e.message});
        }
    }
    //внутренний метод
    async deleteCard(id,res){
        try{
            await Model.cards.destroy({
                where:{
                    id:id
                }
            })
        }catch (e) {
            return res.status(500).json({message:'delete CARD is broken...'+ e.message});
        }
    }

    //внутренний метод
    async deleteMontaz(id,res){
        try{
            await Model.montaz_items.destroy({
                where:{
                    id:id
                }
            })

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    //внутренний метод
    async deleteHandel(id,res){
        try{
            await Model.handling_items.destroy({
                where:{
                    id:id
                }
            })
        }catch (e) {
            return res.status(500).json({message:'delete handel wrong...'+ e.message});
        }
    }
    //внутренний метод
    async deleteDetail(id,res){
        try{
            await Model.complect_items.destroy({
                where:{
                    id:id
                }
            })
        }catch (e) {
            return res.status(500).json({message:'delete detailId wrong...'+ e.message});
        }
    }
    //внутренний метод
    async deleteComplectOfId(id,res){
        try{
            await Model.complect_items.destroy({
                where:{
                    complectId:id
                }
            })
            await Model.complects.destroy({
                where:{
                    id:id
                }
            })
            //console.log(id)
        }catch (e) {
            return res.status(500).json({message:'complect deleted error...'+ e.message});
        }
    }
    //внутренний метод
    async updateTermin(orderBefore,orderAfter,res){
        try{
            await Model.termins.update({
                date_finish:orderAfter
            },{
                where:{
                    id:orderBefore.termin.id
                }
            })
            return new ResultHistoryObj(orderBefore.termin.date_finish,orderAfter)
        }catch (e) {
            return res.status(500).json({message:'update termin is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateHydrophob(orderBefore,orderAfter,res){
        try{
            await Model.handlings.update({
                hydrophob:orderAfter.handling.hydrophob
            },{
                where:{
                    id:orderBefore.handling.id
                }
            })
            return new ResultHistoryObj(orderBefore.handling.hydrophob,orderAfter.handling.hydrophob)
        }catch (e) {
            return res.status(500).json({message:'update HYDRO is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateText(orderBefore,orderAfter,res){
        try{
            await Model.handlings.update({
                text_grav:orderAfter.handling.text_grav
            },{
                where:{
                    id:orderBefore.handling.id
                }
            })
            return new ResultHistoryObj(orderBefore.handling.text_grav,orderAfter.handling.text_grav)
        }catch (e) {
            return res.status(500).json({message:'update text is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateSize(orderBefore,orderAfter,res){
        try{
            const before = orderBefore.montaz.height + ' X ' + orderBefore.montaz.width + ' X ' + orderBefore.montaz.weight
            const after = orderAfter.montaz.height + ' X ' + orderAfter.montaz.width + ' X ' + orderAfter.montaz.weight

            await Model.montaz.update({
                height:orderAfter.montaz.height,
                width:orderAfter.montaz.width,
                weight:orderAfter.montaz.weight
            },{
                where:{
                    id:orderBefore.montaz.id
                }
            })
            return new ResultHistoryObj(before,after)
        }catch (e) {
            return res.status(500).json({message:'update SIZE is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateDelivery(orderBefore,orderAfter,res){
        try{
            await Model.montaz.update({
                delivery:orderAfter.montaz.delivery
            },{
                where:{
                    id:orderBefore.montaz.id
                }
            })
            return new ResultHistoryObj(orderBefore.montaz.delivery,orderAfter.montaz.delivery)

        }catch (e) {
            return res.status(500).json({message:'update delivery is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateDeliveryPoint(orderBefore,orderAfter,res){
        try{
            await Model.montaz.update({
                delivery_point:orderAfter.montaz.delivery_point
            },{
                where:{
                    id:orderBefore.montaz.id
                }
            })
            return new ResultHistoryObj(orderBefore.montaz.delivery_point,orderAfter.montaz.delivery_point)
        }catch (e) {
            return res.status(500).json({message:'update deliveryPoint is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateGuaranties(orderBefore,orderAfter,res){
        try{
            await Model.montaz.update({
                guaranties:orderAfter.montaz.guaranties
            },{
                where:{
                    id:orderBefore.montaz.id
                }
            })
            return new ResultHistoryObj(orderBefore.montaz.guaranties,orderAfter.montaz.guaranties)
        }catch (e) {
            return res.status(500).json({message:'update guaranties is error...'+ e.message});
        }
    }
    //внутренний метод
    async updateNotice(orderBefore,orderAfter,res){
        try{
            await Model.orders.update({
                notice:orderAfter.notice
            },{
                where:{
                    id:orderBefore.id
                }
            })
            return new ResultHistoryObj(orderBefore.notice,orderAfter.notice)
        }catch (e) {
            return res.status(500).json({message:'update notice is error...'+ e.message});
        }
    }
    //внутренний метод
    async addEditHistory(history,res){
        try{
            await Model.edited_historys.create({
                orderId:history.orderId,
                employerId:history.employer.id,
                data:JSON.stringify(history),
            })
            return true
        }catch (e) {
            return res.status(500).json({message:'history is problem...'+ e.message});
        }
    }
    async updateCalculation(orderBefore,orderAfter,res){
        try{
            let avanses = 0
            for(let i = 0;i<orderAfter.calculation.payments.length;i++){
                avanses += orderAfter.calculation.payments[i].summa
            }
            await Model.calculations.update({
                total_cost:orderAfter.calculation.new_total_cost,
                balance:orderAfter.calculation.new_total_cost - avanses
            },{
                where:{
                    id:orderBefore.calculation.id
                }
            })
            const beforeBLR = orderBefore.calculation.total_cost * orderBefore.calculation.rate
            const afterBLR = orderAfter.calculation.new_total_cost * orderAfter.calculation.rate
            return new ResultHistoryObj(beforeBLR,afterBLR)
        }catch (e) {
            return res.status(500).json({message:'calculation update is problem...'+ e.message});
        }
    }
    async editStatus(req,res){
        try{
            await Model.orders.update({
                status:req.body.status
            },{
                where:{
                    id:req.body.orderId
                }
            })
            return res.status(200).json({status:'ok'})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async editNotice(req,res){
        try{
            await Model.orders.update({
                notice:req.body.notice
            },{
                where:{
                    id:req.body.orderId
                }
            })
            return res.status(200).json({status:'ok'})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }



    // async editMontaz(req,res){
    //     try{
    //
    //         await Model.montaz.update({
    //             orderId:req.body.orderId,
    //             height:req.body.height,
    //             width:req.body.width,
    //             weight:req.body.weight,
    //             delivery:req.body.delivery,
    //             delivery_point:req.body.deliveryPoint
    //         },{where:{
    //                 id:req.body.id
    //             }})
    //
    //         return res.status(200).json({status:'ok'})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
    //
    // async editSketchPath(req,res){
    //     try{
    //         const newCard = await Model.cards.create({
    //             orderId:req.body.orderId,
    //             type:req.body.type,
    //             link:req.body.link
    //         })
    //         if(newCard){
    //             return res.status(200).json({status:true})
    //         }
    //         return res.status(200).json({status:false})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }

    // async editTermin(req,res){
    //     try{
    //         await Model.termins.update({
    //             date_finish:req.body.date_finish
    //         },{
    //             where:{
    //                 id:req.body.id
    //             }
    //         })
    //         return res.status(200).json({status:'ok'})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }

    // async editBodyOrder(req,res){
    //     try{
    //         if(req.body.customerID > 0){
    //             await Model.customers.update({
    //                 last_name:req.body.customer.last_name,
    //                 name:req.body.customer.name,
    //                 father_name:req.body.customer.father_name,
    //                 address:req.body.customer.address,
    //                 phone:req.body.customer.phone,
    //                 rank:req.body.customer.rank
    //             },{where:{
    //                     id:req.body.customerID
    //                 }})
    //         }
    //         if(req.body.terminsID >0){
    //             await Model.termins.update({
    //                 orderId:req.body.orderID,
    //                 date_finish:req.body.date_finish
    //             },{where:{
    //                     id:req.body.terminsID
    //                 }})
    //         }
    //         if(req.body.orderID > 0){
    //             await Model.orders.update({
    //                 employerId:req.body.employerID,
    //                 employerName:req.body.employerName,
    //                 number:req.body.number,
    //                 maker:req.body.maker,
    //                 status:req.body.status
    //             },{where:{
    //                     id:req.body.orderID
    //                 }})
    //         }
    //         //console.log(calc())
    //         return res.status(200).json({message:'edited successful'})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
    // async editTextGrav(req,res){
    //     try{
    //         await Model.handlings.update({
    //             text_grav:req.body.text_grav
    //         },{
    //             where:{
    //                 id:req.body.id
    //             }
    //         })
    //         return res.status(200).json({status:'ok'})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
    // async editComplect(req,res){
    //     try{
    //         let complectPrice = req.body.summComplect;
    //         if(req.body.complect_items.length){
    //             req.body.complect_items.forEach(await function(item){
    //                 let weight = 0;
    //                 if(typeof item.weight === 'string'&&item.weight.startsWith('t')){
    //                     weight = item.weight.slice(2)
    //                 }else{weight = item.weight}
    //                 if(item.id === 'hui'){
    //                     complectPrice += item.price;
    //                     Model.complect_items.create({
    //                         complectId:item.complectId,
    //                         name:item.name,
    //                         articul:item.articul,
    //                         type:item.type,
    //                         sort:item.sort,
    //                         material:item.material,
    //                         status:item.status,
    //                         local:item.local,
    //                         height:item.height,
    //                         width:item.width,
    //                         weight:weight,
    //                         price:item.price,
    //                         amount:item.amount
    //                     })
    //                 }else{
    //                     Model.complect_items.update({
    //                         complectId:item.complectId,
    //                         name:item.name,
    //                         articul:item.articul,
    //                         type:item.type,
    //                         sort:item.sort,
    //                         material:item.material,
    //                         status:item.status,
    //                         local:item.local,
    //                         height:item.height,
    //                         width:item.width,
    //                         weight:weight,
    //                         price:item.price,
    //                         amount:item.amount
    //                     },{where:{
    //                         id:item.id
    //                         }})
    //                 }
    //             })
    //         }
    //         const complect = await Model.complects.update({
    //                 orderId:req.body.orderId,
    //                 summComplect:complectPrice,
    //                 type:req.body.type
    //         },{where:{
    //             id:req.body.id
    //             }})
    //         return res.json({complect})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
    // удалить после проверки
    // async addComplect(req,res){
    //     try{
    //         const complect = await Model.complects.create({
    //             orderId:req.body.orderId,
    //             summComplect:req.body.summComplect,
    //             type:req.body.type
    //         })
    //         req.body.complect_items.forEach(await function(detal){
    //             Model.complect_items.create({
    //                 complectId:complect.id,
    //                 name:detal.name,
    //                 articul:detal.articul,
    //                 type:detal.type,
    //                 sort:detal.sort,
    //                 material:detal.material,
    //                 status:detal.status,
    //                 local:detal.local,
    //                 height:detal.height,
    //                 width:detal.width,
    //                 weight:detal.weight,
    //                 price:detal.price,
    //                 amount:detal.amount,
    //                 rate:detal.rate
    //             });
    //         })
    //         return res.status(200).json({status:true})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
// async deleteDetail(req,res){
    //     try{
    //         await Model.complect_items.destroy({
    //             where:{
    //                 id:req.body.id
    //             }
    //         })
    //         return res.status(200).json({status:'ok'})
    //
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
// async deleteComplect(req,res){ //удалить после проверки
    //     try{
    //         await Model.complect_items.destroy({
    //             where:{
    //                 complectId:req.body.id
    //             }
    //         })
    //         await Model.complects.destroy({
    //             where:{
    //                 id:req.body.id
    //             }
    //         })
    //         return res.status(200).json({status:'ok'})
    //     }catch (e) {
    //         return res.status(500).json({message:'something huinia...'+ e.message});
    //     }
    // }
}

module.exports = new EditController()




