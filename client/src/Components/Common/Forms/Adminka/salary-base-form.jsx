import React from 'react'
import c from '../form.module.css'
import {FORM_BASE, FORM_CONCREATE, FORM_MONTAZ, FORM_POLISH, FORM_VARIED} from "../../../../Utils/variables-const";
import SalaryPolishForm from "./salary-polish-form";
import SalaryConcreateForm from "./salary-concreate-form";
import SalaryMontazForm from "./salary-montaz-form";
import SalaryVariedForm from "./salary-varied-form";



const SalaryBaseForm = (props) => {
    console.log(props.state)
    let fieldBox = <div>shift is not init</div>

    let accessorialFields = null
    if(props.state.formOptions.workShop === FORM_POLISH){
        accessorialFields = <SalaryPolishForm />
    }else if(props.state.formOptions.workShop === FORM_CONCREATE){
        accessorialFields = <SalaryConcreateForm />
    }else if(props.state.formOptions.workShop === FORM_MONTAZ){
        accessorialFields = <SalaryMontazForm />
    }else if(props.state.formOptions.workShop === FORM_VARIED){
        accessorialFields = <SalaryVariedForm />
    }

    const workOperationChange = (operationID) => {
        let reqBody = {
            workShop:props.state.formOptions.workShop,
            operationID:operationID
        }
        console.log(reqBody)
        props.getDetailsList(reqBody)
    }
    if(props.active){
        fieldBox = <div className={c.field_box}>
            <div className={c.form_box_row_100}>
                <label className={c.label_form }>Операция:</label>
                <select onChange={(e)=>workOperationChange(e.target.value)}>
                    {props.state.formOptions.workOperations}
                </select>
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Описание:</label>
                <input />
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Стоимость:</label>
                <input />
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Кол-во:</label>
                <input />
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Сумма:</label>
                <input />
            </div>
        </div>
    }
    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({type:val})
    }

    return (
        <div className={c.form_wrap}>
            <div className={c.form_title_box }>Калькуляция зп за смену</div>
            <div>
                <label>Цех:</label>
                <select onChange={(e)=>selectTypeForm(e.target.value)}>
                    <option value={FORM_CONCREATE} >заливка</option>
                    <option value={FORM_POLISH}>шлифовка</option>
                    <option value={FORM_VARIED}>распил</option>
                    <option value={FORM_MONTAZ}>монтаж</option>
                    <option value={FORM_BASE} selected={true}>повременка</option>
                </select>
            </div>
            <div className={c.form_content}>
                {fieldBox}
                {accessorialFields}
                <div className={c.salary_button_wrap}>
                    <div>button</div>
                </div>
            </div>

        </div>

    )
}

export default SalaryBaseForm;