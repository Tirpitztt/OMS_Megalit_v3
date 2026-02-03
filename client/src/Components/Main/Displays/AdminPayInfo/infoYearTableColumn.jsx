import React from 'react';
import c from './payInfo.module.css'
import InfoYearTableMounth from "./infoYearTableMounth";

const InfoYearTableColumn = (props) => {
    let month = []
    if(props.state.month.length){
        month = props.state.month.map((month,index) => {
            return <InfoYearTableMounth key={index} state={month} index={index} />
        })
    }
    return (
        <div className={c.table_column_wrap}>
            <div className={c.table_column_title}>
                <p>{props.state.year}</p>
            </div>
            <div className={c.table_column_content}>
                <div className={c.table_column_content_row}>
                    <div>Всего продано:</div>
                    <div>{props.state.totalCost.toFixed(2)}</div>
                </div>
                <div className={c.table_column_content_row}>
                    <div>Авансы:</div>
                    <div>{(props.state.paymentBank + props.state.paymentCash).toFixed(2)}</div>
                </div>
                <div className={c.table_column_content_row}>
                    <div>Остатки:</div>
                    <div>{(props.state.totalCost - (props.state.paymentBank + props.state.paymentCash)).toFixed(2)}</div>
                </div>
                <div className={c.table_column_content_row_min}>
                    <div>-в том числе долги:</div>
                    <div>{props.state.receivable.toFixed(2)}</div>
                </div>
                <div className={c.table_column_content_row}>
                    <div>Кол-во заказов:</div>
                    <div>{props.state.totalCount}</div>
                </div>
            </div>
            {month}

        </div>
    );
};

export default InfoYearTableColumn;
