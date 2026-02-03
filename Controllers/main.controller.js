const Model = require('../models')
const Calculation = require('../Utils/Classes/Calculation')
const StatOrders = require('../Utils/Classes/StatOrders')
const fileParser = require('../Controllers/aws.fileparser')

class MainController {
    async getMainState(req,res){
        try{
            const articles = await Model.articles.findAll({
                include:{
                    model:Model.comments
                }
            });
            const orders = await Model.orders.findAll({
                include:{
                    model:Model.calculations
                }
            });
            let balance = 0;
            if(orders){
                balance = await Calculation.getAllCalculation()
            }
            let orderStat = await StatOrders.getStat()
            const mainState = {
                adminInfo:{
                    orderStatistic:orderStat,
                    balance:balance
                },
                news:articles
            }
            return res.status(200).json(mainState)
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async getCalcState(req,res){
        try{
            const today = new Date()
            const currentYear = today.getFullYear()
            const currentMonth = today.getMonth()+1
            let result = {
                allCalculation: {},
                monthCalculation: {},
                lastYearCalculation: {},
                currentYearCalculation: {},
                equalsCalculation: []
            }


            //console.log(result.equalsCalculation)
            const monthCalc = await Calculation.getMonthCalculation(currentMonth,currentYear)
            const allCalc = await Calculation.getAllCalculation()
            const yearCalculation = await Calculation.getYearCalculation(currentYear)
            const lastYearCalc = await Calculation.getYearCalculation(currentYear-1)
            const allStat = await Calculation.getEqualsInfo(currentMonth,currentYear)
            result.monthCalculation = {...monthCalc}
            result.allCalculation = {...allCalc}
            result.lastYearCalculation = {...lastYearCalc}
            result.currentYearCalculation = {...yearCalculation}
            result.equalsCalculation = [...allStat]
            return res.status(200).json(result)
        }catch (e) {
            return res.status(500).json({message:'calculation problem...'+ e.message});
        }
    }
    async getCalcOfDate(req,res){
        try{
            const result = await Calculation.getMonthCalculation(req.body.month,req.body.year)

            return res.status(200).json(result)
        }catch (e) {
            return res.status(500).json({message:'calculation problem...'+ e.message});
        }
    }
    async getArticleOfId(req,res){
        try{
            const article = await Model.articles.findOne({
                where:{
                    id:req.body.id
                }
            })
            return res.status(200).json(article)
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async addArticle(req,res){
        try{
            await Model.articles.create({
                author:req.body.author,
                title:req.body.title,
                text:req.body.text,
                status:req.body.status,
                likes:req.body.likes
            })
            return res.status(200).json({message:'article is added'})
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async editArticle(req,res){
        try{
            await Model.articles.update({
                author:req.body.author,
                title:req.body.title,
                text:req.body.text,
                status:req.body.status,
                likes:req.body.likes
            },{
                where:{
                    id:req.body.id
                }
            })
            return res.status(200).json({message:'article is updated'})

        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async deleteArticle(req,res){
        try{
            await Model.articles.destroy({
                where:{
                    id:req.body.id
                },include:{
                    model:Model.comments
                }
            })
            return res.status(200).json({message:'article is deleted'})

        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async addComment(req,res){
        try{
            await Model.comments.create({
                author:req.body.author,
                articleId:req.body.articleId,
                text:req.body.text
            })
            return res.status(200).json({message:'comment is added'})

        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    async deleteComment(req,res){
        try{
            await Model.comments.destroy({
                where:{
                    id:req.body.id
                }
            })
            return res.status(200).json({message:'comment is destroyed'})
        }catch (e) {
            return res.status(500).json({message:'something problem...'+ e.message});
        }
    }
    addFile(req,res){
        fileParser(req).then(data=>{
            res.status(200).json(data)
        }).catch(errors=>{
            res.status(500).json({message:'something problem...'+ errors})
        })




    }
}
module.exports = new MainController();
