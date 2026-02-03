const Model = require('../models')

class DeleteController {
    async deleteOrder(req,res){
        try{

            const complects = await Model.complects.findAll({
                where:{
                    orderId:req.body.id
                },include:{
                    model:Model.complect_items
                }
            })
            // удаление каждой детали, затем самого комплекта
            if(complects){
                for(const complect of complects){
                    await Model.complect_items.destroy({
                        where:{
                            complectId:complect.id
                        }
                    })
                    await Model.complects.destroy({
                        where:{
                            id:complect.id
                        }
                    })
                }
            }
            // удаление обработки
            const handlings = await Model.handlings.findOne({
                where:{
                    orderId:req.body.id
                },include:{
                    model:Model.handling_items
                }
            })
            if(handlings){
                await Model.handling_items.destroy({
                    where:{
                        handlingId:handlings.id
                    }
                })
                await Model.handlings.destroy({
                    where:{
                        id:handlings.id
                    }
                })
            }


            // удаление монтажа и деталей
            const montaz = await Model.montaz.findOne({
                where:{
                    orderId:req.body.id
                },include:{
                    model:Model.montaz_items
                }
            })
            if(montaz){
                await Model.montaz_items.destroy({
                    where:{
                        montazId:montaz.id
                    }
                })
                await Model.montaz.destroy({
                    where:{
                        id:montaz.id
                    }
                })
            }


            //удаление калькуляции и платежей
            const calculation = await Model.calculations.findOne({
                where:{
                    orderId:req.body.id
                }
            })
            await Model.payments.destroy({
                where:{
                    calculationId:calculation.id
                }
            })
            await Model.calculations.destroy({
                where:{
                    id:calculation.id
                }
            })
            // удаление сроков
            await Model.termins.destroy({
                where:{
                    orderId:req.body.id
                }
            })
            // удаление истории изменений
            await Model.edited_historys.destroy({
                where:{
                    orderId:req.body.id
                }
            })
            //удаление карточек эскизов
            await Model.cards.destroy({
                where:{
                    orderId:req.body.id
                }
            })
            // удаление самого заказа
            await Model.orders.destroy({
                where:{
                    id:req.body.id
                }
            })

            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'deleteController.deleteOrder() error'+ e.message});
        }
    }
    async deleteComplect(req,res){
        try{
            const complect = await Model.complects.delete({
                orderId:req.body.orderId,
                type:req.body.typeComplect
            })
            return res.json({complect})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteSketchByID(req,res){
        try{
            await Model.cards.destroy({
                where:{
                    id:req.body.id
                }
            })

            return res.status(200).json({message:'updated'})
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteHandlings(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteMontaz(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteComplItem(req,res){
        try{
            await Model.complect_items.delete({
                where:{
                    id:req.body.id
                }
            })
            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteHandlItem(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteMontazItem(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }
    async deleteTermins(req,res){
        try{

        }catch (e) {
            return res.status(500).json({message:'something huinia...'+ e.message});
        }
    }



}

module.exports = new DeleteController()
