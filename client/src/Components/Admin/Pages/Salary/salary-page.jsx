import React, {useEffect, useState} from 'react';
import c from './salary.module.css'
import TimeSheetPage from './timesheet-page';
import {useMaterials, useMatState} from "../../../../Hooks/material.hook";


const SalaryPage = (props) => {
    //console.log(props.state.dataMonth.month)
    const [rate,setRate] = useState(0)
    const [materials] = useMaterials()
    useEffect(()=>{
        if(Object.entries(materials).length){
            setRate(materials.rate[0].USD)
        }
    })
    //const today = new Date()
    // const currentYear = today.getFullYear()
    // const currentMonth = today.getMonth() + 1
    
    const getNextData = () => {
        const bodyReq = { year: props.state.dataMonth.year, month: props.state.dataMonth.month + 1 }
        if (bodyReq.month > 0 && bodyReq.month <= 12) {
            props.getShiftsByMonth(bodyReq)
        } else if (bodyReq.month === 13) {
            bodyReq.month = 1
            bodyReq.year = bodyReq.year + 1
            props.getShiftsByMonth(bodyReq)
        }
}
    const getPrewData = () => {
        const bodyReq = { year: props.state.dataMonth.year, month: props.state.dataMonth.month - 1 }
        if (bodyReq.month > 0 && bodyReq.month <= 12) {
            props.getShiftsByMonth(bodyReq)
        } else if (bodyReq.month === 0) {
            bodyReq.month = 12 
            bodyReq.year = bodyReq.year - 1
            props.getShiftsByMonth(bodyReq)
        }
        
    }

    return (
        <div className={c.content_box}>
            <div className={c.header}>
                <div className={c.header_title}><p>Зарплата</p></div>
                <div className={c.header_button_box}></div>
            </div>
            <div className={c.content}>
                <TimeSheetPage state={props.state}
                    rate={rate}
                    nextMonthData={getNextData}
                    prewMonthData={getPrewData}
                    destroyMandate={props.destroyMandate}
                    saveShiftByUser={props.saveShiftByUser }
                />
            </div>

        </div>
    );
};

export default SalaryPage;