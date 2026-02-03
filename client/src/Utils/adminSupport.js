import {buildFloat, convertToInt} from "./buildNum";
import {convertToDate, getDateEarlier} from "./dateTermin";
import {dateFormat} from "./support";

export const workOperationBodyBuilder = (body,rate,id=0)=> {

    if(id){
        body.id = id;
    }
    body.stavka = buildFloat(body.stavka);
    body.bonus = buildFloat(body.bonus);
    let stavka = body.stavka;

    body.BLR = (body.stavka + (stavka*(body.bonus/100))).toFixed(2);
    body.USD = (body.BLR/rate).toFixed(3);

    return body;
}

export const stoneBodyBuilder = (data,id=0)=>{
    let body = {}
    if(id){
        body.id = id
    }
    body.name = data.name;
    body.country = data.country;
    body.color = data.color;
    body.ratio = buildFloat(data.ratio);
    body.slabs = []
    body.blocks = []
    data.allFields.forEach(function(item,i){
        if(item.name === 'slabs'){
            item.priceList.forEach(function (slab,i){
                slab.price = buildFloat(slab.price)
                slab.weight = convertToInt(slab.weight)
                body.slabs.push(slab)

            })
        }else{
            item.priceList.forEach(function(block,i){
                block.price = buildFloat(block.price)
                body.blocks.push(block)
            })
        }
    })
    return body;
}
export const getWeightStone = (stoneArr,weight) => {
    let result = 0
    if(stoneArr.length){
        stoneArr.forEach((item,i)=>{
            if(item.weight == weight){
                result = item.price
            }
        })
    }
    return result
}

export const getStoneForEdit = (stoneArr,id) => {
    let result = false
    if(stoneArr.length){
        stoneArr.forEach((item,i)=>{
            if(item.id === id){
                result = item
            }
        })
    }
    return result
}
export const getRedDate = (termin,status,classes) => {

    const dateAboutFinish = getDateEarlier(termin,30)
    const dateFinish = convertToDate(termin)
    const today = new Date()

    if((dateFinish.getTime() < today.getTime()) && (status !== 'отгружен')){
        return classes.red
    }
    if((dateFinish.getTime() > today.getTime()) && (dateAboutFinish.getTime() <= today.getTime())){
        return classes.orange
    }
    return classes.norm
}

export const getOrderStat = (orders) => {
    let result = {
        allOrders:orders.length,
        assemblyOrders:0,
        cutOrders:0,
        redOrders:0,
        gravOrders:0,
        polishOrders:0,
        orangeOrders:0,
        readyOrders:0
    }
    const today = new Date()

    orders.forEach((item)=>{
        const status = item.status
        const dateFinish = convertToDate(dateFormat(item.termin.date_finish))
        const dateAboutFinish = getDateEarlier(dateFormat(item.termin.date_finish),30)
        if((dateFinish.getTime() < today.getTime()) && (status !== 'отгружен')){
            result.redOrders++
        }
        if((dateFinish.getTime() > today.getTime()) && (dateAboutFinish.getTime() <= today.getTime())){
            result.orangeOrders++
        }
        if(status == 'готов') {result.readyOrders++}
        if(status == 'сборка') {result.assemblyOrders++}
        if(status == 'распил') {result.cutOrders++}
        if(status == 'шлифовка') {result.polishOrders++}
        if(status == 'граверка') {result.gravOrders++}
        //console.log(status)
    })

    return result
}

export const getCalcStat = (orders) => {
    let stat = {
        allCost:0,
        allAvanses:0,
        allBalance:0
    }
    orders.forEach(item=>{
        stat.allCost += item.calculation.total_cost
        item.calculation.payments.forEach(pay=>{
            stat.allAvanses += pay.summa
        })
        stat.allBalance += item.calculation.balance
    })

    return stat
}


