const Model = require('../models')
const {Op } = require('sequelize')

const supportGroup = require('../Utils/Classes/supportGroup')

class SalaryController {
    async getDetailsGroup(req,res){
        try {
            console.log('serv:',req.body)
            const key = supportGroup.getKeyOfWorkOperation(req.body.operationID)
            //const allDetails = await Model.beton_details.findAll({
            //    where:{
            //        name:{
            //            [Op.or]:key
            //        }
            //    }
            //})
            const allDetails = await Model.beton_details.findAll({
                where: {
                    name: {
                        [Op.or]:req.body.det
                    },
                    articul: {
                        [Op.or]:req.body.colors.map(color => ({
                            [Op.startsWith] : color
                        }))
                    }
                }
            })

            return res.status(200).json(allDetails)
        }catch (e) {
            return res.status(500).json({message:'sort detail group error' + e.message})
        }
    }
    async signSalaryOfShift(req, res) {
        try {
            let result = []
            if (req.body.salarys.length) {
                for (let item of req.body.salarys) {
                    if (!item.signature) {
                        let salaryRow = await Model.salarys.create({
                            workShiftId: item.shiftID,
                            workId: item.workId,
                            workName: item.workName,
                            notice: item.notice,
                            cost: item.cost,
                            amount: item.amount,
                            summa: item.summa,
                            signature: true
                        })
                        if (salaryRow) {
                            result.push(salaryRow)
                        }
                    }
                    
                }
            }
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({ message: 'sign shift error' + e.message })
        }
    }

}

module.exports = new SalaryController()