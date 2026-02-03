import React from 'react';
import c from "./modal.module.css";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import AddStoneForm from "./Forms/Adminka/add-stone-form";

const EditStoneModal = (props) => {


    const fieldsClear = (fields,setVal) => {
        fields.forEach(function(item,i){
            item.priceList = []
            setVal(`allFields[${i}].priceList`,[])
        })
    }


    const closeModal = ()=>{
        props.clearStateFields()
        props.setEditable(false)
        props.close(false)
    }

    return (
        <div className={props.active?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}>Изменить камень</div>
                <AddStoneForm state={props.state}
                              active={props.active}
                              formState={props.formState}
                              clearFormFields={fieldsClear}
                              addFieldToArray={props.addFieldToArray}
                              addFieldToWork={props.addFieldToWork}
                              addStone={props.addStone}
                              editStone={props.editStone}
                              editable={props.editable}
                              close={closeModal}/>

            </div>
        </div>
    );
};

export default EditStoneModal;
