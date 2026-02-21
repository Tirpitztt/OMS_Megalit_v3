const getMonthDays = require('../Utils/month-days')
const Model = require('../models')
const {Op } = require('sequelize')

class WorkShiftController {
    async workShiftCreate(req,res){
        try{
            const workShift = await Model.work_shifts.create({
                userId:req.body.userId,
                employerId:req.body.employerId,
                date:req.body.date,
                start:req.body.start,
                end:req.body.end,
                hooky:req.body.hooky,
                outlet:req.body.outlet,
                absence:req.body.absence,
                sick:req.body.sick,
                rate:req.body.rate
            })
            if(req.body.mandat){
                await Model.mandates.create({
                    workShiftId:workShift.id,
                    employerName:req.body.mandat.employerName,
                    notice:req.body.mandat.notice,
                    summa:req.body.mandat.summa
                })
            }
            if(req.body.salary.length){
                for(const item of req.body.salary){
                    const salary = await Model.salarys.create({
                        workShiftId:workShift.id,
                        workId:item.workId,
                        workName:item.workName,
                        cost:item.cost,
                        amount:item.amount,
                        summa:item.summa
                    })
                }
            }
            return res.status(200).json(workShift)
        }catch (e) {
            return res.status(500).json({message:'shift create error' + e.message})
        }
    }
    async mandateCreate(req,res){
        try{
            await Model.mandates.create({
                workShiftId:req.body.workShiftId,
                employerName:req.body.employerName,
                notice:req.body.notice,
                summa:req.body.summa
            })

        }catch (e) {
            return res.status(500).json({message:'mandate create error' + e.message})
        }
    }
    async salaryCreate(req,res){
        try{
            await Model.salarys.create({
                workShiftId:req.body.workShiftId,
                workId:req.body.workId,
                workName:req.body.workName,
                cost:req.body.cost,
                amount:req.body.amount,
                summa:req.body.summa
            })

        }catch (e) {
            return res.status(500).json({message:'mandate create error' + e.message})
        }
    }
    async getShiftsByMonth(req, res) {
        try {

            const monthDays = getMonthDays(req.body.year,(req.body.month)-1)
            let result = {
                year: req.body.year,
                month: req.body.month,
                monthDays,
                users:[]
            }
            //if (result.month < 1) {
            //    result.month = 12 - result.month
            //}
            const dateStart = req.body.year + '-' + req.body.month + '-' + monthDays.length
            const dateEnd = req.body.year + '-' + req.body.month + '-' + 1
            const users = await Model.users.findAll()
            const shifts = await Model.work_shifts.findAll({
                where: {
                    date: {
                        [Op.lt]: dateStart,
                        [Op.gt]: dateEnd
                    }
                }
            })
            users.forEach ((item,i)=> {
                let user = {
                    userId:item.id,
                    userName: item.full_name,
                    shifts:[] 
                }
                shifts.forEach ((shift,i)=> {
                    if (user.userId === shift.userId) {
                        user.shifts.push(shift)
                    }
                })
                result.users.push(user)
            })
            return res.status(200).json(result)

        } catch (e) {
            return res.status(500).json({ message: 'get shifts error' + e.message })
        }
    }
}

module.exports = new WorkShiftController()