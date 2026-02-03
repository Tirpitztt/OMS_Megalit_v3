import React from 'react';
import c from './button.module.css';

const AddButton = (props) => {

    return (
        <div className={c.add_button} onClick={()=>{props.add(true);console.log('click')}}>
             добавить
        </div>
    );
};

export default AddButton;
