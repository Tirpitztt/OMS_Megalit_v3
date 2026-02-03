import React from 'react';
import c from './button.module.css';

const EditCyrcleButton = (props) => {

    const onClick = (props) => {
        props.edit(props.item);
        props.modal(true);

    }

    return (
        <div className={c.edit_cyr_button} onClick={()=>onClick(props)}>

        </div>
    );
};

export default EditCyrcleButton;
