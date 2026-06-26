const Model = require('../models')
const {Op } = require('sequelize')

const supportGroup = require('../Utils/Classes/supportGroup')

class SalaryController {
    async getDetailsGroup(req,res){
        try{
            const key = supportGroup.getKeyOfWorkOperation(req.body.operationID)
            const allDetails = await Model.beton_details.findAll({
                where:{
                    name:{
                        [Op.or]:key
                    }
                }
            })

            return res.status(200).json(allDetails)
        }catch (e) {
            return res.status(500).json({message:'shift create error' + e.message})
        }
    }

}

module.exports = new SalaryController()