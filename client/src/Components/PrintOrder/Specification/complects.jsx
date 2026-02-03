import React from 'react';
import c from './specification.module.css';
import RowTable from "./rowTable";


const Complects = (props) => {
    let compl = 'нет комплектации'
    if(props.state){
        compl = props.state.map((item,i)=>{
            let row = item.complect_items.map((detal,j)=>{
                return <RowTable key={j} state={detal} />
            })
            return <div key={i}>
                <p>Комплект: {item.type}</p>
                <table className={c.compl_table}>
                    <thead><tr>
                        <th>наименование</th><th>материал</th><th>р-р</th><th>кол-во</th><th>сорт</th>
                    </tr>
                    </thead>
                    <tbody>
                    {row}
                    </tbody>
                </table>
            </div>
        })
    }

    return (
        <div>
            {compl}
        </div>
    );
};

export default Complects;