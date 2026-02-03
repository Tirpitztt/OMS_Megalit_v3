import React from 'react';
import c from './button.module.css';

const AddMatButton = (props) => {

    const onClick = ()=>{
        //console.log('click')
        props.add();
    }

    return (
        <div className={c.add_button} onClick={onClick} >
            добавить
        </div>
    );
}

export default AddMatButton;
