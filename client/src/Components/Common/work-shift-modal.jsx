import React from 'react'
import c from './modal.module.css'
import DropDownWorkShiftForm from './Forms/dropdown-workshift-form';
import WorkShift  from '../../Utils/Classes/workShift'


const WorkShiftModal = (props) => {
    let shift = null
    let userName = null
    //let dataForm = new WorkShift(0,2000,1,1)
    if (props.data) {
        shift = props.data.data.date
        userName = props.data.userName
    }
    const closeModal = () => {
        props.close(false)
    }
    const click = (e) => {
        e.stopPropagation()
        //console.log('fuck')
    }
    return (
        <div onClick={()=>closeModal() } className={props.active ? c.active : c.modalwr}>
            <div onClick={(e)=>click(e) } className={c.work_shift_content}>
                <div className={c.modal_title}>
                    <p>Рабочая смена - {shift}</p>
                    <p>{userName}</p>
                </div>
                <DropDownWorkShiftForm data={props.data}
                    saveShiftByUser={props.saveShiftByUser}
                                       close={props.close}
                />
            </div>
            
        </div>
    )
}

export default WorkShiftModal;