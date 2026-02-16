import React from 'react';
import c from './salary.module.css'
import TimeSheetPage from './timesheet-page';


const SalaryPage = (props) => {
    console.log(props.state)

    const getShiftsByMonth = () => {
        const today = new Date()
        
        const currentYear = today.getFullYear()
        let body = {
            dateStart: currentYear + '-' + 1 +'-' + 31,
            dateEnd: currentYear + '-' + 1 + '-' + 1
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
                <div onClick={getShiftsByMonth} >get</div>
                <TimeSheetPage state={props.state } />
            </div>

        </div>
    );
};

export default SalaryPage;