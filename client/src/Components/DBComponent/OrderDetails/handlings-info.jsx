import React from 'react';
import c from './details.module.css'

const HandlingsInfo = (props) => {
    let handleItems = props.order.handling.handling_items.map((item,i)=>{
        return <div key={i} className={c.info_handle_head}>
            <div>{item.name}</div>
            <div>{item.category}</div>
            <div>{item.size}</div>
            <div>{(item.price).toFixed(2)}</div>
            <div>{item.amount}</div>
        </div>
    })
    return (
        <div className={c.main_info_box}>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>оформление</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <div className={c.info_handle_row}>
                        <div>наименование</div>
                        <div>категория</div>
                        <div>параметры</div>
                        <div>цена</div>
                        <div>кол</div>

                    </div>
                    {handleItems}
                </div>
            </div>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>текст на памятник</div>
                    </div>
                    <div className={c.info_edit_button}>

                    </div>
                </div>
                <div className={c.info_content_box}>
                    <div><pre>{props.order.handling.text_grav}</pre></div>
                </div>
            </div>
        </div>
    );
};

export default HandlingsInfo;
