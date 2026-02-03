import React from 'react';
import c from './inp.module.css';


const FormInput = (props) => {
    //console.log(props);
    return (
        <input className={c.input_form} {...props} />
    );
};

export default FormInput;