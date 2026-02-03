import React from 'react';
import c from './button.module.css'

const AddButtonDb = (props) => {
    const onClick = () => {
        props.func(props.type)
    }
    return (
        <div className={c.add_button_db} onClick={onClick}>
            добавить
        </div>
    );
};

export default AddButtonDb;
