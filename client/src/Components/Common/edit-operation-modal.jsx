import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import React from "react";
import EditOperationForm from "./Forms/Adminka/edit-operation-form";

const EditOperationModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}><p>Исправить операцию: <span>{props.element.name}</span></p></div>
                <EditOperationForm state={props.state}
                                  element={props.element}
                                  update={props.edit}
                                  close={props.close} />

            </div>

        </div>
    )
}

export default EditOperationModal;
