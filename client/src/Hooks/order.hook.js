import {useEffect, useState} from "react";
import {ordersAPI} from "../Api/api";
import {dateFormat} from "../Utils/support";


export const useOrder = (number)=>{
    let start = ''
    let finish = ''
    let [order,setOrder] = useState({});
    useEffect(()=>{
        ordersAPI.getOrder(number).then(data=>{
            if(data){
                start = dateFormat(data.order.termin.date_start)
                finish = dateFormat(data.order.termin.date_finish)
                data.order.termin.date_start = start;
                data.order.termin.date_finish = finish;
                setOrder(data);
                //console.log('data:',data);
            }

        })
    },[])
    return order;
}
export const useAllOrders = (options) => {
    const [orders,setOrders] = useState([])
    const [customers,setCustomers] = useState([])
    useEffect(()=>{
        ordersAPI.getAllOrders(options).then(data=>{
            setOrders(data)
        })
        ordersAPI.getOnlyCustomers().then(data=>{
            setCustomers(data)
        })
    },[])
    const yearSort = (year) =>{
        options.sort = year
        ordersAPI.getAllOrders(options).then(data=>{
            setOrders(data)
        })
    }

    return [orders,customers,yearSort]
}
