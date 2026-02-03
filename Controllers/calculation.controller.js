const Model = require('../models')

class CalculationController {
    // async setCalculation(req,res){ // нигде не используется?
    //     try{
    //         const order = await Model.orders.findOne({
    //             where:{
    //                 id:req.params.orderId
    //             },
    //             include:[
    //                 {
    //                     model:Model.complects,
    //                     include:Model.complect_items
    //                 },
    //                 {
    //                     model:Model.handlings,
    //                     include:Model.handling_items
    //                 },
    //                 {
    //                     model:Model.montaz,
    //                     include:Model.montaz_items
    //                 }
    //             ]
    //         })
    //         if(!order){
    //             return res.json({message:'order not found'})
    //         }
    //         let totalCost = 0;
    //         let pay = 0;
    //         const complects = order.complects;
    //         const handlings = order.handlings;
    //         const montaz = order.montazs;
    //         const sumTotal = (array)=>{
    //             array.complect_items.forEach(item=>{
    //                 totalCost+=item.price*item.amount;
    //             })
    //         }
    //         function arrLength(array){
    //             if(array!=undefined&&array.length){
    //                 for(let i=0;i<array.length;i++){
    //                     sumTotal(array[i]);
    //                 }
    //             }
    //         }
    //         arrLength(complects);
    //         if(handlings!=undefined&&handlings.length){
    //
    //             for(let i =0;i<handlings.length;i++){
    //                 if(handlings[i].hydrophob){
    //                     totalCost+=30;
    //                 }
    //                 for(let j = 0;j<handlings[i].handling_items.length;j++){
    //                     totalCost += handlings[i].handling_items[j].price *
    //                         handlings[i].handling_items[j].amount;
    //                 }
    //             }
    //         }
    //         if(montaz!=undefined && montaz.length ){
    //
    //             for(let i =0;i<montaz.length;i++){
    //                 if(montaz[i].delivery>0){
    //                     totalCost+=montaz[i].delivery * 1.5;
    //                 }
    //                 for(let j = 0;j<montaz[i].montaz_items.length;j++){
    //                     totalCost += montaz[i].montaz_items[j].price *
    //                         montaz[i].montaz_items[j].amount;
    //                 }
    //             }
    //         }
    //         let [calculate,created] = await Model.calculations.findOrCreate({
    //             where:{
    //              orderId:order.id
    //              },defaults:{
    //              orderId:order.id,
    //              total_cost:totalCost}
    //              })
    //
    //         if(!created){
    //             const payments = await Model.payments.findAll({
    //                 where:{
    //                     calculationId:calculate.id
    //                 }
    //             });
    //             if(payments){
    //
    //                 for(let i =0;i<payments.length;i++) {
    //                     pay += payments[i].summa;
    //                 }
    //             }
    //             await Model.calculations.update({
    //                 total_cost:totalCost,
    //                 balance:totalCost-pay
    //             },{
    //                 where:{
    //                     orderId:order.id
    //                 }
    //             })
    //         }
    //
    //         return res.json({order})
    //     }catch (e) {
    //
    //     }
    // }

