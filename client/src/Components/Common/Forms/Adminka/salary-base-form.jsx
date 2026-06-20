import React from 'react'
import c from '../form.module.css'


const SalaryBaseForm = (props) => {


    return (
        <div className={c.form_wrap}>
            <div className={c.form_title_box }></div>
            Base form
            {props.type }
        </div>

    )
}

export default SalaryBaseForm;