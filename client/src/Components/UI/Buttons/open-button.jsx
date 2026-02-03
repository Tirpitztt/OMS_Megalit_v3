import React from 'react';
import c from './button.module.css';

const OpenButton = (props) => {

    const click = (func,num=0)=>{
        func(num);
    }

    return (
        <div className={c.open_button} onClick={()=>click(props.func,props.number)}>

        </div>
    );
};

export default OpenButton;
