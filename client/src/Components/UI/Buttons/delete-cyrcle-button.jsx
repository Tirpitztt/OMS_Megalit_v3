import React from 'react';
import c from './button.module.css';

const DeleteCyrcleButton = (props) => {

    const click = (func,num=0)=>{
        func(num);
    }

    return (
        <div className={c.delete_cyr_button} onClick={()=>click(props.func,props.number)}>

        </div>
    );
};

export default DeleteCyrcleButton;
