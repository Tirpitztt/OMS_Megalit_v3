const Model = require('../models')

class StoneController {
    async getStonesAll(req,res){
        try{
            const stones = await Model.stones.findAll({
                include:[{
                    model:Model.slabs
                },{
                    model:Model.blocks
                }]
            })
            return res.status(200).json(stones)
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async addStone(req,res){
        try{
            const stone = await Model.stones.create({
                name:req.body.name,
                country:req.body.country,
                color:req.body.color,
                ratio:req.body.ratio
            })
            if(stone&&req.body.slabs.length){
                for(const item of req.body.slabs){
                    await Model.slabs.create({
                        stoneId:stone.id,
                        weight:item.weight,
                        price:item.price
                    })
                }
            }
            if(stone&&req.body.blocks.length){
                for(const item of req.body.blocks){
                    await Model.blocks.create({
                        stoneId:stone.id,
                        weight:item.weight,
                        price:item.price
                    })
                }
            }

            return res.status(200).json({message:'all is OK'})
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async editStone(req,res){
        try{
            await Model.stones.update({
                name:req.body.name,
                country:req.body.country,
                color:req.body.color,
                ratio:req.body.ratio
            },{
                where:{
                    id:req.body.id
                }
            })
            if(req.body.slabs.length){
                for(const item of req.body.slabs){
                    if('id' in item){
                        await Model.slabs.update({
                            stoneId:item.stoneId,
                            weight:item.weight,
                            price:item.price
                        },{
                            where:{
                                id:item.id
                            }
                        })
                    }else{
                        await Model.slabs.create({
                            stoneId:req.body.id,
                            weight:item.weight,
                            price:item.price
                        })
                    }

                }
            }
            if(req.body.blocks.length){
                for(const item of req.body.blocks){
                    if('id' in item){ //если id есть то обновить
                        await Model.blocks.update({
                            stoneId:item.stoneId,
                            weight:item.weight,
                            price:item.price
                        },{
                            where:{
                                id:item.id
                            }
                        })
                    }else{ // если нет то создать
                        await Model.blocks.create({
                            stoneId:req.body.id,
                            weight:item.weight,
                            price:item.price
                        })
                    }

                }
            }
            return res.status(200).json({message:'all is OK'})
        }catch(e){
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async deleteStone(req,res){
        try{
            if(req.body.slabs.length){
                req.body.slabs.forEach(await function(item){
                    Model.slabs.destroy({
                        where:{
                            id:item.id
                        }
                    })
                })
            }
            if(req.body.blocks.length){
                req.body.blocks.forEach(await function(item){
                    Model.blocks.destroy({
                        where:{
                            id:item.id
                        }
                    })
                })
            }
            await Model.stones.destroy({
                where:{
                    id:req.body.id
                },include:[{
                    model:Model.slabs
                },{
                    model:Model.blocks
                }]
            })
            return res.status(200).json({message:'all is OK'})
        }catch(e){
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }

}
module.exports = new StoneController();
