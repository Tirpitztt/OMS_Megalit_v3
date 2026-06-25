import React, { useState } from 'react';
import c from './salary.module.css'
import SalaryConcreateForm from '../../../Common/Forms/Adminka/salary-concreate-form';
import SalaryMontazForm from '../../../Common/Forms/Adminka/salary-montaz-form';
import SalaryPolishForm from '../../../Common/Forms/Adminka/salary-polish-form';
import SalaryVariedForm from '../../../Common/Forms/Adminka/salary-varied-form';
import SalaryBaseForm from '../../../Common/Forms/Adminka/salary-base-form';
import { FORM_BASE, FORM_CONCREATE, FORM_MONTAZ, FORM_POLISH, FORM_VARIED } from '../../../../Utils/variables-const';

const SalaryMonthPage = (props) => {
    console.log(props)
    const ROW = { normal: c.salaryRow, active: c.salaryRowAct }
    
    const [rowActive, setRowActive] = useState(0)
    
    let employee = null
    let period = null
    let monthDays = null
    let formModel = { shiftID: null, date: 'no data' }
    let shiftWorkData = []
    const activateRow = (i,shiftID,d) => {
        setRowActive(i)
        formModel.shiftID = shiftID
        formModel.date = d 
        props.setSalaryFormState(formModel)
    }
    if (props.state.salaryOfPeriod) {
        employee = props.state.salaryOfPeriod.userName
        period = props.state.period
        monthDays = props.state.monthDays.map((item, i) => {
            let dayOfWeek = <div className={c.day_week }>{item.dayOfWeek}</div>
            let shiftID = null
            let shiftAccure = 0
            if (item.dayOfWeek === 'СБ' || item.dayOfWeek === 'ВС') {
                dayOfWeek = <div className={c.dayOutlet }>{item.dayOfWeek}</div>
            }
            props.state.salaryOfPeriod.shifts.forEach((shift, i) => {
                
                if (shift.date.slice(-2) == item.day) {
                    shiftID = shift.id
                    if (shift.salarys.length) {
                        let accureCount = 0
                        shift.salarys.forEach((item, i) => {
                            accureCount += item.summa
                        })
                        shiftAccure = accureCount
                    }
                }
                
            })

            return <div key={i} onClick={() => activateRow(i,shiftID,item.day)}
                className={rowActive === i ? ROW.active : ROW.normal}> 
                
                <div className={c.dateRow }>
                    {dayOfWeek }
                    <div>{item.day }</div>
                </div>
                <div className={c.row_item }>{shiftID}</div>
                <div className={c.row_item}>{shiftAccure}</div>
                
            </div>
        })
    }
    if (props.state.salaryFormState.salary.length) {
        shiftWorkData = props.state.salaryFormState.salary.map((item, i) => {
            return <div key={i} className={c.table_work_operation }>
                <div>{item.workName}</div>
                <div>{item.cost}</div>
                <div>{item.amount}</div>
                <div>{item.summa}</div>
            </div>
        })
    }
    
    // const getSalaryFormType = (type) => {
    //     switch (type) {
    //         case FORM_CONCREATE: {
    //             return <SalaryConcreateForm />
    //         }
    //         case FORM_MONTAZ: {
    //             return <SalaryMontazForm />
    //         }
    //         case FORM_POLISH: {
    //             return <SalaryPolishForm />
    //         }
    //         case FORM_VARIED: {
    //             return <SalaryVariedForm />
    //         }
    //         default: return null
    //     }
    // }
    //const formType = getSalaryFormType(props.state.formOptions.workShop)

    // const selectOnChange = (val) => {
    //     props.getWorkOperationsGroup({type:val})
    //     props.setSalaryFormOptionChange(val)
    //
    // }

    return (
        <div>
            <div onClick={() => props.changePage(0)}>back</div>
            <div>
                <div>Сводная заработной платы сотрудника: {employee}, за период: {period.year} - {period.month}  </div>

            </div>
            <div className={c.content_salary_box}>
                <div className={c.row_salary_box}>
                    {monthDays}
                </div>
                 
                <div className={c.form_box}>
                    <div className={c.form_title_box}>
                        {/*<div className={c.select_box }>*/}
                        {/*    <label>Цех:</label>*/}
                        {/*    <select onChange={(e) => selectOnChange(e.target.value)}>*/}
                        {/*        <option value={FORM_CONCREATE} >заливка</option>*/}
                        {/*        <option value={FORM_POLISH}>шлифовка</option>*/}
                        {/*        <option value={FORM_VARIED}>распил</option>*/}
                        {/*        <option value={FORM_MONTAZ}>монтаж</option>*/}
                        {/*        <option value={FORM_BASE} selected={true}>повременка</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        <div>Число: {props.state.salaryFormState.date}</div>
                        <div>Статус: {props.state.salaryFormState.status }</div>
                    </div>
                    <div className={c.form_content_box}>
                        <div className={c.table_box}>
                            <SalaryBaseForm state={props.state}
                                            active={props.state.formOptions.baseActive}
                                            setWorkOperationName={props.setWorkOperationName }
                                            getWorkOperationsGroup={props.getWorkOperationsGroup}
                            />
                        </div>
                        <div className={c.table_box }>
                            <div className={c.form_table_title_row}>
                                <div>operation</div>
                                <div>cost</div>
                                <div>amount</div>
                                <div>summa</div>
                            </div>
                            {shiftWorkData}
                        </div>

                        
                    </div>
                    
                    
                </div>

            </div>
            <div>{JSON.stringify(props.state) }</div>
        </div>
       
    )
}

export default SalaryMonthPage;