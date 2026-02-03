import React from 'react';
import c from './workPages.module.css'

const ComplectationSec = ({order}) => {

    let bodyCompl = []
    let bodyRows = null
    if(order.complects.length){
        order.complects.forEach(complect=>{
            complect.complect_items.forEach(detail=>{
                bodyCompl.push(detail)
            })

        })
    }
    const rowsCreate = (array) => {
        return  array.map((item,ind)=>{
            let widthTd = null
            if(item.material.startsWith('Бетон') || item.name.startsWith('ваза')){
                widthTd = <p>{item.articul}</p>
            }else{
                if(item.name==='цветник'||item.name==='подставка'){
                    widthTd = <p>{item.material}-{item.width}x{item.height}x{item.weight}</p>
                }else{
                    widthTd = <p>{item.material}-{item.height}x{item.width}x{item.weight}</p>
                }
            }
            //let widthTd = <p>{detail.material}{detail.height}x{detail.width}x{detail.weight}</p>
            return <div className={c.comp_body_row} key={ind}>
                <p>{item.name}</p>
                {widthTd}
                <p>{item.amount}шт</p>
            </div>
        })
    }
    if(bodyCompl.length){
        bodyRows = rowsCreate(bodyCompl)
    }
    return (
        <div className={c.complect_sec}>
            <div className={c.comp_title}>
                <p>Комплектация</p>
            </div>
            <div className={c.comp_body}>
                {bodyRows}
            </div>
        </div>
    );
};

export default ComplectationSec;
