import React, { useState } from 'react';
import c from './salary.module.css'
import { getMonthName } from '../../../../Utils/dateTermin';
import arrowLeft from '../../../../Utils/img/arrow-left.png'
import arrowRight from '../../../../Utils/img/arrow-right.png'
import WorkShift from "../../../../Utils/Classes/workShift";
import WorkShiftModal from '../../../Common/work-shift-modal';



const TableTimeSheet = (props) => {
    //console.log(props)
    const ABSENCE = { class: c.absence_day, text: 'О' }
    const HOOKY = { class: c.hooky_day, text: 'П' }
    const OUTLET = { class: c.outlet_day, text: 'В' }
    const SICK = { class: c.sick_day, text: 'Б' }
    const FULL = { class: c.full_day, text: '8' }
    const ALLDAY = { class: c.all_day, text: '.' }
   
    const [activeDrop, setActiveDrop] = useState(false)
    
    const [dataForm,setDataForm] = useState(null) //данные формы для каждой смены

    
    let monthTitle = null
    let fullRow = null
    let titleDaysBlock = null

    const clickDay = (val, day, shiftId = null) => {
        //открываем форму
        setActiveDrop(true)
        //создаем шаблон тела смены и заполняем его исходными данными
        const body = new WorkShift(val.userId,props.state.dataMonth.year,props.state.dataMonth.month,day)
        if(shiftId){
            body.setShiftId(shiftId)
            val.shifts.forEach(shift => {
                if (shift.id === shiftId) {
                    body.setStartTime(shift.start)
                    body.setEndTime(shift.end)
                    body.setHooky(shift.hooky)
                    body.setAbsence(shift.absence)
                    body.setOutlet(shift.outlet)
                    body.setSick(shift.sick)
                    body.setFull(shift.full)
                    if (shift.mandates && shift.mandates.length) {
                        body.setMandate(shift.mandates)
                    }
                }
            })
        }
        body.setDateShift()
        body.setUserName(val.userName)
        body.setRate(props.rate)
        body.setEmployer(1)
        //console.log(val)
        setDataForm(body) //создаем данные для формы на основе шаблона
    }
    const goToIndividualSalaryPage = (obj) => {
        props.getIndividualSalaryState(obj)
        console.log(obj)
        props.changePage(1)
    }
    

    if (props.state.dataMonth.monthDays.length) {
        monthTitle = getMonthName((props.state.dataMonth.month)-1)
        titleDaysBlock = props.state.dataMonth.monthDays.map((item, i) => { //создаем шапку таблицы
            let dayOfWeek = <div>{item.dayOfWeek}</div>
            if (item.dayOfWeek === 'СБ' || item.dayOfWeek === 'ВС') {
                dayOfWeek = <div className={c.dayOutlet }>{item.dayOfWeek}</div>
            }
            return <div className={c.table_title_day_box} key={i}>
                <div>{item.day}</div>
                <div>{dayOfWeek}</div>
            </div>
        })
        fullRow = props.state.dataMonth.users.map((item, i) => { //создаем таблицу
            let daysArray = new Array(props.state.dataMonth.monthDays.length).fill('.')
            const daysMonth = daysArray.map((day, i) => {  //создается строка дней
                return <div className={c.dayShift} onClick={() => clickDay(item, i + 1)} key={i}>
                    <div className={ALLDAY.class}>{ALLDAY.text}</div>
                </div>
            })
            
            //каждый день в строке сортируется по типу и окрашивается соответственно
            item.shifts.forEach((shift,i) => {
                daysMonth.forEach((day,y) => {
                    if (y + 1 == shift.date.slice(-2)) {
                        if (shift.absence) {
                            daysMonth.splice(y, 1,
                                <div className={c.dayShift } onClick={() => clickDay(item,y+1,shift.id)}>
                                    <div className={ABSENCE.class}>{shift.end - shift.start}</div>
                                </div>)
                        }
                        if (shift.hooky) {
                            daysMonth.splice(y, 1,
                                <div className={c.dayShift} onClick={() => clickDay(item,y+1,shift.id)}>
                                    <div className={HOOKY.class}>{HOOKY.text}</div>
                                </div>)
                        }
                        if (shift.outlet) {
                            daysMonth.splice(y, 1,
                                <div className={c.dayShift} onClick={() => clickDay(item,y+1,shift.id)}>
                                    <div className={OUTLET.class}>{OUTLET.text}</div>
                                </div>)
                        }
                        if (shift.sick) {
                            daysMonth.splice(y, 1,
                                <div className={c.dayShift} onClick={() => clickDay(item,y+1,shift.id)}>
                                    <div className={SICK.class}>{SICK.text}</div>
                                </div>)
                        }
                        if (shift.full) {
                            daysMonth.splice(y, 1,
                                <div className={c.dayShift} onClick={() => clickDay(item,y+1,shift.id)}>
                                    <div className={FULL.class}>{FULL.text}</div>
                                </div>)
                        }
                        
                    }
                })
            })
            //возвращается готовая строка с днями
            return <div key={i} className={c.full_row} >
                <div className={c.table_user_box} onClick={() => goToIndividualSalaryPage(item)}>{item.userName}</div>
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
                        <div onClick={() => props.prewMonthData()} className={c.arrows }><img src={arrowLeft} alt='flaticon.com' /></div>
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
            <WorkShiftModal active={activeDrop}
                close={setActiveDrop}
                destroyMandate={props.destroyMandate}
                saveShiftByUser={props.saveShiftByUser}
                data={dataForm}
            />
            
            

           
        </div>
    )
}

export default TableTimeSheet;