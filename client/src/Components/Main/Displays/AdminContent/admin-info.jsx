import React from 'react';
import c from './../../main.module.css'
import {getOrderStat} from "../../../../Utils/adminSupport";

const AdminInfo = ({state,orders}) => {

   const orderStat = getOrderStat(orders)
//console.log(state.adminInfo)

    return (
        <div className={c.card_wrap_statistic}>
            <div className={c.info_row}>
                <div className={c.info_item}>Все заказы:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.allOrders}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Готовые:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.inReady.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={[c.info_item,c.info_item_orange].join(' ')}>Срочные:</div>
                <div className={c.info_item}></div>
                <div className={[c.info_item,c.info_item_orange].join(' ')}>{state.adminInfo.orderStatistic.orangeOrders.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={[c.info_item,c.info_item_red].join(' ')}>Просроченные:</div>
                <div className={c.info_item}></div>
                <div className={[c.info_item,c.info_item_red].join(' ')}>{state.adminInfo.orderStatistic.redOrders.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Сборка:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.inVol.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Граверка:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.inGrav.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Шлифовка:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.inPolyr.length}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Распил:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.inCut.length}</div>
            </div>
        </div>
    );
};

export default AdminInfo;
