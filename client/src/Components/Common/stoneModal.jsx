import React from 'react';
import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import AddStoneForm from "./Forms/Adminka/add-stone-form";


const StoneModal = (props) => {
    const fieldsClear = (fields,setVal) => {
        fields.forEach(function(item,i){
            item.priceList = []
            setVal(`allFields[${i}].priceList`,[])
        })
    }

    const closeModal = ()=>{
        props.close(false)
        props.clearStateFields()
    }

    return (
        <div className={props.active?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}>Добавить камень</div>
                <AddStoneForm state={props.state}
                              formState={props.formState}
                              addFieldToArray={props.addFieldToArray}
                              clearFormFields={fieldsClear}
                              addFieldToWork={props.addFieldToWork}
                              addStone={props.addStone}
                              editable={props.editable}
                              close={closeModal}
                />

            </div>
        </div>
    );
};

export default StoneModal;
