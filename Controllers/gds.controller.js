const Model = require('../models')

class GdsController {
    async addGds(req,res){
        try{
            const good = Model.goods.create({
                name:req.body.name,
                category:req.body.category || 'no category',
                articul:req.body.articul,
                type:req.body.type,
                sort:req.body.sort,
                material:req.body.material,
                color:req.body.color,
                measure:req.body.measure,
                status:req.body.status,
                local:req.body.local,
                height:req.body.height,
                width:req.body.width,
                weight:req.body.weight,
                price:req.body.price,
                amount:req.body.amount
            })
            res.status(200).json({status:'gitara'})
        }catch (e) {
            res.status(500).json({message:'kurwa, nie mam tego...:' + e.message})
        }
    }
    async editGds(req,res){
        try{
            await Model.goods.update({
                name:req.body.name,
                articul:req.body.articul,
                type:req.body.type,
                sort:req.body.sort,
                material:req.body.material,
                color:req.body.color,
                measure:req.body.measure,
                status:req.body.status,
                local:req.body.local,
                height:req.body.height,
                width:req.body.width,
                weight:req.body.weight,
                price:req.body.price,
                amount:req.body.amount
            },{
                where:{
                    id:req.body.id
                }
            })
            res.status(200).json({status:'gitara'})
        }catch (e) {
            res.status(500).json({message:'kurwa, nie mam tego...:' + e.message})
        }
    }
    async deleteGds(req,res){
        try{
            await Model.goods.destroy({
                where:{
                    id:req.body.id
                }
            })
            res.status(200).json({status:'gitara'})
        }catch (e) {
            res.status(500).json({message:'kurwa, nie mam tego...:' + e.message})
        }
    }

}


module.exports = new GdsController()
