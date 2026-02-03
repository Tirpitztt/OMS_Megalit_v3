const CalcCard = require("./CalcCard");
const Model = require('../../models')

class Calculation {

    async getCalculation(orderId){
        try {
            const order = await Model.orders.findOne({
                include:{
                    model:Model.calculations
                }
                },{
                where:{
                    id:orderId
                }
            })
            const result = new CalcCard();
            result.setTotal(order.calculation.total_cost)
            //console.log(result)
            return result
        }catch (e) {
            return {error:e.message}
        }
    }
    async getAllCalculation(){
        try{
            let total = 0;
            let receivable = 0;
            let paymentCash = 0;
            let paymentBank = 0;
            const result = new CalcCard();
            const orders = await Model.orders.findAll({
                include:{
                    model:Model.calculations,
                    include:Model.payments
                }
            })
            orders.forEach(order=>{
                total += order.calculation.total_cost;
                if(order.employerId >=1 && order.employerId <=5){
                    result.setBazaTotal(order.calculation.total_cost)
                    result.setBazaCount()
                }
                order.calculation.payments.forEach(pay=>{
                    if(pay.cash){
                       paymentCash += pay.summa;
                    }else{
                       paymentBank += pay.summa;
                    }
                })
                if(order.status === 'отгружен' && order.calculation.balance > 1){
                    receivable += order.calculation.balance
                }

            })

            result.setTotal(total)
            result.setPaymentBank(paymentBank)
            result.setPaymentCash(paymentCash)
            result.setBalance(total - result.getAvance())
            result.setReceivable(receivable)
            return result

        }catch (e) {
            return {error:e.message}
        }
    }
    async getMonthCalculation(month,year){
        try{
            let monthOrders = []
            let total = 0;
            let paymentBank = 0;
            let paymentCash = 0;
            let receivable = 0;
            const result = new CalcCard()
            const orders = await Model.orders.findAll({
                include:[{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.termins,
                }]
            })
            orders.forEach(order=>{
                let termin = order.termin.date_start.split('-')
                if(termin[1] == month && termin[0] == year){
                    total += order.calculation.total_cost;
                    if(order.employerId >=1 && order.employerId <=5){
                        result.setBazaTotal(order.calculation.total_cost)
                        result.setBazaCount()
                    }
                    order.calculation.payments.forEach(pay=>{
                        if(pay.cash){
                            paymentCash += pay.summa;
                        }else{
                            paymentBank += pay.summa;
                        }
                    })
                    if(order.status === 'отгружен' && order.calculation.balance > 1){
                        receivable += order.calculation.balance
                    }
                    monthOrders.push(order)
                }
            })
            result.setTotal(total)
            result.setPaymentBank(paymentBank)
            result.setPaymentCash(paymentCash)
            result.setBalance(total - (paymentBank + paymentCash))
            result.setReceivable(receivable)
            result.setOrders(monthOrders)

            return result

        }catch (e) {
            return {error:e.message}
        }
    }
    async getYearCalculation(year){
        try{
            let yearOrders = []
            let total = 0;
            let paymentBank = 0;
            let paymentCash = 0;
            let receivable = 0;
            const result = new CalcCard()
            const orders = await Model.orders.findAll({
                include:[{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.termins,
                }]
            })
            orders.forEach(order=>{
                let termin = order.termin.date_start.split('-')
                if(termin[0] == year){
                    total += order.calculation.total_cost;
                    if(order.employerId >=1 && order.employerId <=5){
                        result.setBazaTotal(order.calculation.total_cost)
                        result.setBazaCount()
                    }
                    order.calculation.payments.forEach(pay=>{
                        if(pay.cash){
                            paymentCash += pay.summa;
                        }else{
                            paymentBank += pay.summa;
                        }
                    })
                    if(order.status === 'отгружен' && order.calculation.balance > 1){
                        receivable += order.calculation.balance
                    }
                    yearOrders.push(order)
                }
            })
            result.setTotal(total)
            result.setPaymentBank(paymentBank)
            result.setPaymentCash(paymentCash)
            result.setBalance(total - (paymentBank + paymentCash))
            result.setReceivable(receivable)
            result.setOrders(yearOrders)

            return result

        }catch (e) {
            return {error:e.message}
        }
    }
    async getEqualsInfo(month,year){
        try{
            let stat = []

            const orders = await Model.orders.findAll({
                include:[{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.termins,
                }]
            })
            for(let i = 2024;i <= year;i++){
                let yearStat = {
                    year:i,
                    totalCost:0,
                    totalCount:0,
                    paymentCash:0,
                    paymentBank:0,
                    receivable:0,
                    month:[]
                }
                for(let j = 1;j<=12;j++){
                    let monthOrders = []
                    let total = 0;
                    let paymentBank = 0;
                    let paymentCash = 0;
                    let receivable = 0;
                    const result = new CalcCard()
                    orders.forEach(order=>{
                        let termin = order.termin.date_start.split('-')
                        if(termin[1] == j && termin[0] == i){
                            total += order.calculation.total_cost;
                            yearStat.totalCost += order.calculation.total_cost;
                            yearStat.totalCount++;
                            if(order.employerId >=1 && order.employerId <=5){
                                result.setBazaTotal(order.calculation.total_cost)
                                result.setBazaCount()
                                result.setBazaBalance(order.calculation.balance)
                            }
                            if(order.employerId === 6){
                                result.setSovietTotal(order.calculation.total_cost)
                                result.setSovietCount()
                                result.setSovietBalance(order.calculation.balance)
                            }
                            if(order.employerId === 7){
                                result.setBaniaTotal(order.calculation.total_cost)
                                result.setBaniaCount()
                                result.setBaniaBalance(order.calculation.balance)
                            }
                            if(order.employerId === 8){
                                result.setPrestizTotal(order.calculation.total_cost)
                                result.setPrestizCount()
                                result.setPrestizBalance(order.calculation.balance)
                            }
                            order.calculation.payments.forEach(pay=>{
                                if(pay.cash){
                                    paymentCash += pay.summa;
                                    yearStat.paymentCash += pay.summa;
                                }else{
                                    paymentBank += pay.summa;
                                    yearStat.paymentBank += pay.summa;
                                }
                            })
                            if(order.status === 'отгружен' && order.calculation.balance > 1){
                                receivable += order.calculation.balance
                                yearStat.receivable += order.calculation.balance
                            }
                            monthOrders.push(order)
                        }
                    })
                    result.setTotal(total)
                    result.setPaymentBank(paymentBank)
                    result.setPaymentCash(paymentCash)
                    result.setBalance(total - (paymentBank + paymentCash))
                    result.setReceivable(receivable)
                    result.setOrders(monthOrders)
                    yearStat.month.push(result)
                }
                stat.push(yearStat)
            }
            return stat
        }catch (e) {
            return {error:e.message}
        }
    }
}

module.exports = new Calculation();
