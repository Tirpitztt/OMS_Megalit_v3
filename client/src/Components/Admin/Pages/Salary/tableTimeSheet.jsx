import React from 'react';
import c from './salary.module.css'
import { getMonthDays, getMonthName } from '../../../../Utils/dateTermin';

const TableTimeSheet = (props) => {
    console.log(props)
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1
    const monthTitle = getMonthName((props.state.monthTitleDays.month) - 1)
    let daysInMonth = getMonthDays(2026, 1)
    let fullRow = null
    const daysBlockDiv = daysInMonth.map((item, i) => {
        return <div className={c.table_title_day_box} key={i}>
            <div>{item.day}</div>
            <div>{item.dayOfWeek}</div>
        </div>
    })
    if (props.state.shiftsByMonth.length) {
        fullRow = props.state.shiftsByMonth.map((item, i) => {
            let daysMonth = new Array(daysInMonth.length).fill(<div className={c.dayShift}>.</div>)
            item.shifts.forEach((shift,i) => {
                daysMonth.forEach((day,y) => {
                    if (y + 1 == shift.date.slice(-2)) {
                        daysMonth.splice(y, 1, <div className={c.dayShift}>!</div>)
                    }
                })
            })
            
            return <div key={i} className={c.full_row} >
                <div className={c.table_user_box }>{item.userName}</div>
                {daysMonth}
            </div>
        })
    }
    

    
    return (
        <div className={c.table_container}>
            <div className={c.table_title_row}>
                <div className={c.table_users}>
                    <div className={c.table_title_month_row}>
                          <div></div>
                          <div>employee</div>
                          <div></div>
                    </div>
                    <div className={c.table_title_days_row}>grafs</div>
                </div>
                <div className={c.table_timesheet}>
                            <div className={c.table_title_month_row}>
                                <div>left</div>
                                <div>{monthTitle }</div>
                                <div>right</div>
                            </div>
                    <div className={c.table_title_days_row}>
                        {daysBlockDiv}
                            </div>
                </div>
            </div>
            <div className={c.table_content }>
                {fullRow }
            </div>
            
            
        </div>
    )
}

export default TableTimeSheet;