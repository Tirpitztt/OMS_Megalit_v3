import React from 'react';
import c from './salary.module.css'
import { getMonthName } from '../../../../Utils/dateTermin';
import arrowLeft from '../../../../Utils/img/arrow-left.png'
import arrowRight from '../../../../Utils/img/arrow-right.png'


const TableTimeSheet = (props) => {
    console.log(props)
    const ABSENCE = { class: c.absence_day, text: 'О' }
    const HOOKY = { class: c.hooky_day, text: 'П' }
    const OUTLET = { class: c.outlet_day, text: 'В' }
    const SICK = { class: c.sick_day, text: 'Б' }
    const FULL = { class: c.full_day, text: '8' }
    const ALLDAY = { class: c.all_day, text: '.' }
    
    let monthTitle = null
    let fullRow = null
    let titleDaysBlock = null

    const clickDay = (val) => {
        console.log(val)
    }

    if (props.state.dataMonth.monthDays.length) {
        monthTitle = getMonthName((props.state.dataMonth.month)-1)
        titleDaysBlock = props.state.dataMonth.monthDays.map((item, i) => {
            let dayOfWeek = <div>{item.dayOfWeek}</div>
            if (item.dayOfWeek === 'СБ' || item.dayOfWeek === 'ВС') {
                dayOfWeek = <div className={c.dayOutlet }>{item.dayOfWeek}</div>
            }
            return <div className={c.table_title_day_box} key={i}>
                <div>{item.day}</div>
                <div>{dayOfWeek}</div>
            </div>
        })
        fullRow = props.state.dataMonth.users.map((item, i) => {
            let daysMonth = new Array(props.state.dataMonth.monthDays.length)
                .fill(<div className={c.dayShift} onClick={() => clickDay(item)}><div className={ALLDAY.class}>{ALLDAY.text}</div></div>)
            item.shifts.forEach((shift,i) => {
                daysMonth.forEach((day,y) => {
                    if (y + 1 == shift.date.slice(-2)) {
                        if (shift.absence) {
                            daysMonth.splice(y, 1, <div className={c.dayShift }><div className={ABSENCE.class}>{ABSENCE.text}</div></div>)
                        }
                        if (shift.hooky) {
                            daysMonth.splice(y, 1, <div className={c.dayShift}><div className={HOOKY.class}>{HOOKY.text}</div></div>)
                        }
                        if (shift.outlet) {
                            daysMonth.splice(y, 1, <div className={c.dayShift}><div className={OUTLET.class}>{OUTLET.text}</div></div>)
                        }
                        if (shift.sick) {
                            daysMonth.splice(y, 1, <div className={c.dayShift}><div className={SICK.class}>{SICK.text}</div></div>)
                        }
                        if (shift.full) {
                            daysMonth.splice(y, 1, <div className={c.dayShift}><div className={FULL.class}>{FULL.text}</div></div>)
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
                          <div><p>Сотрудники</p></div>
                          <div></div>
                    </div>
                    <div className={c.table_title_days_row}>grafs</div>
                </div>
                <div className={c.table_timesheet}>
                    <div className={c.table_title_month_row}>
                        <div onClick={() => props.prewMonthData()} className={c.arrows } ><img src={arrowLeft} alt='flaticon.com' /></div>
                        <div>{monthTitle}</div>
                        <div onClick={() => props.nextMonthData()} className={c.arrows}><img src={arrowRight} alt='flaticon.com' /></div>
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