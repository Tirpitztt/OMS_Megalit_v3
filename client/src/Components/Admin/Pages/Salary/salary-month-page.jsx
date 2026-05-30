import React from 'react';
import c from './salary.module.css'

const SalaryMonthPage = (props) => {
    let employee = null
    let period = null
    let monthDays = null
    if (props.state.salaryOfPeriod) {
        employee = props.state.salaryOfPeriod.userName
        period = props.state.period
        monthDays = props.state.monthDays.map((item, i) => {
            let dayOfWeek = <div>{item.dayOfWeek}</div>
            if (item.dayOfWeek === 'СБ' || item.dayOfWeek === 'ВС') {
                dayOfWeek = <div className={c.dayOutlet }>{item.dayOfWeek}</div>
            }
            return <div key={i} className={c.salaryRow}> 
                
                <div className={c.dateRow }>
                    <div>{dayOfWeek }</div>
                    <div>{item.day }</div>
                </div>
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