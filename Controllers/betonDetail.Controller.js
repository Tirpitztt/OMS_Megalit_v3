const Model = require('../models')

class BetonDetailController {
    async getBetonDetails(req,res){
        try{
            const betonDetails = await Model.beton_details.findAll({
                include:{
                    model:Model.additional_mats
                }
            })
            return res.status(200).json(betonDetails);
        }catch (e) {
            return res.status(500).json({message:'NOT find all'+e.message})
        }
    }
    async getBetonDetailOfId(req,res){
        try{
            const betonDetail = await Model.beton_details.findOne({
                where:{
                    id:req.body.id
                }, include:{
                    model:Model.additional_mats
                }
            })
            return res.status(200).json(betonDetail)
        }catch (e) {
            return res.status(500).json({message:'NOT find'+e.message})
        }
    }
    async addBetonDetail(req,res){
        try{

            let betonDetail = await Model.beton_details.create({
                name:req.body.name,
                category:req.body.category || 'no category',
                articul:req.body.articul,
                height:req.body.dataDet[0].height,
                width:req.body.dataDet[1].width,
                weight:req.body.dataDet[2].weight,
                V:req.body.V,
                S:req.body.S,
                betmixID:req.body.dataDet[3].mixID,
                markup:req.body.dataDet[4].markup,
                added_cost:req.body.dataDet[5].added_cost,
                amount:req.body.amount
            })
            let addMaterialsArr = [];
            let addOperationsArr = [];
            if(req.body.allFields.length){
                req.body.allFields.forEach(function(item){
                    if(item.name=='materials'){
                        addMaterialsArr = [...item.complectList]
                    } else {
                        addOperationsArr = [...item.complectList]
                    }

                })
            }
            if(addOperationsArr.length){
                for(const item of addOperationsArr){
                    if(item.elemntID!=''&&item.amount>0){
                        await Model.additional_mats.create({
                            betonDetailId:betonDetail.id,
                            workOperationId:item.elementID,
                            workAmount:item.amount
                        })
                    }

                }
            }
            if(addMaterialsArr.length){
                for(const item of addMaterialsArr){
                    if(item.elementID!=''&&item.amount>0){
                        await Model.additional_mats.create({
                            betonDetailId:betonDetail.id,
                            materialId:item.elementID,
                            matAmount:item.amount,
                        })
                    }

                }
            }

            return res.status(200).json({message:'beton detail is created'})
        }catch (e) {
            return res.status(500).json({message:'NOT created....'+e.message})
        }
    }
    async updateBetonDetail(req,res){
        try{
            let message = 'its update OK '
            await Model.beton_details.update({
                name:req.body.name,
                articul:req.body.articul,
                height:req.body.dataDet[0].height,
                width:req.body.dataDet[1].width,
                weight:req.body.dataDet[2].weight,
                V:req.body.V,
                S:req.body.S,
                betmixID:req.body.dataDet[3].mixID,
                markup:req.body.dataDet[4].markup,
                added_cost:req.body.dataDet[5].added_cost,
                amount:req.body.amount
            },{
                where:{
                    id:req.body.id
                }
            })
            let addMaterialsArr = [];
            let addOperationsArr = [];
            if(req.body.allFields.length){
                req.body.allFields.forEach(function(item){
                    if(item.name=='materials'){
                        addMaterialsArr = [...item.complectList]
                    } else {
                        addOperationsArr = [...item.complectList]
                    }

                })
            }
            if(addOperationsArr.length){
                addOperationsArr.forEach(await function(item) {
                    if(item.amount==0){
                        Model.additional_mats.destroy({
                            where:{
                                id:item.id
                            }
                        })
                    }
                    if(item.id==0&&item.amount>0){
                        let newWorkOper = Model.additional_mats.create({
                            betonDetailId: req.body.id,
                            workOperationId: item.elementID,
                            workAmount: item.amount
                        })
                        if(newWorkOper){
                            message+='operation is added'
                        }
                    }else{
                        Model.additional_mats.update({
                            betonDetailId: req.body.id,
                            workOperationId: item.elementID,
                            workAmount: item.amount
                        },{
                            where:{
                                id:item.id
                            }
                        })
                    }

                })
            }
            if(addMaterialsArr.length){
                addMaterialsArr.forEach(function (item){
                    if(item.amount<=0){
                        Model.additional_mats.destroy({
                            where:{
                                id:item.id
                            }
                        })
                    }
                    if(item.id==0&&item.amount>0){
                        let newMaterial = Model.additional_mats.create({
                            betonDetailId: req.body.id,
                            materialId: item.elementID,
                            matAmount: item.amount
                        })
                        if(newMaterial){
                            message += 'material is added'
                        }
                    }else{
                        Model.additional_mats.update({
                            betonDetailId: req.body.id,
                            materialId: item.elementID,
                            matAmount: item.amount
                        },{
                            where:{
                                id:item.id
                            }
                        })
                    }
                })
            }

            return res.status(200).json({message:message})
        }catch (e) {
            return res.status(500).json({message:'NOT updated...'+e.message})
        }
    }
    async deleteBetonDetail(req,res){
        try{
            req.body.additions.forEach(await function(item){
                Model.additional_mats.destroy({
                    where:{
                        id:item.id
                    }
                })
            })
            await Model.beton_details.destroy({
                where:{
                    id:req.body.id
                }, include:{
                    model:Model.additional_mats
                }
            })
            return res.status(200).json({message:'its deleted'})
        }catch (e) {
            return res.status(500).json({message:'NOT deleted'+e.message})
        }
    }
    async deleteAdditionalMat(req,res){
        try{
            Model.additional_mats.destroy({
                where:{
                    id:req.body.id
                }
            })
            return res.status(200).json({message:'its deleted'})
        }catch (e) {
            return res.status(500).json({message:'NOT deleted'+e.message})
        }
    }


}


module.exports = new BetonDetailController();
