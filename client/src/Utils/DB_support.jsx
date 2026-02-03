import {dateFormat} from "./support";

export const getDataBaseArray = (orders,customers) => {
    //console.log(orders)
    let result = []
    orders.forEach(function(item){
        let orderRow = {}
        orderRow.id = item.id;
        let avans = 0;
        //console.log('func:',customers)
        customers.forEach(function(customer){
            if(item.customerId === customer.id){
                orderRow.customer = customer.full_name;
                orderRow.customerID = customer.id;
            }
        })
        item.calculation.payments.forEach(function(pay){
            avans += pay.summa;
        })
        orderRow.avans = avans;
        orderRow.number = item.number;
        orderRow.total = item.calculation.total_cost;
        orderRow.balance = item.calculation.balance;
        orderRow.termin = dateFormat(item.termin.date_finish);
        orderRow.status = item.status;
        orderRow.employer = item.employerName;
        orderRow.notation = 'notation';
        if(item.montaz.montaz_items.length){
            orderRow.montaz = 'есть'
            orderRow.montazPlace = item.montaz.delivery_point;
        }else{
            orderRow.montaz = '-'
            orderRow.montazPlace = '-';
        }
        orderRow.notice = item.notice
        orderRow.text = item.handling.text_grav
        result.push(orderRow)
    })

    return result;
}

export const getOrderForWatch = (orders,customers,orderID) => {
    let result = {customer:{},order:{}}
    orders.forEach(function(item){
        if(item.id === orderID){
            result.order = {...item}
        }
    })
    //console.log(orderID)
    customers.forEach(function(item){
        if(item.id === result.order.customerId){
            result.customer = {...item}
        }
    })
    return result;
}

export const getCalcBlr = (order,rate) => {
    let result = {
        totalBLR:0,
        avanceBLR:0,
        balanceBLR:0,
        totalUSD:0,
        avanceUSD:0,
        balanceUSD:0
    }
    order.complects.forEach(function(complect){
        complect.complect_items.forEach(function(det){
            result.totalUSD += det.price * det.amount
            if(det.rate === null){
                result.totalBLR += (det.price * 3.3) * det.amount
            }else{
                result.totalBLR += (det.price * det.rate) * det.amount
            }

        })
    })
    order.handling.handling_items.forEach(det=>{
        result.totalUSD += det.price * det.amount
        if(det.rate === null){
            result.totalBLR += (det.price * 3.3) * det.amount
        }else{
            result.totalBLR += (det.price * det.rate) * det.amount
        }
    })
    order.montaz.montaz_items.forEach(det=>{
        result.totalUSD += det.price * det.amount
        if(det.rate === null){
            result.totalBLR += (det.price * 3.3) * det.amount
        }else{
            result.totalBLR += (det.price * det.rate) * det.amount
        }
    })
    if(order.handling.hydrophob > 0){
        result.totalUSD += rate[2].USD
        result.totalBLR += rate[2].USD * rate[0].USD
    }
    if(order.montaz.delivery > 0){
        result.totalUSD += rate[1].USD * order.montaz.delivery
        result.totalBLR += (rate[1].USD * rate[0].USD) * order.montaz.delivery
    }
    if(order.calculation.discount!==null){
        result.totalUSD += order.calculation.discount
        result.totalBLR += order.calculation.discount * order.calculation.rate
    }
    if(order.calculation.payments.length){
        order.calculation.payments.forEach(item=>{
            result.avanceUSD += item.summa
            result.avanceBLR += item.summaBlr
        })
    }
    result.balanceUSD = result.totalUSD - result.avanceUSD
    result.balanceBLR = result.totalBLR - result.avanceBLR
    return result
}


