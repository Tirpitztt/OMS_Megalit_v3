import React, { useState } from 'react'
import c from './salary.module.css'
import { WORKSHOP_NAMES } from '../../../../Utils/variables-const'


const SalaryAccurePage = (props) => {
    console.log(props)
    const workShopOP = WORKSHOP_NAMES.map((item, i) => {
        return <option key={i } value={item.value }>{item.text }</option>
    })
    let employeesGroup = props.accureState.shiftData.employeesShiftGroup.map((item, i) => {
        return <div>{item.name }</div>
    })
    const selectTypeForm = (val) => {
        props.getWorkOperationsGroup({ type: val })
        props.setWorkShopValue(val)
    }
    const selectEmployee = (val) => {
        props.addEmployeeToGroup({id:val})
    }
    return (
        <div>
            <div className={c.page_title_box }>
                <div onClick={props.back}>back</div>
                <div><p>Калькуляция ЗП</p></div>
                <div className={c.select_title_wrap }>
                    <div className={c.select_title_box}>
                        <label>дата:</label>
                        <input type='date' onChange={(e)=>props.setShiftDate(e.target.value) } />
                    </div>
                    <div className={c.select_title_box}>
                        <label>цех:</label>
                        <select onChange={(e) => selectTypeForm(e.target.value)}>{workShopOP}</select>
                    </div>
                    <div className={c.select_title_box}>
                        <label>сотрудники:</label>
                        <select
                            onChange={(e) => selectEmployee(e.target.value)}
                        >{props.accureState.accureData.employeesListOP}</select>
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