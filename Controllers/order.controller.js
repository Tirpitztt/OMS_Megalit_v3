const Model = require('../models')
const getNumber = require('../Utils/support')


class OrderController {

    async createNewOrder(req,res){
        try{
            //console.log('req:',req.body);
            let candidate;
            try{
                let [candi,created] = await Model.customers.findOrCreate({
                    where:{
                        last_name:req.body.customer.findingCustomer.last_name,
                        name:req.body.customer.findingCustomer.name
                    },
                    defaults:{
                        last_name:req.body.customer.findingCustomer.last_name,
                        name:req.body.customer.findingCustomer.name,
                        father_name:req.body.customer.findingCustomer.father_name,
                        address:req.body.customer.findingCustomer.address,
                        phone:req.body.customer.findingCustomer.phone,
                        rank:req.body.customer.findingCustomer.rank
                    }
                })
                candidate = candi;
            }catch (e) {
                return res.status(501).json({message:'error create customer',error:e.message})
            }

            //let montazSize = [0,0,0];

            // const orders = await Model.orders.findAll();
            // const lastOrder = orders.slice(-1)[0]||0;
            const numberOfNewOrder = await getNumber()
            const order = await Model.orders.create({
                customerId:candidate.id,
                employerId:req.body.orderOption.employer.id,
                employerName:req.body.orderOption.employer.name,
                number:numberOfNewOrder,
                maker:req.body.orderOption.maker,
                utm:req.body.orderOption.UTM,
                status:req.body.orderOption.status,
                notice:req.body.orderOption.notice,

            })
            await Model.termins.create({
                orderId:order.id,
                date_start:req.body.orderOption.today,
                date_finish:req.body.orderOption.termin
            })
            for(const item of req.body.newOrder.complects){
                let complect = await Model.complects.create({
                    orderId:order.id,
                    summComplect:item.summComplect,
                    type:item.type
                });
                //console.log(item)
                for(const detal of item.complect_items){

                    await Model.complect_items.create({
                        complectId:complect.id,
                        name:detal.name,
                        articul:detal.article,
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
                }
            }
            // let sketchList = null;
            // if(req.body.newOrder.handlings.sketchPath.length){
            //     sketchList = JSON.stringify(req.body.newOrder.handlings.sketchPath)
            // }
            if(req.body.newOrder.cardsList.length){
                for(const card of req.body.newOrder.cardsList){
                    await Model.cards.create({
                        orderId:order.id,
                        type:card.type,
                        link:card.link
                    })
                }
            }
            let handlings = await Model.handlings.create({
                orderId:order.id,
                hydrophob:req.body.newOrder.handling.hydrophob,
                sketch_path:null,
                text_grav:req.body.newOrder.handling.text_grav
            })
            if(req.body.newOrder.handling.handling_items.length){
                for(const detal of req.body.newOrder.handling.handling_items){
                    await Model.handling_items.create({
                        handlingId:handlings.id,
                        name:detal.name,
                        category:detal.category,
                        size:detal.size,
                        price:detal.price,
                        amount:detal.amount,
                        rate:detal.rate
                    })
                }
            }
            if(req.body.newOrder.montaz.size){
                //montazSize = req.body.newOrder.montaz.size.split('x');
            }
            let montaz = await Model.montaz.create({
                orderId:order.id,
                height:req.body.newOrder.montaz.height,
                width:req.body.newOrder.montaz.width,
                weight:req.body.newOrder.montaz.weight,
                delivery:req.body.newOrder.montaz.delivery,
                delivery_point:req.body.newOrder.montaz.delivery_point,
                guaranties:req.body.newOrder.montaz.guaranties
            })
            if(req.body.newOrder.montaz.montaz_items.length){
                for(const detal of req.body.newOrder.montaz.montaz_items){
                    await Model.montaz_items.create({
                        montazId:montaz.id,
                        name:detal.name,
                        category:detal.category,
                        type:detal.type,
                        price:detal.price,
                        amount:detal.amount,
                        rate:detal.rate
                    })
                }
            }
            let calculation = await Model.calculations.create({
                orderId:order.id,
                total_cost:req.body.newOrder.calculation.new_total_cost,
                balance:req.body.newOrder.calculation.new_total_cost,
                discount:req.body.newOrder.calculation.discount,
                rate:req.body.materials.rate[0].USD
            })
            if(req.body.newOrder.calculation.payments.length){
                let payment = 0;
                for(const pay of req.body.newOrder.calculation.payments){
                    await Model.payments.create({
                        calculationId:calculation.id,
                        summa:pay.summa,
                        summaBlr:pay.summaBlr,
                        pay_date:pay.pay_date,
                        employerId:pay.employerId,
                        employerName:pay.employerName,
                        cash:pay.cash
                    })
                    payment += Number(pay.summa);
                }
                if(payment){
                    await Model.calculations.update({
                        balance:calculation.total_cost-payment
                    },{
                        where:{
                            id:calculation.id
                        }
                    })
                }
            }
            return res.status(201).json(order);
        }catch (e) {
            return res.status(500).json({message:'new order not build...'+ e.message});
        }
    }


    async createHandlings(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async createMontaz(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }


    async createHandleItem(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async createMontazItem(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async createTermins(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }

    async getOrderOfNum(req,res){
        try{
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
                    model:Model.edited_historys
                },{
                    model:Model.cards
                }]
            })
            if (!order){
                return res.json({message:'not found order'});
            }
            const customer = await Model.customers.findOne({
                where:{
                    id:order.customerId
                }
            })
            const material = await Model.materials_price.findAll();

            let resultObj = {customer,order,material}
            return res.json(resultObj)
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async getAllOrders(req,res) {
        try{
            let result = []
            let orders = []
            //console.log(req)
            if(req.body.role === 'konung'||req.body.role === 'yarl'){
                orders = await Model.orders.findAll({
                    include:[{
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

            }else{
                orders = await Model.orders.findAll({
                    where:{
                        employerId:req.body.id
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
            }
            if(req.body.sort === 'all') {
                result = [...orders]
            }else if(req.body.sort === 'current') {
                for (const order of orders) {
                    if (order.status !== 'готов' && order.status !== 'отгружен') {
                        result.push(order)
                    }
                }
            }else if(req.body.sort === 'current-montaz') {
                for (const order of orders) {
                    if (order.status !== 'готов' && order.status !== 'отгружен' && order.montaz.montaz_items.length) {
                        result.push(order)
                    }
                }
            }else if(req.body.sort === 'not-paid'){
                for (const order of orders) {
                    if ((order.status === 'готов' || order.status === 'отгружен') && order.calculation.balance > 5) {
                        result.push(order)
                    }
                }
            }else {
                for(const order of orders){
                    if(order.termin.date_finish.slice(0,4) === req.body.sort){
                        result.push(order)
                    }
                }
            }
            return res.status(200).json(result)
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async getEditableOrder(req,res){
        try{
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
                },{
                    model:Model.cards
                }]
            })
            if(order){
                const customer = await Model.customers.findOne({
                    where:{
                        id:order.customerId
                    }
                })
                if(customer){
                    return res.status(200).json({status:true,customer,order})
                }
            }
            return res.status(200).json({status:false})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }


}

module.exports = new OrderController()
