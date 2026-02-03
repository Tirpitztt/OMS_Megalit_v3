import React from 'react';
import c from "../CheckListPage/checkList.module.css";
import UpperSec from "../upperSec";
import MiddleHandSec from "./middleHandSec";
import DownHandSec from "./downHandSec";

const HandPage = ({order,customer}) => {
    return (
        <div className={c.wrapper}>
            <div className={c.header}>
                <p>Спецификация граверных работ к заказу № <span className={c.numorder}>{order.number}</span>
                    от  <span>{order.termin.date_start}</span></p>
            </div>
            <UpperSec order={order} customer={customer} />
            <MiddleHandSec order={order} />
            <DownHandSec order={order} />
        </div>
    );
};

export default HandPage;
