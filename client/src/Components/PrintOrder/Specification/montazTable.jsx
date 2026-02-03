import React from 'react';
import c from './specification.module.css';


const MontazTable = (props) => {
    let row = 'нет данных';
    if(props.state){
        row = props.state.montaz_items.map((item,i)=>{
            return <tr key={i}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
            </tr>
        })
    }
    return (
        <table className={c.compl_table}>
            <thead>
            <tr><th>наименование</th><th>категория</th>
                <th>тип</th><th>кол-во</th></tr>
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    );
};

export default MontazTable;