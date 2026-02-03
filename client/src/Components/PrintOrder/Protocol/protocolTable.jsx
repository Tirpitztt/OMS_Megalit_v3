import React, {useState} from 'react';
import c from './protocol.module.css';
import {handlingRow, hydroRow, montazRow, monumentRow, shopRow} from "./UtilsCost/monument-row";
const ProtocolTable = (props) => {
    let rows = [];
    let row = '';
    let count = 1;
    let montazItem = {};
    let totalCost = 0;

    if(props.state){
        if(props.state.complects.length){
            props.state.complects.forEach((item)=>{
                if(item.type === 'памятник' || item.type === 'ограда' || item.type.startsWith('standart')){
                    row = monumentRow(item.complect_items,count,props.rate,item.type);
                    rows.push(row);
                    count++;
                }
                if(item.type === 'магазин'){
                    item.complect_items.forEach((detal)=>{
                        if(detal.rate){
                            row = shopRow(detal,detal.rate,count)
                            rows.push(row);
                        }else{
                            row = shopRow(detal,props.rate,count)
                            rows.push(row);
                        }
                        count++;
                    })
                }
            })
        }
        if(props.state.handling){
            row = handlingRow(props.state.handling,count,props.rate)
            rows.push(row);
            count++;
            if(props.state.handling.hydrophob){
                row = hydroRow(props.hydro,count)
                rows.push(row)
                count++
            }
        }
        if(props.state.montaz.montaz_items.length){
            props.state.montaz.montaz_items.forEach(item=>{
                montazItem.amount = item.amount;
                if(item.rate){
                    montazItem.price = item.price * item.rate;
                    montazItem.cost = (item.price * item.amount) * item.rate;
                }else{
                    montazItem.price = item.price * props.rate;
                    montazItem.cost = (item.price * item.amount) * props.rate;
                }

                if(item.category === 'памятник' || item.category === 'ограждение'){
                    montazItem.name = `Монтаж ${item.category} ${item.name}`;
                    montazItem.measure = 'компл';
                }
                if(item.category === 'пол'){
                    montazItem.name = `Изготовление ${item.category} ${item.name}`;
                    montazItem.measure = 'м.кв.';
                }
                if(item.category === 'аксессуары' || item.category === 'прочее'){
                    montazItem.name = `Благоустройство ${item.category} ${item.name}`;
                    montazItem.measure = 'шт';
                }
                rows.push(montazRow(montazItem,count));
                count++;
            })
        }
        if(props.state.montaz.delivery){
            montazItem.name = `Доставка - ${props.state.montaz.delivery_point}`;
            montazItem.measure = 'км';
            montazItem.price = props.delivery || 0;
            montazItem.amount = props.state.montaz.delivery;
            montazItem.cost = (props.state.montaz.delivery * props.delivery);
            rows.push(montazRow(montazItem,count));
            count++;
        }
        totalCost = props.calculator.totalBLR;

    }
    let discountRow = null;
    if(props.state.calculation.discount){
        discountRow = <div className={c.protocol_table_endrow}>
            <div className={c.protocol_table_item_total}>Скидка:</div>
            <div className={c.protocol_table_item_total}>{(props.state.calculation.discount * props.state.calculation.rate).toFixed(2)}</div>
        </div>
        rows.push(discountRow);
    }
    return (
        <div className={c.protocol_table}>
            <div className={c.protocol_table_row}>
                <div className={c.protocol_table_item}>
                    N
                </div>
                <div className={c.protocol_table_item}>
                    Наименование
                </div>
                <div className={c.protocol_table_item}>
                    ед.изм
                </div>
                <div className={c.protocol_table_item}>
                    кат
                </div>
                <div className={c.protocol_table_item}>
                    цена
                </div>
                <div className={c.protocol_table_item}>
                    кол-во
                </div>
                <div className={c.protocol_table_item}>
                    стоимость,руб
                </div>
            </div>
            <div>
                {rows}
                <div className={c.protocol_table_endrow}>
                    <div className={c.protocol_table_item_total}>
                        Итого:
                    </div>
                    <div className={c.protocol_table_item_total}>
                        {`${totalCost.toFixed(2)},руб`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProtocolTable;
