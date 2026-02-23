import React from 'react'
import c from './modal.module.css'
import DropDownWorkShiftForm from './Forms/dropdown-workshift-form';


const WorkShiftModal = (props) => {
    let shift = null
    let userName = null
    if (props.data) {
        shift = props.data.data.date
        userName = props.data.userName
    }
    return (
        <div className={props.active ? c.active : c.modalwr}>
            <div className={c.work_shift_content}>
                <div className={c.modal_title}>
                    <p>Рабочая смена - {shift}</p>
                    <p>{userName}</p>
                </div>
                <DropDownWorkShiftForm data={props.data} />
            </div>
            
        </div>
    )
}

export default WorkShiftModal;