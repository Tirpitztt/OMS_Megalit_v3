import React from 'react';
import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import BetonmixFormAdd from "./Forms/Adminka/betonmix-form-add";


const AddBetonmixModal = (props) => {
    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
        props.clearFields();
    }

    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} clear={props.clearFields}/></div>
                <div className={c.modal_title}>{props.title}</div>

                <BetonmixFormAdd state={props.state}
                                 formState={props.formState}
                                 setFieldsArr={props.setFieldsArr}
                                 addFieldToArr={props.addFieldToArr}
                                 addBetonMix={props.addBetonMix}
                                 clearFields={props.clearFields}
                                 close={closeModal}
                                 element={props.element}/>
            </div>

        </div>
    );
};

export default AddBetonmixModal;
