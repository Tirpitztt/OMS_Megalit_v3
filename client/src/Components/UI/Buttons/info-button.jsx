import React from 'react';
import c from './button.module.css';

const InfoButton = (props) => {

    const click = (func,num=0)=>{
        func(num);
    }

    return (
        <div className={c.info_button} onClick={()=>click(props.func,props.number)}>

        </div>
    );
};

export default InfoButton;
