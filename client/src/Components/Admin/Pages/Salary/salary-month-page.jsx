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
                        shiftAccure = 0
                        shift.salarys.forEach((item, i) => {
                            shiftAccure += item.summa
                        })
                    }
                }
                
            })

            return <div key={i} className={c.salaryRow}> 
                
                <div className={c.dateRow }>
                    <div>{dayOfWeek }</div>
                    <div>{item.day }</div>
                </div>
                <div>{shiftID}</div>
                <div>{shiftAccure}</div>
            </div>
        })
    }

    return (
        <div>
            <div onClick={() => props.changePage(0)}>back</div>
            <div>
                <div>Сводная заработной платы сотрудника: {employee}, за период: {period.year} - {period.month}  </div>

            </div>
            <div>
                {monthDays} 

            </div>
            <div>{JSON.stringify(props.state) }</div>
        </div>
       
    )
}

export default SalaryMonthPage;