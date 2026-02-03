import React from 'react';
import c from './payInfo.module.css'
import {getMonthName} from "../../../../Utils/dateTermin";

const InfoYearTableMounth = (props) => {


    const monthName = getMonthName(props.index)

    return (
        <div className={c.table_column_content}>
            <div className={c.table_column_content_row_month_name}>
                <div>{monthName}</div>
            </div>
            <div className={c.table_column_content_row}>
                <div>Всего заказов:</div>
                <div>{props.state.orders.length}</div>
            </div>
            <div className={c.table_column_content_row}>
                <div>Всего выручка:</div>
                <div>{props.state.totalCost.toFixed(2)}</div>
            </div>
            <div className={c.table_column_content_row}>
                <div>Авансы:</div>
                <div>{(props.state.paymentCash+props.state.paymentBank).toFixed(2)}</div>
            </div>
            <div className={c.table_column_content_row_min}>
                <div>- в том числе банк:</div>
                <div>{(props.state.paymentBank).toFixed(2)}</div>
            </div>
            <div className={c.table_column_content_row_min}>
                <div>- в том числе нал:</div>
                <div>{(props.state.paymentCash).toFixed(2)}</div>
            </div>
            <div className={c.table_column_content_row}>
                <div>Остатки:</div>
                <div>{(props.state.balance).toFixed(2)}</div>
            </div>
            <div className={c.table_column_content_row_min}>
                <div>- в том числе долги:</div>
                <div>{(props.state.receivable).toFixed(2)}</div>
            </div>
        </div>
    );
};

export default InfoYearTableMounth;
