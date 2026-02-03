import React from 'react';
import c from './../sections.module.css';
import DetailDeleteButton from "../../../UI/Buttons/detail-delete-button";

const MontazTable = (props) => {

    const deleteDetail = (id)=>{
        props.delMontaz(id);
        props.changeCrux();
    }
    let details = <tr><td>No details...</td></tr>
    if(props.state.length){
        details = props.state.map((detail,i)=>{
            return <tr><td>{detail.name}</td><td>{detail.category}</td><td>{detail.type}</td>
                <td>{detail.price}</td><td>{detail.amount}</td><td>{(detail.price*detail.amount).toFixed(2)}</td>
                <td><DetailDeleteButton func={deleteDetail} param={detail.id} /></td></tr>
        })
    }

    return (
        <table className={c.hand_table}>
            <thead>
                <tr>
                    <th>наименование</th><th>категория</th><th>тип</th>
                    <th>цена</th><th>кол-во</th><th>сумма</th><th></th>
                </tr>
            </thead>
            <tbody>{details}</tbody>
        </table>
    );
};

export default MontazTable;
