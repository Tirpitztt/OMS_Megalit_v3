import React, { useState } from 'react'
import c from './salary.module.css'
import { WORKSHOP_NAMES } from '../../../../Utils/variables-const'
import {getShiftStatus} from "../../../../Utils/adminSupport";


const SalaryAccurePage = (props) => {
    console.log(props)
    const workShopOP = WORKSHOP_NAMES.map((item, i) => {
        return <option key={i } value={item.value }>{item.text }</option>
    })
    let employeesGroup = props.accureState.shiftData.employeesShiftGroup.map((item, i) => {
        return <div className={c.employee_info_block}>
            <div className={c.row_title_info}>
                <div onClick={()=>props.delEmployeeFromGroup({id:item.id})}>del</div>
                <div>{item.id }</div><div>{item.name }</div>
                <div>{getShiftStatus(item.shifts[0])}</div>
                <div>sign</div>
            </div>
        </div>
    })
    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({ type: val })
        props.setWorkShopValue(val)
    }
    const selectEmployee = (val) => {
        if(val && props.accureState.shiftData.date){
            props.addEmployeeToGroup({id:val,date:props.accureState.shiftData.date})
        }else{
            alert("не выбрана дата, дятел!")
        }

    }
    return (
        <div>
            <div className={c.page_title_box }>
                <div onClick={props.back}>back</div>
                <div><p>Калькуляция ЗП</p></div>
                <div className={c.select_title_wrap }>
                    <div className={c.select_title_box}>
                        <label>дата:</label>
                        <input type='date'
                               value={props.accureState.shiftData.date}
                               onChange={(e)=>props.setShiftDate(e.target.value) } />
                    </div>
                    <div className={c.select_title_box}>
                        <label>цех:</label>
                        <select onChange={(e) => selectTypeForm(e.target.value)}>{workShopOP}</select>
                    </div>
                    <div className={c.select_title_box}>
                        <label>сотрудники:</label>
                        <select
                            onChange={(e) => selectEmployee(e.target.value)}>
                            <option value={null}>Выбрать сотрудника</option>
                            {props.accureState.accureData.employeesListOP}
                        </select>
                    </div>
                </div>
                
            </div>
            <div className={c.accure_form_box }>
                <div className={c.form_title_box}>
                    <div className={c.select_title_box}>
                        <div>{props.accureState.shiftData.date }</div>
                    </div>
                    <div className={c.select_title_box}>
                        <div>{props.accureState.shiftData.workShop}</div>
                    </div>
                    <div className={c.select_title_box}>
                        <select>
                            {props.state.individualSalaryState.formOptions.workOperations }
                        </select>
                    </div>
                </div>
                <div className={c.accure_form_content}>
                    <div className={c.accure_form_block }>main block</div>
                    <div className={c.accure_form_block}>support block</div>

                </div>
                <div className={c.accure_form_table}>
                    {employeesGroup}

                </div>
            </div>
            

        </div>
    )
}

export default SalaryAccurePage;