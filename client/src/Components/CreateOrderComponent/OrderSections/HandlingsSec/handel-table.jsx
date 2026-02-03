import React from 'react';
import c from './../sections.module.css';
import DetailDeleteButton from "../../../UI/Buttons/detail-delete-button";

const HandelTable = (props) => {
    const delElement = (id)=>{
        props.delHandel(id);
        props.changeTotal();
    }
    let detail = <tr><td>No details...</td></tr>
    if(props.details.length){
        detail = props.details.map((item,i)=>{
            return <tr key={i}><td>{item.name}</td><td>{item.category}</td>
                <td>{item.size}</td><td>{item.price}</td><td>{item.amount}</td><td>{item.price*item.amount}</td>
                <td><DetailDeleteButton func={delElement} param={item.id} /></td></tr>
        })
    }

    return (
        <table className={c.hand_table}>
            <thead>
                <tr>
                   <th>наимен</th><th>категория</th><th>размер</th>
                    <th>цена</th><th>кол-во</th><th>сумма</th><th></th>
                </tr>
            </thead>
            <tbody>
               {detail}
            </tbody>
        </table>
    );
};

export default HandelTable;
