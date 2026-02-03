import React from 'react';
import c from'./payInfo.module.css'
import {getMonthName} from "../../../../Utils/dateTermin";

const InfoMonthShopRow = ({state,month}) => {
    const monthName = getMonthName(month)
    // let bazaCount = '-'
    // let prestizCount = '-',baniaCount='-',sovietCount = '-'
    // let bazaTotal='-',sovietTotal='-',baniaTotal='-',prestizTotal = '-'
    // let bazaBalance='-',sovietBalance='-',baniaBalance='-',prestizBalance = '-'
    const itemNull = '-'

    return (
        <div className={c.table_shop_month_row_wrap}>
            <div className={c.table_shop_month}>
                <div>
                    <div>{monthName}</div>
                </div>
                <div>
                    <div className={c.table_shop_sort_row}>кол-во заказов</div>
                    <div className={c.table_shop_sort_row}><span>$</span>, заказов</div>
                    <div className={c.table_shop_sort_row}><span>&sum;</span>,остатков</div>
                </div>
            </div>
            <div className={c.table_shop_data_box}>
                <div className={c.table_shop_data_row}>{state.bazaShopCount >0?state.bazaShopCount:itemNull}</div>
                <div className={c.table_shop_data_row}>{state.bazaShopTotal > 0?state.bazaShopTotal.toFixed(2):itemNull}</div>
                <div className={c.table_shop_data_row}>{state.bazaShopBalance >0?state.bazaShopBalance.toFixed(2):itemNull}</div>
            </div>
            <div className={c.table_shop_data_box}>
                <div className={c.table_shop_data_row}>{state.sovietShopCount >0?state.sovietShopCount:itemNull}</div>
                <div className={c.table_shop_data_row}>{state.sovietShopTotal>0?state.sovietShopTotal.toFixed(2):itemNull}</div>
                <div className={c.table_shop_data_row}>{state.sovietShopBalance>0?state.sovietShopBalance.toFixed(2):itemNull}</div>
            </div>
            <div className={c.table_shop_data_box}>
                <div className={c.table_shop_data_row}>{state.prestizShopCount >0?state.prestizShopCount:itemNull}</div>
                <div className={c.table_shop_data_row}>{state.prestizShopTotal>0?state.prestizShopTotal.toFixed(2):itemNull}</div>
                <div className={c.table_shop_data_row}>{state.prestizShopBalance>0?state.prestizShopBalance.toFixed(2):itemNull}</div>
            </div>
            <div className={c.table_shop_data_box}>
                <div className={c.table_shop_data_row}>{state.baniaShopCount >0?state.baniaShopCount:itemNull}</div>
                <div className={c.table_shop_data_row}>{state.baniaShopTotal>0?state.baniaShopTotal.toFixed(2):itemNull}</div>
                <div className={c.table_shop_data_row}>{state.baniaShopBalance>0?state.baniaShopBalance.toFixed(2):itemNull}</div>
            </div>

        </div>
    );
};

export default InfoMonthShopRow;
