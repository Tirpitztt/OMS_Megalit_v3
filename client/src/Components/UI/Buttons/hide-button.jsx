import React from 'react';
import c from './button.module.css';

const HideButton = (props) => {

    const click = (func,num=0)=>{
        func(num);
    }

    return (
        <div className={c.hide_button} onClick={()=>click(props.func,props.number)}>

        </div>
    );
};

export default HideButton;
