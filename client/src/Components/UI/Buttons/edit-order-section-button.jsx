import React from 'react';
import c from './button.module.css'

const EditOrderSectionButton = ({title,active,activator}) => {
    const isActive = active
    const onClick = ()=>{
        activator()
    }
    return (
        <div className={isActive?c.edit_order_sec_button:c.edit_order_sec_button_nonact}
        onClick={()=>onClick()}>
            {title}
        </div>
    );
};

export default EditOrderSectionButton;
