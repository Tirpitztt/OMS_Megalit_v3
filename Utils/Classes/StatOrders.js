const Model = require('../../models')
const Dater = require('../Classes/Dater')
const OrderState = require('../Classes/OrdersState')

class StatOrders {
    async getStat(){
        let result = new OrderState()
        let countOrders = 0;
        const customers = await Model.customers.findAll({
            include:{
                model:Model.orders,
                include:[{
                    model:Model.termins
                },{
                    model:Model.complects,
                    include:Model.complect_items
                },{
                    model:Model.handlings,
                    include:Model.handling_items
                },{
                    model:Model.montaz,
                    include:Model.montaz_items
                },{
                    model:Model.calculations,
                    include:Model.payments
                },{
                    model:Model.cards
                }]
            }
        })
        customers.forEach(customer => {
            //countOrders++;
            customer.orders.forEach((order,index) => {
                countOrders++;
                if(Dater.redDate(order.termin.date_finish) && order.status !== 'отгружен'){
                    result.addInRed(order)
                }
                if(Dater.orangeDate(order.termin.date_finish) && order.status !== 'отгружен'){
                    result.addInOrange(order)
                }
                //console.log(index,order.utm)
                if(order.utm !== null){
                    result.addUtmPoint(order.utm)
                }
                switch (order.status){
                    case 'принят':{
                        result.addInNew(order)
                        break;
                    }
                    case 'заливка':{
                        result.addInPour(order)
                        break
                    }
                    case 'распил':{
                        result.addInCut(order)
                        break
                    }
                    case 'шлифовка':{
                        result.addInPolyr(order)
                        break
                    }
                    case 'граверка':{
                        result.addInGrav(order)
                        break
                    }
                    case 'сборка':{
                        result.addInVol(order)
                        break
                    }
                    case 'готов':{
                        result.addInReady(order)
                        break
                    }
                    case 'отгружен':{
                        result.addInLoad(order)
                        break
                    }
                    default:break
                }

            })
        })
        result.setAllOrders(countOrders)

        return result
    }


}

module.exports = new StatOrders()
