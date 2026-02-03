import React, {useState} from 'react';
import DeleteCyrcleButton from "../../../UI/Buttons/delete-cyrcle-button";
import EditCyrcleButton from "../../../UI/Buttons/edit_cyrcle_button";
import c from './../pages.module.css';
import AddButton from "../../../UI/Buttons/add-button";
import BetonMixTable from "./beton-mix-table";
import EditBetonMixModal from "../../../Common/edit-betonmix-modal";
import AddBetonmixModal from "../../../Common/add-betonmix-modal";


const BetonMixSection = (props) => {
    const title = <p>Добавить бетонную смесь</p>
    let betonMixRow = 'no data';
    let price = 0;


    const deleteRow = (id) => {}

    const [addModal, setAddModal]= useState(false);
    const [editModal, setEditModal] = useState(false);




    if(props.state.beton.beton_mixes.length){
        betonMixRow = props.state.beton.beton_mixes.map((item,i)=>{

            return <div key={item.id} className={c.table_row}>
                <div key={i} className={c.table_item_body}>{item.articul}</div>
                <div className={c.table_item_body}>{item.notation}</div>
                <div className={c.table_item_body}>{item.measure}</div>
                <div className={c.table_item_body}>{(item.price).toFixed(2)}</div>
                <div className={c.table_item_body}><EditCyrcleButton item={item} edit={props.editElement} modal={setEditModal} /></div>
                <div className={c.table_item_body}><DeleteCyrcleButton func={deleteRow} number={item.id} /></div>


            </div>
        });
    }

    return (
        <div>
            <div className={c.table_row}>
                <div className={c.table_title}>Бетонные смеси</div>
                <AddButton add={setAddModal} />
            </div>
            <div className={c.table_box_mat}>
                <BetonMixTable row={betonMixRow} />
            </div>
            <div className={c.notation}>
                <p>* Состав бетонной смеси напрямую влияет на цену каждой бетонной детали.</p>
                <p>При добавлении или исправлении состава бетонной смеси нужно свериться с технологической картой производства бетона </p>
                <p>Если в предлагаемых материалах нет необходимого, его нужно добавить в таблицу материалов.</p>

            </div>
            <AddBetonmixModal state={props.state}
                              modal={addModal}
                              title={title}
                              addFieldToArr={props.addFieldToArr}
                              formState={props.formState}
                              clearFields={props.clearFields}
                              addBetonMix={props.addBetonMix}
                              close={setAddModal}
            />
            <EditBetonMixModal state={props.state}
                               modal={editModal}
                               formState={props.formState}
                               setFieldsArr={props.setFieldsArr}
                               addFieldToArr={props.addFieldToArr}
                               updateBetMix={props.updateBetMix}
                               deleteIngredient={props.deleteIngredient}
                               clearFields={props.clearFields}
                               element={props.editElement}
                               close={setEditModal}
            />
        </div>
    );
};

export default BetonMixSection;
