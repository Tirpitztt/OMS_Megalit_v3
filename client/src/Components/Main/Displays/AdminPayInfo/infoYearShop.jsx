import React from 'react';
import c from './payInfo.module.css'
import InfoMonthShopRow from "./infoMonthShopRow";

const InfoYearShop = (props) => {
    let monthData = []
    if(props.state.month.length){
        monthData = props.state.month.map((data,index)=>{
            return <InfoMonthShopRow key={index} state={data} month={index} />
        })
    }
    return (
        <div className={c.table_shop_wrap}>
            <div className={c.table_shop_title}>
                <p>{props.state.year}</p>
            </div>
            <div className={c.table_shop_content}>
                <div className={c.table_shop_title_row}>
                    <div className={c.table_shop_title_item}>..</div>
                    <div className={c.table_shop_title_item}>База</div>
                    <div className={c.table_shop_title_item}>Советская,37</div>
                    <div className={c.table_shop_title_item}>рынок Престиж</div>
                    <div className={c.table_shop_title_item}>рынок Красноармейская</div>
                </div>
                {monthData}
            </div>
        </div>
    );
};

export default InfoYearShop;
