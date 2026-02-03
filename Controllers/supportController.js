const Model = require('../models')
const DetalTemp = require("../Utils/Classes/DetalTemp");

class SupportController {
    async getMaterial(req,res){
        try{
            const materials = await Model.materials_price.findAll();
            return res.json(materials);
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async getMaterials(req,res){
        let data = {
                rate: [],
                mat: [],
                materials_build:[],
                workOperations:[]
            };

        try{
            const material = await Model.materials_price.findAll();
            if(material){
                data.mat = material;
            }
            const rate = await Model.rates.findAll();
            if(rate){
                data.rate = rate;
            }
            const materialses = await Model.materials.findAll();
            if(materialses){
                data.materials_build = materialses;
            }
            const workOp = await Model.work_operations.findAll();
            if(workOp){
                data.workOperations = workOp;
            }

            return res.json(data);
        }catch (e) {
            return res.status(500).json({message:'materials get error '+ e.message});
        }
    }
    async getRates(req,res){
        try{
            const rate = await Model.rates.findAll()
            return res.json(rate);
        }catch (e) {
            return res.status(500).json({message:'rates get error '+ e.message});
        }
    }
    async addRates(req,res){
        try{
            await Model.rates.create({
               name:req.body.name,
               USD:req.body.USD,
               EUR:req.body.EUR,
               RUR:req.body.RUR,
               BLR:req.body.BLR
            })
            return res.status(200).json({message:'good job'});
        }catch (e) {
            return res.status(500).json({message:'rates add error '+ e.message});
        }
    }
    async updateRates(req,res){
        try{
            await Model.rates.update({
                [req.body.field]:req.body.value
            },{
                where:{
                    id:req.body.id,
                }
            })
            return res.status(200).json({message:'good job'});
        }catch (e) {
            return res.status(500).json({message:'rates update error '+ e.message});
        }
    }
    async addMaterial(req,res){
        try{
            await Model.materials.create({
                name:req.body.name,
                measure:req.body.measure,
                RUR:req.body.RUR,
                USD:req.body.USD,
                BLR:req.body.BLR
            })
            return res.status(200).json({message:'material is added successfuly'});
        }catch (e) {
            return res.status(500).json({message:'add material error '+ e.message});
        }
    }
    async updateMaterial(req,res){
        try{
            await Model.materials.update({
                name:req.body.name,
                measure:req.body.measure,
                RUR:req.body.RUR,
                USD:req.body.USD,
                BLR:req.body.BLR
            },{
                where:{
                    id:req.body.id,
                }
            })
            return res.status(200).json({message:'update is successfull'});
        }catch (e) {
            return res.status(500).json({message:'rates update error '+ e.message});
        }
    }
    async deleteMaterial(req,res){
        try{
            await Model.materials.destroy({
                where:{
                    id:req.body.id
                }
            })
            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'delete error'+ e.message});
        }
    }
    async getWorkOperations(req,res){
        try{
            const operations = await Model.work_operations.findAll();
            return res.json(operations);
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async getWorkOperation(req,res){
        try{
            const operation = await Model.work_operations.findOne({
                where:{
                    id:req.body.id
                }
            });
            return res.json(operation);
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async addWorkOperation(req,res){
        try{
            await Model.work_operations.create({
                type:req.body.type,
                name:req.body.name,
                measure:req.body.measure,
                stavka:req.body.stavka,
                bonus:req.body.bonus,
                USD:req.body.USD,
                BLR:req.body.BLR
            })
            return res.status(200).json({message:'operation is added successfuly'});
        }catch (e) {
            return res.status(500).json({message:'add material error '+ e.message});
        }
    }
    async updateWorkOperation(req,res){
        try{
            await Model.work_operations.update({
                type:req.body.type,
                name:req.body.name,
                measure:req.body.measure,
                stavka:req.body.stavka,
                bonus:req.body.bonus,
                USD:req.body.USD,
                BLR:req.body.BLR
            },{
                where:{
                    id:req.body.id,
                }
            })
            return res.status(200).json({message:'update is successfull'});
        }catch (e) {
            return res.status(500).json({message:'rates update error '+ e.message});
        }
    }
    async deleteWorkOperation(req,res){
        try{
            await Model.work_operations.destroy({
                where:{
                    id:req.body.id
                }
            })
            return res.json({status:200});
        }catch (e) {
            return res.status(500).json({message:'delete error'+ e.message});
        }
    }
    async getStandart100Kit(req,res){
        try{
            const rate = await Model.rates.findOne({
                where:{
                    id:1
                }
            })
            let stela100Price = 0;
            let stela90Price = 0;
            let stela80Price = 0;

            const stela = new DetalTemp(req.body.number,1,'стела',stela100Price,100,50,5,rate.USD);
            const tumba = new DetalTemp(req.body.number,2,'подставка',80,20,50,15,rate.USD);
            const cvet = new DetalTemp(req.body.number,3,'цветник',50,10,100,5,rate.USD)
            const material = await Model.materials.findAll()
            material.forEach(mat=>{
                switch(mat.name){
                    case '100505ст':{
                        stela100Price = mat.USD
                        break;
                    }
                    case '90455ст':{
                        stela90Price = mat.USD
                        break;
                    }
                    case '80405ст':{
                        stela80Price = mat.USD
                        break;
                    }
                    case '502015тб':{
                        tumba.setPrice(mat.USD)
                        break;
                    }
                    case '100105цв':{
                        cvet.setPrice(mat.USD)
                        break;
                    }
                    default:break
                }
            })
            if(req.body.type === 'standart100'){
                stela.setPrice(stela100Price)
                stela.setHeight(100)
                stela.setWidth(50)
                req.body.summComplect = 350
            }else if(req.body.type === 'standart90'){
                stela.setPrice(stela90Price)
                stela.setHeight(90)
                stela.setWidth(45)
                req.body.summComplect = 266.66
            }else if(req.body.type === 'standart80'){
                stela.setPrice(stela80Price)
                stela.setHeight(80)
                stela.setWidth(40)
                req.body.summComplect = 211.11
            }
            req.body.complect_items.push(stela,tumba,cvet)

            return res.status(200).json(req.body)

        }catch (e) {
            return res.status(500).json({message:'fuck yourself'+ e.message});
        }
    }

}

module.exports = new SupportController();
