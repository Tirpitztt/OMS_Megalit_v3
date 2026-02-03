import React, {useState} from 'react';
import DeleteCyrcleButton from "../../UI/Buttons/delete-cyrcle-button";
import EditCyrcleButton from "../../UI/Buttons/edit_cyrcle_button";
import c from './../admin.module.css';
import AddButton from "../../UI/Buttons/add-button";
import AddMaterialModal from "../../Common/addMaterialModal";
import WorkTable from "./work-table";
import AddOperationForm from "../../Common/Forms/Adminka/add-operation-form";
import EditOperationModal from "../../Common/edit-operation-modal";

const WorkOpSection = (props) => {
    const title = <p>Добавить опреацию</p>
    let workRow = 'no data';

    const [editElement,setEditElement] = useState({});
    const deleteRow = (id) => {}

    const [addModal, setAddModal]= useState(false);
    const [editModal, setEditModal] = useState(false);

    const modalForm = <AddOperationForm rate={props.state.rate}
                                       add={props.add}
                                       close={setAddModal}/>

    if(props.state.worksOperations.length){
        workRow = props.state.worksOperations.map((item,i)=>{

            return <div className={c.table_row}>
                <div key={i} className={c.table_item_body_work}>{item.type}</div>
                <div className={c.table_item_body_work}>{item.name}</div>
                <div className={c.table_item_body_work}>{item.measure}</div>
                <div className={c.table_item_body_work}>{item.BLR}</div>


                <div className={c.table_item_body_work}><EditCyrcleButton item={item} edit={setEditElement} modal={setEditModal} /></div>
                <div className={c.table_item_body_work}><DeleteCyrcleButton func={deleteRow} number={item.id} /></div>


            </div>
        });
    }
    return (
        <div>
            <div className={c.table_row}>
                <div className={c.table_title}>Сводная трудовых операций</div>
                <AddButton add={setAddModal} />
            </div>
            <div className={c.table_box_mat}>
                <WorkTable row={workRow} />
            </div>
            <div className={c.notation}>

            </div>
            <AddMaterialModal rate={props.state.rate}
                              modal={addModal}
                              form={modalForm}
                              title={title}
                              close={setAddModal}
            />
            <EditOperationModal state={props.state}
                               element={editElement}
                               modal={editModal}
                               close={setEditModal}
                               edit={props.edit} />
        </div>
    );
};

export default WorkOpSection;
