import React from 'react';
import c from './details.module.css'


const MontazInfo = (props) => {

    let montazItems = props.order.montaz.montaz_items.map((item,i)=>{
        return <div key={i} className={c.info_handle_head}>
            <div>{item.name}</div>
            <div>{item.category}</div>
            <div>{item.type}</div>
            <div>{(item.price).toFixed(2)}</div>
            <div>{item.amount}</div>
        </div>
    })


    return (
        <div className={c.main_info_box}>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>благоустройство и монтажные работы</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <div className={c.info_handle_row}>
                        <div>наименование</div>
                        <div>категория</div>
                        <div>тип</div>
                        <div>цена</div>
                        <div>кол</div>
                    </div>
                    {montazItems}
                </div>
            </div>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>прочее</div>
                    </div>
                    <div className={c.info_edit_button}>

                    </div>
                </div>
                <div className={c.info_content_box}>
                        <div className={c.montaz_other_row}>
                            <div className={c.montaz_other_row_side}><p>Размеры участка:</p></div>
                            <div className={c.montaz_other_row_side}><p>{props.order.montaz.width} x {props.order.montaz.weight} x {props.order.montaz.height}</p></div>
                        </div>
                    <div className={c.montaz_other_row}>
                        <div className={c.montaz_other_row_side}><p>Пункт доставки:</p></div>
                        <div className={c.montaz_other_row_side}><p>{props.order.montaz.delivery_point}</p></div>
                    </div>
                    <div className={c.montaz_other_row}>
                        <div className={c.montaz_other_row_side}><p>Доставка,км:</p></div>
                        <div className={c.montaz_other_row_side}><p>{props.order.montaz.delivery}</p></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MontazInfo;
