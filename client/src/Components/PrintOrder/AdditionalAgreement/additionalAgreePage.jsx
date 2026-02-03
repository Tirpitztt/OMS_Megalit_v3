import React from 'react';
import c from "./agree.module.css";
import {useParams} from "react-router-dom";
import {convertToInt} from "../../../Utils/buildNum";
import {useOrder} from "../../../Hooks/order.hook";
import AgreeItem from "./agreeItem";

const AdditionalAgreePage = () => {
    const number = useParams();
    const orderId = convertToInt(number.orderId)
    const {order,customer} = useOrder(orderId);
    let agrees = null;
    if(order && order.edited_historys.length){
        agrees = order.edited_historys.map((item,i)=>{
            return <div className='print'>
                <AgreeItem agree={item}
                           order={order}
                           customer={customer}
                           number={i+1}
                />
            </div>
        })
    }




    const printClick = ()=>{
        window.print();
    }
    return (
        <div className={c.main_wrap}>
            <div className={c.printbut_box}>
                <button onClick={printClick}>Печать</button>
            </div>
            {agrees}

            {/*<div className='print'>*/}
            {/*    {agrees}*/}
            {/*</div>*/}

        </div>
    );
};

export default AdditionalAgreePage;
