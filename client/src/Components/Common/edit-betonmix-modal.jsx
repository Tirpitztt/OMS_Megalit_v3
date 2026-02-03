import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import React from "react";
import BetonmixForm from "./Forms/Adminka/betonmix-form";

const EditBetonMixModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
        props.clearFields();
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} clear={props.clearFields}/></div>
                <div className={c.modal_title}><p>Изменить смесь: <span>{props.formState.form.editElement.articul}</span></p></div>

                <BetonmixForm state={props.state}
                              formState={props.formState}
                              setFieldsArr={props.setFieldsArr}
                              addFieldToArr={props.addFieldToArr}
                              updateBetMix={props.updateBetMix}
                              deleteIngredient={props.deleteIngredient}
                              clearFields={props.clearFields}
                              close={props.close}
                              element={props.element}/>
            </div>

        </div>
    )
}

export default EditBetonMixModal;
