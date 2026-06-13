import React from 'react';
import c from './salary.module.css'

const SalaryMonthPage = (props) => {
    console.log(props.state)
    let employee = null
    let period = null
    let monthDays = null
    
    if (props.state.salaryOfPeriod) {
        employee = props.state.salaryOfPeriod.userName
        period = props.state.period
        monthDays = props.state.monthDays.map((item, i) => {
            let dayOfWeek = <div>{item.dayOfWeek}</div>
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

            return <div key={i} className={c.salaryRow}> 
                
                <div className={c.dateRow }>
                    <div>{dayOfWeek }</div>
                    <div>{item.day }</div>
                </div>
                <div className={c.row_item }>{shiftID}</div>
                <div className={c.row_item}>{shiftAccure}</div>
                
            </div>
        })
    }

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
                 
                <div className={c.form_box }>form</div>

            </div>
            <div>{JSON.stringify(props.state) }</div>
        </div>
       
    )
}

export default SalaryMonthPage;