    async totalCostUpdate(req,res){ // обновляет стоимость
        try{
            const rate = await Model.rates.findAll()
            const order = await Model.orders.findOne({
                where:{
                    id:req.body.orderId
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
                }]
            })
            let totalCost = 0;
            let avanses =0;
            order.complects.forEach(item=>{
                item.complect_items.forEach(detail=>{
                    totalCost += (detail.price * detail.amount)
                })
            })
            //console.log('calc:',order.complects)
            order.handling.handling_items.forEach(item=>{
                totalCost += (item.price * item.amount)
            })
            order.montaz.montaz_items.forEach(item=>{
                totalCost += (item.price * item.amount)
            })
            if(order.handling.hydrophob){totalCost += rate[2].USD}
            if(order.montaz.delivery>0){totalCost += (order.montaz.delivery * rate[1].USD)}
            if(order.calculation.discount!==null){totalCost += order.calculation.discount}
            order.calculation.payments.forEach(item=>{
                avanses += item.summa
            })
            let balance = (totalCost - avanses)

            await Model.calculations.update({
                total_cost:totalCost,
                balance:balance
            },{
                where:{
                    id:order.calculation.id
                }
            })

            return res.status(200).json({status:true})
        }catch (e) {
            return res.status(500).json({message:'add payment error '+ e.message});
        }
    }

    async setPayment(req,res){
        try{
            let pay = await Model.payments.create({
                calculationId:req.body.calculationId,
                summa:req.body.summa,
                summaBlr:req.body.summaBlr,
                pay_date:req.body.pay_date,
                employerId:req.body.employerId,
                employerName:req.body.employerName,
                cash:req.body.cash
            })
            if(pay){
                let payments = await Model.payments.findAll({
                    where:{
                        calculationId:req.body.calculationId
                    }
                })
                let calc = await Model.calculations.findOne({
                    where:{
                        id:req.body.calculationId
                    }
                })
                if(payments && calc){
                    let avans = 0;
                    payments.forEach((item)=>{
                        avans += item.summa;
                    })
                    let balance = calc.total_cost-avans;
                    let upd =  await Model.calculations.update({
                        balance:balance
                    },{
                        where:{
                            id:req.body.calculationId
                        }
                    })
                    if(upd){
                        const order = await Model.orders.findOne({
                            where:{
                                id:calc.orderId
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
                        const customer = await Model.customers.findOne({
                            where:{
                                id:order.customerId
                            }
                        })
                        if(order && customer){
                            let data = {customer,order}
                            return res.status(200).json(data)
                        }
                    }
                }
            }

            return res.status(501).json({message:'pay is not create'})
        }catch (e) {
            return res.status(500).json({message:'add payment error '+ e.message});
        }
    }


    async priceCreate(req,res){  // создает стоимость детали
        try{
            let material = await Model.materials_price.findOne({
                where:{
                    name:req.body.material
                }
            })
            let price = 0;
            if(material){
                price = ((req.body.height*req.body.width)/10000)*material[req.body.weight];
            }
            return res.status(201).json({price})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }

    async detailPriceCreate(req,res){
        try{
            let price = 0
            return res.status(201).json({price})
        }catch (e) {
            return res.status(500).json({message:'detail price error...'+ e.message});
        }
    }

    async createTotalCost(req,res){ // создает стоимость нового заказа
        try{
            const rate = await Model.rates.findAll()
            let totalCost = 0;
            req.body.complects.forEach((complect)=>{
                //complect.summCompl = 0;
                complect.complect_items.forEach((item)=>{
                    //complect.summCompl += (item.price * item.amount)
                    totalCost += (item.price * item.amount);

                })
                //totalCost += complect.summCompl;
            })
            if(req.body.handling.hydrophob){
                totalCost += rate[2].USD;
            }
            req.body.handling.handling_items.forEach((detail)=>{
                totalCost += (detail.price * detail.amount);
            })
            if(req.body.montaz.delivery > 0){
                totalCost += (req.body.montaz.delivery * rate[1].USD);
            }
            req.body.montaz.montaz_items.forEach((detail)=>{
                totalCost += (detail.price * detail.amount);
            })
            if(req.body.calculation.discount){
                totalCost += req.body.calculation.discount;
            }
            return res.json({totalCost,calculationRate:rate[0].USD});
        }catch (e) {
            return res.status(500).json({message:'something wrong...'+ e.message});
        }
    }

    async updateTotalCostTemp(req,res){
        try{
            let totalCost = 0;

            return res.json({totalCost});
        }catch (e) {
            return res.status(500).json({message:'temp update is bad...'+ e.message});
        }
    }
}

module.exports = new CalculationController()
