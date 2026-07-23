import React, {useEffect, useState} from 'react';
import c from './salary.module.css'
import TimeSheetPage from './timesheet-page';
import {useMaterials, useMatState} from "../../../../Hooks/material.hook";
import SalaryMonthPage from './salary-month-page';
import {FORM_BASE, WORKERS} from "../../../../Utils/variables-const";
import SalaryAccurePage from './salary-accure-page';


const SalaryPage = (props) => {
    //console.log(props)
    const [rate,setRate] = useState(0)
    const [materials] = useMaterials()
    const [displayNum,setDisplayNum] = useState(0)
    const setDisplayBack = () => {
        props.setSalaryFormOptionChange({type:FORM_BASE})
        props.getWorkOperationsGroup({type:FORM_BASE})
        props.clearFormOptions()
        props.clearAccureState()
        setDisplayNum(0)
    }
    useEffect(()=>{
        if(Object.entries(materials).length){
            setRate(materials.rate[0].USD)
        }
    },)


    //const today = new Date()
    // const currentYear = today.getFullYear()
    // const currentMonth = today.getMonth() + 1
    const setAccurePage = () => {
        setDisplayNum(2)
        props.getEmployeesList({ department: WORKERS })
    }
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
    const displays = [
        <TimeSheetPage state={props.state}
            rate={rate}
            nextMonthData={getNextData}
            prewMonthData={getPrewData}
            destroyMandate={props.destroyMandate}
            saveShiftByUser={props.saveShiftByUser}
            getIndividualSalaryState={props.getIndividualSalaryState}
            changePage={setDisplayNum}
        />,
        <SalaryMonthPage state={props.state.individualSalaryState}
                         workOperations={props.state.workOperations}
            changePage={setDisplayBack}
            setSalaryFormState={props.setSalaryFormState}
            getDetailsList={props.getDetailsList}
            setWorkOperationName={props.setWorkOperationName}
            getWorkOperationsGroup={props.getWorkOperationsGroup}
            getDetailsListSort={props.getDetailsListSort}
            pushSalaryRow={props.pushSalaryRow}
            //signSalaryShift={props.signSalaryShift}
            rate={rate}
        />,
        <SalaryAccurePage
            state={props.state}
            accureState={props.accureState}
            supportFormState={props.supportFormState }
            setShiftDate={props.setShiftDate}
            setWorkShopValue={props.setWorkShopValue}
            getWorkOperationsGroup={props.getWorkOperationsGroup}
            addEmployeeToGroup={props.addEmployeeToGroup}
            getDetailsList={props.getDetailsList}
            setTempCost={props.setTempCost}
            operationChange={props.operationChange }
            delEmployeeFromGroup={props.delEmployeeFromGroup}
            getDetailsListSort={props.getDetailsListSort}
            addSalaryRowToShift={props.addSalaryRowToShift}
            signSalaryShift={props.signSalaryShift}
            setPolishModelValue={props.setPolishModelValue}
            sizeDetailChange={props.sizeDetailChange}
            setProcessingChange={props.setProcessingChange}
            addDetailToKit={props.addDetailToKit}
            delDetailFromKit={props.delDetailFromKit }
            clearSupportForm={props.clearSupportForm}
            back={setDisplayBack}


        />
    ]

    

    return (
        <div className={c.content_box}>
            <div className={c.header}>
                <div className={c.header_title}><p>Зарплата</p></div>
                <div className={c.header_button_box}>
                    <div className={c.salary_accure_button}
                        onClick={setAccurePage}
                    >Подсчет ЗП</div>
                </div>
            </div>
            <div className={c.content}>
                {displays[displayNum] }
            </div>

        </div>
    );
};

export default SalaryPage;