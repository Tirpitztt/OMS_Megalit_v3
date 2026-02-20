import React from 'react';
import c from './salary.module.css'
import { getMonthName } from '../../../../Utils/dateTermin';


const TableTimeSheet = (props) => {
    console.log(props)
    const ABSENCE = { class: c.absence_day, text: 'О' }
    const HOOKY = { class: c.hooky_day, text: 'П' }
    const OUTLET = { class: c.outlet_day, text: 'В' }
    const SICK = { class: c.sick_day, text: 'Б' }
    const FULL = { class: c.full_day, text: '8' }
    
    let monthTitle = null
    let fullRow = null
    let titleDaysBlock = null

    if (props.state.dataMonth.monthDays.length) {
        monthTitle = getMonthName((props.state.dataMonth.month)-1)
        titleDaysBlock = props.state.dataMonth.monthDays.map((item, i) => {
            return <div className={c.table_title_day_box} key={i}>
                <div>{item.day}</div>
                <div>{item.dayOfWeek}</div>
            </div>
        })
        fullRow = props.state.dataMonth.users.map((item, i) => {
            let daysMonth = new Array(props.state.dataMonth.monthDays.length).fill(<div className={c.dayShift}>.</div>)
            item.shifts.forEach((shift,i) => {
                daysMonth.forEach((day,y) => {
                    if (y + 1 == shift.date.slice(-2)) {
                        if (shift.absence) {
                            daysMonth.splice(y, 1, <div className={ABSENCE.class}>{ABSENCE.text}</div>)
                        }
                        if (shift.hooky) {
                            daysMonth.splice(y, 1, <div className={HOOKY.class}>{HOOKY.text}</div>)
                        }
                        if (shift.outlet) {
                            daysMonth.splice(y, 1, <div className={OUTLET.class}>{OUTLET.text}</div>)
                        }
                        if (shift.sick) {
                            daysMonth.splice(y, 1, <div className={SICK.class}>{SICK.text}</div>)
                        }
                        if (shift.full) {
                            daysMonth.splice(y, 1, <div className={FULL.class}>{FULL.text}</div>)
                        }
                        
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
                        <div onClick={() => props.prewMonthData()} >&lArr;</div>
                                <div>{monthTitle }</div>
                        <div onClick={() => props.nextMonthData()}>&rArr;</div>
                            </div>
                    <div className={c.table_title_days_row}>
                        {titleDaysBlock}
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