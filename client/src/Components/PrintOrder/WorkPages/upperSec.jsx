import React from 'react';
import c from './workPages.module.css'
import ComplectationSec from "./complectationSec";
import {sketchGallery} from "../../../Utils/support";

const UpperSec = ({order,customer,page}) => {
    let img = '';
    const styles = [c.sketch1,c.sketch2,c.sketch3]
    if(order.cards.length){
        img = sketchGallery(order.cards,styles)
    }
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
                        <p>{order.termin.date_finish}</p>
                    </div>
                </div>
                <div className={c.complect_box}>
                    <ComplectationSec order={order} />
                </div>
            </div>
        </div>
    );
};

export default UpperSec;
