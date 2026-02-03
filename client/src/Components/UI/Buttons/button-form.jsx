import React from 'react';
import c from './button.module.css';


const ButtonForm = ({children,...props}) => {
    return (
        <button {...props} className={c.button_big}>
            {children}
        </button>
    );
};

export default ButtonForm;