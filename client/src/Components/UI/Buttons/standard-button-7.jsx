import React from 'react';
import c from './button.module.css'

const StandardButton7 = ({text,f}) => {

    return (
        <div className={c.standard_button} onClick={f}>
            <p>{text}</p>
        </div>
    );
};

export default StandardButton7;
