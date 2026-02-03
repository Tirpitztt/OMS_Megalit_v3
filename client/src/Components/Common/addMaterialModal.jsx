import c from './modal.module.css'
import AddMaterialForm from "./Forms/Adminka/add-material-form";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";


const AddMaterialModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close}><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}>{props.title}</div>
                {props.form}

            </div>

        </div>
    )
}

export default AddMaterialModal;
