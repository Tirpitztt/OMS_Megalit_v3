import React from 'react';
import c from "./checkList.module.css";
import UpperSec from "../upperSec";


const CheckList = ({order,customer}) => {
    return (
        <div className={c.wrapper}>
            <div className={c.header}>
                <p>Чек-лист к заказу № <span className={c.numorder}>{order.number}</span>
                    от  <span>{order.termin.date_start}</span></p>
            </div>
            <UpperSec order={order} customer={customer}/>
        </div>
    );
};

export default CheckList;
