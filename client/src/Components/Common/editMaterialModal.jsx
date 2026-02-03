import c from './modal.module.css'
import EditMaterialForm from "./Forms/Adminka/edit-material-form";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import React from "react";

const EditMaterialModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}><p>Исправить материал: <span>{props.element.name}</span></p></div>
                <EditMaterialForm state={props.state}
                                  element={props.element}
                                  update={props.edit}
                                  close={props.close} />

            </div>

        </div>
    )
}

export default EditMaterialModal;
