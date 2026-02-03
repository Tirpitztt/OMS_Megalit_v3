import React from 'react';
import c from './../details.module.css'
import DetailDeleteButton from "../../../UI/Buttons/detail-delete-button";

const DetailsTable = (props) => {


    const delDet = (cml,det)=>{
        let data = {
            complectId:cml,
            id:det
        }
        props.delDetal(data);
        props.changeCrux();
    }

    let detail = <tr><td>нет деталей....</td></tr>
    if(props.props.length){
        detail = props.props.map((item,i)=>{
            //console.log(item)
            return <tr key={i}><td>{item.name}</td><td>{item.article}</td><td>{item.material}</td>
                        <td>{item.height}x{item.width}x{item.weight}</td>
                        <td>{(item.price).toFixed(2)}</td>
                        <td>{item.amount}</td>
                        <td>{(item.price*item.amount).toFixed(2)}</td>
                        <td><DetailDeleteButton func={delDet} param={item.complectId} param2={item.id}/></td>
            </tr>
        })
    }

    return (
        <table className={c.details_table}>
            <thead>
                <tr><th>наименование</th><th>артикул</th><th>материал</th><th>размер</th>
                    <th>цена</th><th>кол-во</th><th>сумма</th><th></th></tr>
            </thead>
            <tbody>
            {detail}
            </tbody>
        </table>
    );
};

export default DetailsTable;
