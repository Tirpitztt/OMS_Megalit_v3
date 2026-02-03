import React from 'react';
import AddGdsForm from "./Forms/Adminka/add-gds-form";
import c from "./modal.module.css";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const AddGdsModal = (props) => {

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
                <AddGdsForm addGoods={props.addGoods}
                            formState={props.formState}
                            details={props.details}
                            close={closeModal}
                            clearStateFields={props.clearStateFields}
                />
            </div>

        </div>
    );
};

export default AddGdsModal;
