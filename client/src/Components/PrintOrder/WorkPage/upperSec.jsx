import React from 'react';
import c from './workPage.module.css';
import {getCalcBlr} from "../../../Utils/DB_support";
import {sketchGallery} from "../../../Utils/support";

const UpperSec = ({calculator,order,termin,customer,rate,sketchPath,notice}) => {

    let img = '';
    const styles = [c.sketch1,c.sketch2,c.sketch3]
    if(order.cards.length){
        img = sketchGallery(order.cards,styles)
    }
    const calcBlr = getCalcBlr(order,rate)

    return (
        <div className={c.upper_wrap}>
            <div className={c.upper_box}>
                <div className={c.img_box}>{img}</div>
            </div>
            <div className={c.upper_box}>
                <div className={c.customer_box}>
                    <div className={c.cust_row}>
                        <p className={c.lbl}>Заказчик:</p>
                        <p>{customer.full_name}</p>
                    </div>
                    <div className={c.cust_row}>
                        <p className={c.lbl}>Адрес:</p>
                        <p>{customer.address}</p>
                    </div>
                    <div className={c.cust_row}>
                        <p className={c.lbl}>Телефон:</p>
                        <p>{customer.phone}</p>
                    </div>
                    <div className={c.cust_row}>
                        <p className={c.lbl}>Сроки:</p>
                        <p>{termin.date_finish}</p>
                    </div>
                </div>
                <div className={c.calc_box}>
                    <div className={c.row_calc}>
                        <p className={c.lbl}>Стоимость:</p>
                        <p className={c.coinmin}>{(calculator.totalBLR).toFixed(2)} <span>бел.руб</span></p>
                        <p>{(calculator.totalUSD).toFixed(2)} </p>
                    </div>
                    <div className={c.row_calc}>
                        <p className={c.lbl}>Аванс:</p>
                        <p>{(calculator.avanceBLR).toFixed(2)} <span>бел.руб</span></p>
                        <p>{calculator.avanceUSD.toFixed(2)} </p>
                    </div>
                    <div className={c.row_calc}>
                        <p className={c.lbl}>Остаток:</p>
                        <p>{(calculator.balanceBLR).toFixed(2)} <span>бел.руб</span></p>
                        <p>{(calculator.balanceUSD).toFixed(2)} </p>
                    </div>
                </div>
                <div className={c.prim_box}>
                    <div className={c.row_prim}>Примечание:{order.calculation.rate}</div>
                    <div className={c.row_prim_block}><pre>{notice}</pre></div>

                </div>
            </div>
        </div>
    );
};

export default UpperSec;
