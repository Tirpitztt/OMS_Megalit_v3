import React,{useState,useEffect} from 'react'
import c from '../form.module.css'
import {FORM_BASE, FORM_CONCREATE, FORM_MONTAZ, FORM_POLISH, FORM_VARIED} from "../../../../Utils/variables-const";
import SalaryPolishForm from "./salary-polish-form";
import SalaryConcreateForm from "./salary-concreate-form";
import SalaryMontazForm from "./salary-montaz-form";
import SalaryVariedForm from "./salary-varied-form";
import {useForm} from 'react-hook-form'
import {setOperationsSum} from "../../../../Utils/support";
//import SalaryCalculateBody from "../../../../Utils/Classes/salaryCalaculateBody";



const SalaryBaseForm = (props) => {
    //console.log(props.state)

    const {register,handleSubmit,setValue,watch,reset} = useForm()
    const dataSum = watch('dataSum')

    //const [operationID,setOperationID] = useState('1')
    const [operationName,setOperationName] = useState('')
   // const [operationCost,setOperationCost] = useState(0)
    const [operationAmount,setOperationAmount] = useState(1)
    const [operationSumma,setOperationSumma] = useState(0)
    const [operationNotice,setOperationNotice] = useState('')
    useEffect(()=>{
        setOperationSumma(setOperationsSum(props.state.formOptions.workOperationsInit,dataSum,
            operationAmount,'dataSum.1.cost',setValue,setOperationName))
    },[JSON.stringify(dataSum)])

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
        setValue('dataSum.0.id',id)

        //console.log(id)
    }
    // const workOperationNoticeChange = (value) => {
    //     setOperationNotice(value)
    // }
    // const workOperationAmountChange = (value) => {
    //     //setValue(value)
    //
    // }
    // const workOperationCostChange = (value) => {
    //     setOperationCost(value)
    // }

    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({type:val})
    }
    const onSubmit = (body) => {
        body.workId = dataSum[0].id
        body.workName = operationName
        body.notice = operationNotice
        body.cost = dataSum[1].cost
        body.amount = operationAmount
        body.summa = operationSumma
        body.signature = false
        console.log(body)
        reset()
        props.pushSalaryRow(body)
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
            <form onSubmit={handleSubmit(onSubmit)} className={c.form_content}>
                <div className={props.active?c.hide:c.block}>shift is not init</div>
                <div className={props.active?c.field_box:c.hide}>
                    <div className={c.form_box_row_100}>

                        <select {...register('dataSum.0.id')}
                                onChange={(e)=>
                                    workOperationChange(e.target.value)}>
                            <option value={0}>выбрать операцию</option>
                            {props.state.formOptions.workOperations}
                        </select>
                    </div>
                    <div className={c.form_box_row_100}>
                        <label className={c.label_form}>Описание:</label>
                        <input {...register('notice',{onChange:(e)=>setOperationNotice(e.target.value)})}
                        />
                    </div>
                    <div className={c.form_box_row_100}>
                        <label className={c.label_form}>Стоимость:</label>
                        <input {...register('dataSum.1.cost')}
                        />
                    </div>
                    <div className={c.form_box_row_100}>
                        <label className={c.label_form}>Кол-во:</label>
                        <input {...register('dataSum.2.amount',{onChange:(e)=>setOperationAmount(e.target.value)})}
                        />
                    </div>
                    <div className={c.form_box_row_100}>
                        <label className={c.label_form}>Сумма:</label>
                        <input {...register('summa',{onChange:(e)=>setOperationSumma(e.target.value)})}
                            value={operationSumma}
                        />
                    </div>
                </div>
                    {accessorialFields}
                    <div className={c.salary_button_wrap}>
                        <button type='submit' >button</button>
                    </div>
            </form>

        </div>

    )
}

export default SalaryBaseForm;