import React, {useEffect, useState} from 'react';
import {setNameDetailList} from "../../Utils/support";
import c from "./modal.module.css";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

import AddBetonDetailForm from "./Forms/Adminka/add-beton-detail-form";

const EditBetonDetailModal = (props) => {


    let isActive = props.modal;
    const [categoryOptions,setCategoryOptions] = useState([])
    useEffect(()=>{
        setNameDetailList('тип дет',setCategoryOptions)
    },[])
    const closeModal = ()=>{
        props.close(false);
        isActive = false;
        props.clearFields();
    }


    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} clear={props.clearFields}/></div>
                <div className={c.modal_title}>Изменить деталь</div>
                <AddBetonDetailForm
                    formState={props.formState}
                    adminState={props.adminState}
                    categoryOptions={categoryOptions}
                    state={props.state}
                    addFieldToArr={props.addFieldToArr}
                    addFieldToMat={props.addFieldToMat}
                    addFieldToWork={props.addFieldToWork}
                    addBetonDetail={props.addBetonDetail}
                    updateBetonDetail={props.updateBetonDetail}
                    close={closeModal}
                />

            </div>

        </div>
    );
};

export default EditBetonDetailModal;
