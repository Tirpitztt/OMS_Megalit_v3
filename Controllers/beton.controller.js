const Model = require('../models')

class BetonController {
    async getBetonState(req,res){
        try{
            let result = {
                rate:[],
                mat:[],
                materials_build:[],
                workOperations:[],
                betonMix:[],
                betonDetails:[],
                gds:[]
            }
            const stones = await Model.stones.findAll({
                include:[{
                    model:Model.slabs
                },{
                    model:Model.blocks
                }]
            });
            if(stones){
                result.mat = [...stones];
            }
            const rate = await Model.rates.findAll();
            if(rate){
                result.rate = [...rate];
            }
            const matBuild = await Model.materials.findAll();
            if(matBuild){
                result.materials_build = [...matBuild];
            }
            const operations = await Model.work_operations.findAll();
            if(operations){
                result.workOperations = [...operations];
            }
            const betonMix = await Model.beton_mixes.findAll({
                include:{
                    model:Model.beton_ingredients
                }
            });
            const betonDetails = await Model.beton_details.findAll({
                include:{
                    model:Model.additional_mats
                }
            })
            const goods = await Model.goods.findAll()
            if(goods){
                result.gds = [...goods]
            }
            if(betonMix.length||betonDetails.length){
                result.betonDetails = [...betonDetails];
                result.betonMix = [...betonMix];
            }

            return res.json(result);
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async getBetonMixOne(req,res){
        try{
            const betonMix = await Model.beton_mixes.findOne({
                where:{
                    id:req.body.id
                }, include:{
                    model:Model.beton_ingredients
                }
            });
            return res.json(betonMix);
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async addBetonMix(req,res){
        try{
            let betonMix = await Model.beton_mixes.create({
                name:req.body.name,
                articul:req.body.articul,
                notation:req.body.notation,
                measure:req.body.measure
            })
            for(const item of req.body.ingredients){
                await Model.beton_ingredients.create({
                    betonMixId:betonMix.id,
                    name:item.name,
                    materialId:item.materialId,
                    amount:item.amount
                })
            }
            return res.status(200).json({message:'beton-mix is created!'});
        }catch (e) {
            return res.status(500).json({message:'rates add error '+ e.message});
        }
    }
    async updateBetonMix(req,res){
        try{
            await Model.beton_mixes.update({
                name:req.body.name,
                articul:req.body.articul,
                notation:req.body.notation,
                measure:req.body.measure
            },{
                where: {
                    id: req.body.id,
                }
            })
            req.body.ingredients.forEach(await function(item){
                if(item.id==0){
                    let newIngredient = Model.beton_ingredients.create({
                        betonMixId:item.betonMixId,
                        name:item.name,
                        materialId:item.materialId,
                        amount:item.amount
                    })
                    console.log(newIngredient)
                }
            })
            req.body.ingredients.forEach(await function (item){
                    Model.beton_ingredients.update({
                    name:item.name,
                    materialId:item.materialId,
                    amount:item.amount
                },{where:{
                        id:item.id
                    }
                })
            })


            return res.status(200).json({message:'good job'});
        }catch (e) {
            return res.status(500).json({message:'betonMix update error '+ e.message});
        }
    }
    async deleteBetonMix(req,res){
        try{

            req.body.ingredients.forEach(await function (item){
                Model.beton_ingredients.destroy({
                   where:{
                        id:item.id
                    }
                })
            })
            await Model.beton_mixes.destroy({
                where:{
                    id:req.body.id
                }, include:{
                    model:Model.beton_ingredients
                }
            })
            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'delete betonMix error'+ e.message});
        }
    }
    async deleteIngredient(req,res){
        try{
            console.log(req.body)
            Model.beton_ingredients.destroy({
                where:{
                    id:req.body.id
                }
            })
            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'delete ingredient error'+ e.message});
        }
    }

}

module.exports = new BetonController();
