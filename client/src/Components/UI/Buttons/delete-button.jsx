import React from 'react';
import c from './button.module.css';

const DeleteButton = (props) => {

    return (
        <div className={c.delete_button} onClick={()=>props.del(props.number)}>
            <p><span>X</span> удалить</p>
        </div>
    );
};

export default DeleteButton;