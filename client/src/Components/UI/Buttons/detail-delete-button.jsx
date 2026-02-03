import React from 'react';
import c from './button.module.css';

const DetailDeleteButton = (props) => {

    const click = (func,param=0,param2=0)=>{
        func(param,param2);
    }

    return (
        <div className={c.delete_cyr_button} onClick={()=>click(props.func,props.param,props.param2)}>

        </div>
    );
};

export default DetailDeleteButton;
