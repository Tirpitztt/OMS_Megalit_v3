import {format} from "date-fns";
import {dateFormat} from "./support";

export const setDateTermin = ()=>{
    let date = new Date();
    date.setDate(date.getDate()+90);
    let terminDate = format(date,'yyyy-MM-dd');
    //let terminDate = format(date,'dd-MM-yyyy');
    return terminDate;
}

export const dateTimeFormat = (date) => {
    let ymd = date.slice(0,10)
    let time = date.slice(11,16)
    let reverseDate = dateFormat(ymd)
    return reverseDate + " " + time
     //return format(date,'dd-MM-yyyy')

}
export const onlyDateFormat = (date) => {
    let ymd = date.slice(0,10)
    return dateFormat(ymd)
}

export const setToday = ()=>{
    return format(new Date(),'yyyy-MM-dd');
}
export const convertToDate = (termin) => {
    const body = termin.split('-')
    return new Date(body[2],body[1]-1,body[0])
}
export const getDateEarlier = (termin,days)=>{
    let body = termin.split('-')
    let date = new Date(body[2],body[1]-1,body[0])
    let res =  date.setDate(date.getDate() - days)
    return new Date(res)

}

export const getMonthName = (index) => {
    switch (index+1){
        case 1:{
            return 'январь'
        }
        case 2:{
            return 'февраль'
        }
        case 3:{
            return 'март'
        }
        case 4:{
            return 'апрель'
        }
        case 5:{
            return 'май'
        }
        case 6:{
            return 'июнь'
        }
        case 7:{
            return 'июль'
        }
        case 8:{
            return 'август'
        }
        case 9:{
            return 'сентябрь'
        }
        case 10:{
            return 'октябрь'
        }
        case 11:{
            return 'ноябрь'
        }
        case 12:{
            return 'декабрь'
        }
        default:return 'no name'
    }
}

export const getMonthDays = (year, month) => {
    const days = []
    const date = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    for (let i = 1; i <= daysInMonth; i++) {
        date.setDate(i)
        days.push({day:i,dayOfWeek:daysInWeek[date.getDay()]})
    }
    return days
}
