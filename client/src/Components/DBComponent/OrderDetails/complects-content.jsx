import React from 'react';
import c from './details.module.css'


const ComplectsContent = (props) => {

    let details = props.details.map((item,i)=>{
        return <div key={i} className={c.compl_tabl_row}>
            <div>{item.name}</div>
            <div>{item.articul}</div>
            <div>{item.type}</div>
            <div>{item.sort}</div>
            <div>{item.material}</div>
            <div>{item.status}</div>
            <div>{item.local}</div>
            <div>{item.height}</div>
            <div>{item.width}</div>
            <div>{item.weight}</div>
            <div>{(item.price).toFixed(2)}</div>
            <div>{item.amount}</div>
        </div>
    })

    return (
        <div>{details}</div>
    );
};

export default ComplectsContent;
