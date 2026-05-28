import React, { useState } from 'react'
import c from './modal.module.css'

const SalarysMonthModal = (props) => {

    return (
        <div className={props.active ? c.active : c.modalwr}>
            <div className={c.salary_shifts_content} >
                <div className={c.salary_shifts_content_title_box}>
                    <div className={c.salary_content_title_item}></div>
                    <div className={c.salary_content_title_item}></div>
                    <div className={c.salary_content_title_item}>X</div>
                </div>
                <div className={c.salary_shifts_content_form_box}>

                </div>

            </div>
        </div>
    )
}

export default SalarysMonthModal;