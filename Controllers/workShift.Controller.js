const getMonthDays = require('../Utils/month-days')
const Model = require('../models')
const {Op } = require('sequelize')

class WorkShiftController {
    async workShiftCreate(req,res){
        try{
            let result = {
                shiftID:null,
                workShiftUpd:{},
                workShift:{},
                mandat:[],
                salary:{}

            }

            if (req.body.shiftId) {
                result.shiftID = req.body.shiftId
                result.workShiftUpd = await Model.work_shifts.update({
                    userId:req.body.userId,
                    employerId:req.body.data.employerId,
                    date:req.body.data.date,
                    start:req.body.data.start,
                    end:req.body.data.end,
                    hooky:req.body.data.hooky,
                    outlet:req.body.data.outlet,
                    absence:req.body.data.absence,
                    sick:req.body.data.sick,
                    full:req.body.data.full,
                    rate:req.body.data.rate
                },{
                    where:{
                        id:req.body.shiftId
                    }
                })
            }else{
                result.workShift = await Model.work_shifts.create({
                    userId:req.body.userId,
                    employerId:req.body.data.employerId,
                    date:req.body.data.date,
                    start:req.body.data.start,
                    end:req.body.data.end,
                    hooky:req.body.data.hooky,
                    outlet:req.body.data.outlet,
                    absence:req.body.data.absence,
                    sick:req.body.data.sick,
                    full:req.body.data.full,
                    rate:req.body.data.rate
                })
                result.shiftID = result.workShift.id
            }

            if (req.body.data.mandat.length) {
                for (const mandat of req.body.data.mandat) {
                    if (!mandat.id) {
                        //console.log(mandat)
                        result.mandat = await Model.mandates.create({
                            workShiftId:result.shiftID,
                            employerName:mandat.employerName,
                            notice:mandat.notice,
                            summa:mandat.summa
                        })
                    }
                }
                
            }
            if(req.body.data.salary.length){
                for(const item of req.body.salary){
                    result.salary = await Model.salarys.create({
                        workShiftId:workShift.id,
                        workId:item.workId,
                        workName:item.workName,
                        cost:item.cost,
                        amount:item.amount,
                        summa:item.summa
                    })
                }
            }

            return res.status(200).json(result)
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
    async mandateDelete(req, res) {
        try {
            const resDel = await Model.mandates.destroy({
                where: {
                    id:req.body.id
                }
            })
            return res.status(200).json(resDel)
        } catch (e) {
            return res.status(500).json({ message: 'mandate delete error' + e.message })
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
                        [Op.lte]: dateStart,
                        [Op.gte]: dateEnd
                    }
                }, include: [{
                    model:Model.mandates
                }, {
                    model:Model.salarys
                }]
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