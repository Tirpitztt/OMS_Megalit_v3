import React from 'react';
import c from "./modal.module.css";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import AddGdsForm from "./Forms/Adminka/add-gds-form";

const EditGdsModal = (props) => {

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        props.clearStateFields();
        isActive = false;
    }
    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}>{props.title}</div>
                <AddGdsForm formState={props.formState}
                            editGDS={props.editGDS}
                            details={props.details}
                            close={closeModal}
                            clearStateFields={props.clearStateFields}
                />
            </div>

        </div>
    );
};

export default EditGdsModal;
