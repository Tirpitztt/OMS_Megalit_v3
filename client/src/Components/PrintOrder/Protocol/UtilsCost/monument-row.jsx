import React from "react";
import c from './../protocol.module.css'

export const monumentRow = (complect,count,rate,type)=>{
    let cost = 0;
    complect.forEach(item=>{
        if(item.rate){
            cost += (item.price * item.rate) * item.amount
        }else{
            cost += (item.price * rate) * item.amount
        }

    })

    return <div className={c.protocol_table_row}>
        <div className={c.protocol_table_item}>
            {count}
        </div>
        <div className={c.protocol_table_item}>
            {`Изготовление деталей ${type}`}
        </div>
        <div className={c.protocol_table_item}>
            компл.
        </div>
        <div className={c.protocol_table_item}>
            B
        </div>
        <div className={c.protocol_table_item}>
            {cost.toFixed(2)}
        </div>
        <div className={c.protocol_table_item}>
            1
        </div>
        <div className={c.protocol_table_item}>
            {cost.toFixed(2)}
        </div>
    </div>
}
export const shopRow = (item,rate,count)=>{
    let measure;
    switch (item.name){
        case 'щебень':measure = 'мешок' ;break
        case 'трава':measure = 'м.кв.';break
        default:measure = 'шт'
    }
    return <div className={c.protocol_table_row}>
        <div className={c.protocol_table_item}>
            {count}
        </div>
        <div className={c.protocol_table_item}>
            {item.name}
        </div>
        <div className={c.protocol_table_item}>
            {measure}
        </div>
        <div className={c.protocol_table_item}>
            0
        </div>
        <div className={c.protocol_table_item}>
            {(item.price * rate).toFixed(2)}
        </div>
        <div className={c.protocol_table_item}>
            {item.amount}
        </div>
        <div className={c.protocol_table_item}>
            {((item.price * item.amount) * rate).toFixed(2)}
        </div>
    </div>
}

export const handlingRow = (handling,count,rate,hydro)=>{
    let cost = 0;
    // if(handling.hydrophob){
    //     cost += (hydro);
    // }
    if(handling.handling_items.length){
        handling.handling_items.forEach((item)=>{
            if(item.rate){
                cost += (item.price * item.amount) * item.rate;
            }else{
                cost += (item.price * item.amount) * rate;
            }

        })
    }

    return <div className={c.protocol_table_row}>
        <div className={c.protocol_table_item}>
            {count}
        </div>
        <div className={c.protocol_table_item}>
            Обработка (фаски,граверка,распил и пр.)
        </div>
        <div className={c.protocol_table_item}>
            компл
        </div>
        <div className={c.protocol_table_item}>
            0
        </div>
        <div className={c.protocol_table_item}>
            {cost.toFixed(2)}
        </div>
        <div className={c.protocol_table_item}>
            1
        </div>
        <div className={c.protocol_table_item}>
            {cost.toFixed(2)}
        </div>
    </div>
}
export const hydroRow = (hydro,count)=>{
    return <div className={c.protocol_table_row}>
        <div className={c.protocol_table_item}>
            {count}
        </div>
        <div className={c.protocol_table_item}>
            Гидрофобное покрытие
        </div>
        <div className={c.protocol_table_item}>
            компл
        </div>
        <div className={c.protocol_table_item}>
            0
        </div>
        <div className={c.protocol_table_item}>
            {hydro.toFixed(2)}
        </div>
        <div className={c.protocol_table_item}>
            1
        </div>
        <div className={c.protocol_table_item}>
            {hydro.toFixed(2)}
        </div>
    </div>
}
export const montazRow = (item,count)=>{
    return <div className={c.protocol_table_row}>
        <div className={c.protocol_table_item}>
            {count}
        </div>
        <div className={c.protocol_table_item}>
            {item.name}
        </div>
        <div className={c.protocol_table_item}>
            {item.measure}
        </div>
        <div className={c.protocol_table_item}>
            0
        </div>
        <div className={c.protocol_table_item}>
            {item.price.toFixed(2)}
        </div>
        <div className={c.protocol_table_item}>
            {item.amount}
        </div>
        <div className={c.protocol_table_item}>
            {item.cost.toFixed(2)}
        </div>
    </div>
}
