import React, { useState } from 'react';
import c from './salary.module.css'

import SalaryBaseForm from '../../../Common/Forms/Adminka/salary-base-form';


const SalaryMonthPage = (props) => {
    //console.log(props)
    const ROW = { normal: c.salaryRow, active: c.salaryRowAct }
    
    const [rowActive, setRowActive] = useState(0)
    
    let employee = null
    let period = null
    let monthDays = null
    let formModel = { shiftID: null, date: 'no data' }
    let monthAccure = 0
    let monthMandates = 0
    let shiftCount = 0
    let shiftWorkData = []
    const activateRow = (i,shiftID,d) => {
        //console.log(shiftID)
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
            let shiftMandates = 0
            
            if (item.dayOfWeek === 'СБ' || item.dayOfWeek === 'ВС') {
                dayOfWeek = <div className={c.dayOutlet }>{item.dayOfWeek}</div>
            }
            props.state.salaryOfPeriod.shifts.forEach((shift, i) => {
                
                if (shift.date.slice(-2) == item.day) {
                    shiftID = shift.id
                    if (shift.full || shift.absence) {
                        shiftCount++
                    }
                    if (shift.salarys.length) {
                        let accureCount = 0
                        shift.salarys.forEach((item, i) => {
                            accureCount += item.summa
                        })
                        shiftAccure = accureCount
                    }
                    if (shift.mandates.length) {
                        let mandateCount = 0
                        shift.mandates.forEach((item, i) => {
                            mandateCount += item.summa
                        })
                        shiftMandates = mandateCount
                    }
                }
                
            })
            monthAccure += shiftAccure
            monthMandates += shiftMandates
            return <div key={i} onClick={() => activateRow(i,shiftID,item.day)}
                className={rowActive === i ? ROW.active : ROW.normal}> 
                
                <div className={c.dateRow }>
                    {dayOfWeek }
                    <div>{item.day }</div>
                </div>
                <div className={c.row_item}>{shiftID}</div>
                <div className={c.row_item}>{shiftAccure === 0 ? null:shiftAccure.toFixed(2)}</div>
                <div className={c.row_item}>{shiftMandates === 0 ? null : shiftMandates.toFixed(2)}</div>
                <div className={c.row_item}>{(shiftAccure + shiftMandates) > 0 ? (shiftAccure + shiftMandates).toFixed(2) : null}</div>
                
            </div>
        })
    }
    if (props.state.salaryFormState.salary.length) {
        shiftWorkData = props.state.salaryFormState.salary.map((item, i) => {
            
            return <div key={i} className={c.table_work_operation }>
                <div>{item.workName}</div>
                <div>{item.notice }</div>
                <div>{item.cost}</div>
                <div>{item.amount}</div>
                <div>{item.summa}</div>
                
            </div>
        })
    }
    //console.log(props.state.salaryFormState.salary)

    return (
        <div>
            
            <div className={c.page_title_box}>
                <div className={c.back_button} onClick={props.changePage}> <p>&#8617;</p> </div>
                <div>Сводная з/п сотрудника: </div>
                <div className={c.title_item_salary_row }>{employee}</div>
                <div>, за период:</div>
                <div className={c.title_item_salary_row}>{period.year} - {period.month}</div>
                <div>Начислено: </div>
                <div className={c.title_item_salary_row}>{monthAccure.toFixed(2)}руб.</div>
                <div>Смен:</div>
                <div className={c.title_item_salary_row}>{shiftCount}</div>
                <div>Среднее:</div>
                <div className={c.title_item_salary_row}>{shiftCount > 0 ? (monthAccure / shiftCount).toFixed(2) : 0}</div>
            </div>
            <div className={c.content_salary_box}>
                <div className={c.row_salary_box}>
                    <div className={c.salary_row_table_title}>
                        <div className={c.dateRow}><span>дата</span></div>
                        <div className={c.row_item}><span>id</span></div>
                        <div className={c.row_item}><span>начислено</span></div>
                        <div className={c.row_item}><span>штраф/премия</span></div>
                        <div className={c.row_item}><span>на руки</span></div>
                    </div>
                    {monthDays}
                </div>
                 
                <div className={c.form_box}>
                    <div className={c.form_title_box}>
                        <div className={c.row_item_work_table}>Детализация смены  </div>
                        <div className={c.row_item_work_table}>Число: <span>{props.state.salaryFormState.date}</span></div>
                        <div className={c.row_item_work_table}>Статус: <span>{props.state.salaryFormState.status}</span></div>
                    </div>
                    <div className={c.form_content_box}>
                        
                        <div className={c.table_box }>
                            <div className={c.form_table_title_row}>
                                <div>операция</div>
                                <div>описание</div>
                                <div>стоим</div>
                                <div>кол-во</div>
                                <div>сумма</div>
                                
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