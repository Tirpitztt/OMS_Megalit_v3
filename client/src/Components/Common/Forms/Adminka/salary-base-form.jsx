import React from 'react'
import c from '../form.module.css'


const SalaryBaseForm = (props) => {
    let fieldBox = <div>shift is not init</div>
    if(props.active){
        fieldBox = <div className={c.field_box}>
            <select>
                <option value="1">enter</option>
            </select>
            <div>
                <label>notice</label>
                <input />
            </div>
            <div>
                <label>cost</label>
                <input />
            </div>
            <div>
                <label>amount</label>
                <input />
            </div>
            <div>
                <label>summa</label>
                <input />
            </div>
        </div>
    }

    return (
        <div className={c.form_wrap}>
            <div className={c.form_title_box }>Калькуляция зп за смену</div>
            <div className={c.form_content}>
                {props.type }
                {fieldBox}
                <div className={c.button_wrap}>
                    <div>button</div>
                </div>
            </div>

        </div>

    )
}

export default SalaryBaseForm;