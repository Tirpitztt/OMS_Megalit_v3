import React from 'react';
import c from "./specification.module.css";

const HandTable = (props) => {

    let row = 'нет данных';
    if(props.state){
        row = props.state.handling_items.map((item,i)=>{
            return <tr key={i}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.size}</td>
                <td>{item.amount}</td>
            </tr>
        })

    }

    return (
        <table className={c.compl_table}>
            <thead>
            <tr>
                <th>обработка</th><th>категория</th>
                <th>размер</th><th>кол-во</th>
            </tr>
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    );
};

export default HandTable;