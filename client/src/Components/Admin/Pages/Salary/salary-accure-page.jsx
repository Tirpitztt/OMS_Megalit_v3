import React, { useState } from 'react'
import c from './salary.module.css'


const SalaryAccurePage = (props) => {
    console.log(props)

    return (
        <div>
            <div className={c.page_title_box }>
                <div onClick={props.back}>back</div>
                <div><p>Калькуляция ЗП</p></div>
                <div className={c.select_title_wrap }>
                    <div className={c.select_title_box}>
                        <label>дата:</label>
                        <input type='date' />
                    </div>
                    <div className={c.select_title_box}>
                        <label>цех:</label>
                        <select></select>
                    </div>
                    <div className={c.select_title_box}>
                        <label>сотрудники:</label>
                        <select>{props.accureState.accureData.employeesListOP }</select>
                    </div>
                </div>
                
            </div>
            <div className={c.accure_form_box }>
                <div className={c.form_title_box}>
                    <div className={c.select_title_box}>
                        <div>{props.accureState.shiftData.date }</div>
                    </div>
                    <div className={c.select_title_box}></div>
                    <div className={c.select_title_box}></div>
                </div>
            </div>
            

        </div>
    )
}

export default SalaryAccurePage;