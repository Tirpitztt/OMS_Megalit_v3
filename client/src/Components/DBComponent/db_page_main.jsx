import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../Context/auth.context";
import {useAllOrders} from "../../Hooks/order.hook";
import {getDataBaseArray} from "../../Utils/DB_support";
import DbContent from "./DBList/db_content";
import c from "./dbpage.module.css"
import {nameOrdersSort, nameSort} from "../../Utils/nameSort";
import {format} from "date-fns";
import LoadingData from "../Common/loadingData";

const DbPageMain = (props) => {

    const {userId,userRole,userName} = useContext(AuthContext);
    const today = new Date()
    const formatDate = format(today,'yyyy-MM-dd')
    const year = formatDate.slice(0,4)
    const user = {
        id:userId,
        role:userRole,
        name:userName,
        sort:'current'
    }
    const [orders,customers,yearSort] = useAllOrders(user)

    const [db_state,setDB_state] = useState([])
    const [list,setList] = useState([])
    const [showOrder] = useState(false)

    let display = <LoadingData />

    useEffect(()=>{
        //props.getOrders(user)
        setDB_state(getDataBaseArray(orders,customers))
        setList(getDataBaseArray(orders,customers))
    },[orders,customers])
    if(orders.length && customers.length){
        display = <DbContent row={list} />
    }
    const searchEnter = (e) => {
        setList([])
        let substr = e.target.value;
        let result = nameOrdersSort(db_state,substr,'customer','text')
        setList(result)
    }
    const yearSorted = (e) => {
        yearSort(e.target.value)
    }

    return (
        <div className={c.db_wrap}>
            <div className={c.db_header}>
                <div className={c.db_title}>
                    <p>База данных заказов</p>
                </div>
                <div className={c.db_button_wrap}>
                    <div className={c.sort_box}>
                        <label>Показать:</label>
                        <select onChange={(e)=>yearSorted(e)}>
                            <option value="current">текущие</option>
                            <option value="all">все</option>
                            <option value={year-1}>{year-1}</option>
                            <option value={year}>{year}</option>
                            <option value={parseInt(year)+1}>{parseInt(year)+1}</option>
                            <option value="current-montaz">текущие уст</option>
                            <option value="not-paid">не оплачено</option>
                        </select>
                    </div>

                </div>
                <div className={c.db_search}>
                    <div className={c.search_f}>
                        <input type="text" placeholder="шукай..." onChange={(e)=>searchEnter(e)}/>
                    </div>
                </div>
            </div>
            <div className={c.db_content}>
                {display}
            </div>
        </div>
    );
};

export default DbPageMain;
