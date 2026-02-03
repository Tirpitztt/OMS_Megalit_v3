const Model = require('../models')
const {format} = require("date-fns");


const getNumber = async ()=>{
    let number = 1
    const date = new Date()
    const today = format(date,'yyyy-MM-dd')
    const year = today.slice(0,4)
    let numbers = []
    const orders = await Model.orders.findAll({
        include:[{
            model:Model.termins
        }]
    })
    orders.forEach(function(item){
        if(item.termin.date_start.slice(0,4) === year){
            numbers.push(item.number)
        }
    })
    if(numbers.length){
        number = Math.max(...numbers) + 1
    }
    return number
}

module.exports = getNumber



