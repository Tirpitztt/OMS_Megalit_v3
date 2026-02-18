import React from 'react';
import c from './salary.module.css'
import TimeSheetPage from './timesheet-page';


const SalaryPage = (props) => {
    console.log(props.state)
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()+1


    const getShiftsByMonth = (year, month) => {
        let body = {
            dateStart: year + '-' + month +'-' + 31,
            dateEnd: year + '-' + month + '-' + 1
        }
        //console.log(body)
        props.getShiftsByMonth(body)
    }

    return (
        <div className={c.content_box}>
            <div className={c.header}>
                <div className={c.header_title}><p>Зарплата</p></div>
                <div className={c.header_button_box}></div>
            </div>
            <div className={c.content}>
                <div onClick={() => getShiftsByMonth(currentYear,currentMonth-1)} >get</div>
                <TimeSheetPage state={props.state } />
            </div>

        </div>
    );
};

export default SalaryPage;