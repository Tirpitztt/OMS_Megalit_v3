import React, {useEffect, useState} from 'react'
import c from './salary.module.css'
import { FORM_BASE, FORM_CONCREATE, WORKSHOP_NAMES } from '../../../../Utils/variables-const'
import {getSalaryList, getShiftStatus, getSupportForm, getTypeOperationOnRus} from "../../../../Utils/adminSupport";
import {useForm} from "react-hook-form";
import {setOperationsSum} from "../../../../Utils/support";
import {buildFloat} from "../../../../Utils/buildNum";
import SalaryPolishForm from '../../../Common/Forms/Adminka/salary-polish-form';
import SalaryConcreateForm from '../../../Common/Forms/Adminka/salary-concreate-form';


const SalaryAccurePage = (props) => {
    console.log(props)
    const {register,handleSubmit,setValue,watch,reset} = useForm()
    const dataSum = watch('dataSum')
    const [tempCost, setTempCost] = useState(0)
    const [keyForm, setKeyForm] = useState(FORM_BASE)
    const [correctCost,setCorrectCost] = useState(0)
    const [operationName,setOperationName] = useState('')
    const [operationAmount,setOperationAmount] = useState(1)
    const [operationSumma,setOperationSumma] = useState(0)
    const [operationNotice, setOperationNotice] = useState('')
    const formsArray = [<SalaryPolishForm
        setVal={setValue}
        cost={'dataSum.1.cost'}
        tempCost={tempCost}
        setTempCost={setTempCost }
        setCorrectCost={setCorrectCost}
        amount={'dataSum.2.amount'}
        setAmount={setOperationAmount}
    />,
        <SalaryConcreateForm state={props.state.individualSalaryState}
            getDetailsListSort={props.getDetailsListSort}
            getDetailsList={props.getDetailsList}
        />]
    const supportForm = getSupportForm(formsArray,keyForm)
    useEffect(()=>{
        setOperationSumma(setOperationsSum(props.state.individualSalaryState.formOptions.workOperationsInit,dataSum,
            operationAmount,'dataSum.1.cost',setValue,setOperationName,correctCost))
    },[JSON.stringify(dataSum)])


    const workShopOP = WORKSHOP_NAMES.map((item, i) => {
        return <option key={i } value={item.value }>{item.text }</option>
    })
    const signSalaryToShift = (salarys,id,date) => {
        const body = {
            salarys,id,date
        }
        props.signSalaryShift(body)
    }
    let employeesGroup = props.accureState.shiftData.employeesShiftGroup.map((item, i) => {
        const salaryList = getSalaryList(item.shifts[0].salarys,c)
        return <div className={c.employee_info_block}>
            <div className={c.row_title_info}>
                <div onClick={()=>props.delEmployeeFromGroup({id:item.id})}
                className={c.del_employee_button}
                >удалить</div>
                <div>{item.id }</div><div>{item.name }</div>
                <div>{getShiftStatus(item.shifts[0])}</div>
                <div
                    onClick={()=>signSalaryToShift(item.shifts[0].salarys,item.id,item.date)}
                    className={c.sign_employee_button}
                >подписать</div>
            </div>
            <div>
                {salaryList}
            </div>
        </div>
    })
    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({ type: val })
        props.setWorkShopValue(val)
        setKeyForm(props.accureState.shiftData.workShop)
    }
    const selectEmployee = (val) => {
        if(val && props.accureState.shiftData.date){
            props.addEmployeeToGroup({id:val,date:props.accureState.shiftData.date})
        }else{
            alert("не выбрана дата, дятел!")
        }

    }
    const onSubmit = (body) => {
        //console.log('body1: ',body)
        if(props.accureState.shiftData.employeesShiftGroup.length){
            body.workId = dataSum[0].id
            body.workName = operationName
            body.notice = operationNotice
            body.cost = dataSum[1].cost
            body.amount = buildFloat(operationAmount/props.accureState.shiftData.employeesShiftGroup.length)
            body.summa = buildFloat(operationSumma/props.accureState.shiftData.employeesShiftGroup.length)
            body.signature = false
            //console.log('body2:',body)
            reset()
            setCorrectCost(0)
            setTempCost(0)
            setOperationAmount(1)
            props.addSalaryRowToShift(body)
        }

    }
    return (
        <div>
            <div className={c.page_title_box }>
                <div className={c.back_button} onClick={props.back}><p>&#8617;</p></div>
                <div><p>Калькуляция ЗП</p></div>
                <div className={c.select_title_wrap }>
                    <div className={c.select_title_box}>

                        <input type='date'
                               value={props.accureState.shiftData.date}
                               onChange={(e)=>props.setShiftDate(e.target.value) } />
                    </div>
                    <div className={c.select_title_box}>

                        <select onChange={(e) => selectTypeForm(e.target.value)}>
                            <option value={null}>Выбрать цех</option>
                            {workShopOP}
                        </select>
                    </div>
                    <div className={c.select_title_box}>

                        <select
                            onChange={(e) => selectEmployee(e.target.value)}>
                            <option value={null} >Выбрать сотрудника</option>
                            {props.accureState.accureData.employeesListOP}
                        </select>
                    </div>
                </div>
                
            </div>
            <div className={c.accure_form_box }>
                <div className={c.form_title_box}>
                    <div className={c.form_title_box_item}>
                        <div className={c.form_title_box_item_date}>{props.accureState.shiftData.date }</div>
                    </div>
                    <div className={c.form_title_box_item}>
                        <div>{getTypeOperationOnRus(props.accureState.shiftData.workShop).toUpperCase()}</div>
                    </div>

                </div>
                <div className={c.accure_form_content}>
                    <form onSubmit={handleSubmit(onSubmit)} className={c.accure_form_block }>
                        <div className={c.form_salary_row}>
                            <div className={c.form_salary_column_box}>
                                <label></label>
                                <select {...register('dataSum.0.id')}

                                >
                                    <option value="null">Выбрать операцию</option>
                                    {props.state.individualSalaryState.formOptions.workOperations }
                                </select>
                            </div>
                            <div className={c.form_salary_column_box}>
                                <label>стоимость</label>
                                <input {...register('dataSum.1.cost')} />
                            </div>
                            <div className={c.form_salary_column_box}>
                                <label>кол-во</label>
                                <input {...register('dataSum.2.amount',{
                                    onChange:(e)=>setOperationAmount(buildFloat(e.target.value))
                                })}/>
                            </div>
                            <div className={c.form_salary_column_box}>
                                <label>сумма</label>
                                <input {...register('summa',{
                                    onChange:(e)=>setOperationSumma(e.target.value)
                                })} value={operationSumma} />
                            </div>
                            <div className={c.form_salary_column_box}>
                                <label></label>
                                <button type='submit' className={c.add_sal_button}>добавить</button>
                            </div>
                        </div>
                        <div className={c.form_salary_row}>
                            <input {...register('notice')}
                                onChange={(e)=>setOperationNotice(e.target.value)}
                            />
                        </div>
                    </form>
                    <div className={c.accure_form_block}>
                        <div className={c.accure_form_support_box}>
                            {supportForm}
                        </div>
                    </div>

                </div>
                <div className={c.accure_form_table}>
                    {employeesGroup}

                </div>
            </div>
            

        </div>
    )
}

export default SalaryAccurePage;