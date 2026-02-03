import React from 'react';
import c from './inp.module.css';

const InputBlock = ({label,value,changeF,type}) => {
    const onChange = (val) => {
        changeF(val)
    }
    return (
        <div className={c.wrap}>
            <div className={c.items}><label>{label}</label></div>
            <div className={c.items}><input type={type}
                                            value={value}
                                            onChange={(e)=>onChange(e.target.value)}/></div>
        </div>
    );
};

export default InputBlock;
