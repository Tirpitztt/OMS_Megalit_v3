import React,{useState} from 'react'
import c from '../form.module.css'
import {FORM_BASE, FORM_CONCREATE, FORM_MONTAZ, FORM_POLISH, FORM_VARIED} from "../../../../Utils/variables-const";
import SalaryPolishForm from "./salary-polish-form";
import SalaryConcreateForm from "./salary-concreate-form";
import SalaryMontazForm from "./salary-montaz-form";
import SalaryVariedForm from "./salary-varied-form";
import {setSalaryRowBody} from "../../../../Utils/support";
import SalaryCalculateBody from "../../../../Utils/Classes/salaryCalaculateBody";



const SalaryBaseForm = (props) => {
    //console.log(props.state)
    let fieldBox = <div>shift is not init</div>
    const [operationID,setOperationID] = useState('1')
    const [operationName,setOperationName] = useState('')
    const [operationCost,setOperationCost] = useState(0)
    const [operationAmount,setOperationAmount] = useState(0)
    const [operationSumma,setOperationSumma] = useState(0)
    const [operationNotice,setOperationNotice] = useState('')
    const [body,setBody] = useState({})
    let salaryBody = {

    }
    let accessorialFields = null
    if(props.state.formOptions.workShop === FORM_POLISH){
        accessorialFields = <SalaryPolishForm />
    }else if(props.state.formOptions.workShop === FORM_CONCREATE){
        accessorialFields = <SalaryConcreateForm state={props.state}
            getDetailsList={props.getDetailsList}
            getDetailsListSort={props.getDetailsListSort}
        />
    }else if(props.state.formOptions.workShop === FORM_MONTAZ){
        accessorialFields = <SalaryMontazForm />
    }else if(props.state.formOptions.workShop === FORM_VARIED){
        accessorialFields = <SalaryVariedForm />
    }

    const workOperationChange = (id) => {
        setOperationID(id)
        let body = setSalaryRowBody(props.state.formOptions.workOperationsInit,id,setOperationCost)
        setBody(body)
        console.log(body)
    }
    const workOperationNoticeChange = (value) => {
        setOperationNotice(value)
    }
    const workOperationAmountChange = (value) => {
        setOperationAmount(value)
        setOperationSumma(operationCost * operationAmount)
    }
    const workOperationCostChange = (value) => {
        setOperationCost(value)
    }
    if(props.active){
        fieldBox = <div className={c.field_box}>
            <div className={c.form_box_row_100}>
                {/*<label className={c.label_form }>Операция:</label>*/}
                <select onChange={(e)=>
                    workOperationChange(e.target.value)}>
                    <option value="0">выбрать операцию</option>
                    {props.state.formOptions.workOperations}
                </select>
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Описание:</label>
                <input value={operationNotice} onChange={(e)=>workOperationNoticeChange(e.target.value)} />
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Стоимость:</label>
                <input value={operationCost} />
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Кол-во:</label>
                <input value={operationAmount} onChange={(e)=>workOperationAmountChange(e.target.value)}/>
            </div>
            <div className={c.form_box_row_100}>
                <label className={c.label_form}>Сумма:</label>
                <input value={operationSumma} />
            </div>
        </div>
    }
    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({type:val})
    }
    const saveWorkOperationOnShift = () => {
        body.setOperationAmount(operationAmount)
        body.setOperationSumma()
       console.log(body)
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
                    <div onClick={saveWorkOperationOnShift}>button</div>
                </div>
            </div>

        </div>

    )
}

export default SalaryBaseForm;