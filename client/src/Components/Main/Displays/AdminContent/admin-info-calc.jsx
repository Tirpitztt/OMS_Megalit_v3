import React from 'react';
import c from './../../main.module.css'
import {getCalcStat} from "../../../../Utils/adminSupport";

const AdminInfoCalc = ({state,orders}) => {

    const calcStat = getCalcStat(orders)

    return (
        <div className={c.card_wrap_statistic}>
            <div className={c.info_row}>
                <div className={c.info_item}>Все заказы:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{(state.adminInfo.balance.totalCost).toFixed(2)}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Авансы:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{(state.adminInfo.balance.paymentCash + state.adminInfo.balance.paymentBank).toFixed(2)}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>-в том числе банк:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{(state.adminInfo.balance.paymentBank).toFixed(2)}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>-в том числе нал:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{(state.adminInfo.balance.paymentCash).toFixed(2)}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Остатки:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{(state.adminInfo.balance.balance).toFixed(2)}</div>
            </div>

        </div>
    );
};

export default AdminInfoCalc;
