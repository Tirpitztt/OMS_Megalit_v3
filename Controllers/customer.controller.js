const Model = require('../models')
const {Op} = require('sequelize')

class CustomerController {
    async registration(req,res){
        try{
            const [candidate,created] = await Model.customers.findOrCreate({
                where:{
                    name:req.body.name,
                    last_name:req.body.last_name
                 },
                defaults:{
                    name:req.body.name,
                    last_name:req.body.last_name,
                    father_name:req.body.father_name,
                    address:req.body.address,
                    phone:req.body.phone,
                    rank:req.body.rank
                }
            })
            return res.json({candidate,created});
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }

    }
    async getOnlyCustomers(req,res){
        try{
            const allCustomers = await Model.customers.findAll();
            return res.json(allCustomers);
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async getCustomers(req,res){
         try{
            const customers = await Model.customers.findAll({
                include:[{
                    model:Model.orders,
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
                        }
                    ]
                }]
                }
            );
            return res.json({customers})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async getCustomerById(req,res){
        try{
            console.log(req.params);
            const customer = await Model.customers.findOne({
                where:{
                    id:req.params.id
                }
            })
            return res.json(customer);
        }catch (e) {
            return res.status(500).json({message:'customerById not found...'+ e.message});
        }
    }
    async getCustomer(req,res){
        try{
           const customer = await Model.customers.findOne({
                where:{
                    last_name:req.params['lastName']
                },
               include:[{
                   model:Model.orders,
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
                   }
                   ]
               }]
           })
            return res.json({customer})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async getOfNumber(req,res){
        try{
            const order = await Model.orders.findOne({
                where:{
                    number:req.params['number']
                }
            })
            if (!order){
                return res.json({message:'not found order'});
            }
            const customer = await Model.customers.findOne({
                where:{
                    id:order.customerId
                },include:[{
                    model:Model.orders,
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
                    }
                    ]
                }]
            })

            return res.json({customer})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }

    async editCustomer(req,res){
        try{

            await Model.customers.update({
                last_name:req.body.last_name,
                name:req.body.name,
                father_name: req.body.father_name,
                address: req.body.address,
                phone:req.body.phone,
                rank:req.body.rank
            },{
                where:{
                    id:req.body.id
                }
            })

            return res.status(200).json({message:'update good'});

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async delCustomer(req,res){}

}

module.exports = new CustomerController()