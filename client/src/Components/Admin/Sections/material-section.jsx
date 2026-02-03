import React, {useState} from 'react';
import MaterialTable from "./material-table";
import DeleteCyrcleButton from "../../UI/Buttons/delete-cyrcle-button";
import EditCyrcleButton from "../../UI/Buttons/edit_cyrcle_button";
import c from './../admin.module.css';
import AddButton from "../../UI/Buttons/add-button";
import AddMaterialModal from "../../Common/addMaterialModal";
import EditMaterialModal from "../../Common/editMaterialModal";
import AddMaterialForm from "../../Common/Forms/Adminka/add-material-form";
import EditMaterialForm from "../../Common/Forms/Adminka/edit-material-form";

const MaterialSection = (props) => {
    const title = <p>Добавить материал</p>
    let matRow = 'no data';

    const [editElement,setEditElement] = useState({});
    const deleteRow = (id) => {}

    const [addModal, setAddModal]= useState(false);
    const [editModal, setEditModal] = useState(false);

    const modalForm = <AddMaterialForm rate={props.state.rate}
                                       add={props.add}
                                       close={setAddModal}/>


    if(props.state.materials.length){
        matRow = props.state.materials.map((item,i)=>{

            return <div className={c.table_row}>
                <div key={i} className={c.table_item_body}>{item.id}</div>
                <div className={c.table_item_body}>{item.name}</div>
                <div className={c.table_item_body}>{item.measure}</div>
                <div className={c.table_item_body}>{item.RUR}</div>
                <div className={c.table_item_body}>{item.USD}</div>
                <div className={c.table_item_body} >{item.BLR}</div>
                <div className={c.table_item_body}><EditCyrcleButton item={item} edit={setEditElement} modal={setEditModal} /></div>
                <div className={c.table_item_body}><DeleteCyrcleButton func={deleteRow} number={item.id} /></div>


            </div>
        });
    }

    return (
        <div>
           <div className={c.table_row}>
               <div className={c.table_title}>Сводная материалов</div>
               <AddButton add={setAddModal} />
           </div>
            <div className={c.table_box_mat}>
                <MaterialTable row={matRow} />
            </div>
            <div className={c.notation}>
                <p>* При добавлении материала следует учитывать корректные единицы измерения.</p>
                <p>Материал поставляемый навалом, учитывается в расчетах как цена за <strong>т</strong>. </p>
                <p>Упакованный сыпучий материал учитывается как цена за <strong>кг</strong>.</p>
                <p>Матриал поставляемый штучно или метражом, соответственно <strong>шт</strong> или <strong>м.п.</strong></p>
                <p>** Цена указывается в бел.рублях, цена в остальных валютах высчитывается автоматически.</p>
            </div>
            <AddMaterialModal rate={props.state.rate}
                              modal={addModal}
                              form={modalForm}
                              title={title}
                              close={setAddModal}
            />
            <EditMaterialModal state={props.state}
                               modal={editModal}
                               element={editElement}
                               close={setEditModal}
                               edit={props.edit}
                                />
        </div>
    );
};

export default MaterialSection;
