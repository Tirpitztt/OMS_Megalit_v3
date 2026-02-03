import React, {useState} from 'react';
import c from './details.module.css'
import ComplectsContent from "./complects-content";

const ComplectList = (props) => {

    let complects = props.order.complects.map((item,i)=>{
        return <div key={i}>
            <div className={c.complect_title}>
                <div className={c.complect_title_item}>комплект : <span>{item.type}</span></div>
                <div className={c.complect_title_item}>стоимость: <span>{(item.summComplect).toFixed(2)} $</span></div>
            </div>
            <div className={c.compl_tabl_head}>
                <div>назв</div>
                <div>артикул</div>
                <div>тип</div>
                <div>сорт</div>
                <div>мат</div>
                <div>статус</div>
                <div>место</div>
                <div>выс</div>
                <div>шир</div>
                <div>толщ</div>
                <div>цена</div>
                <div>кол</div>
            </div>

            <ComplectsContent details={item.complect_items} />
        </div>
    })

    return (
        <div>
            {complects}
        </div>
    );
};

export default ComplectList;
