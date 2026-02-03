import React, {useState} from 'react';
import c from './../pages.module.css';
import AddButton from "../../../UI/Buttons/add-button";
import EditCyrcleButton from "../../../UI/Buttons/edit_cyrcle_button";
import DeleteCyrcleButton from "../../../UI/Buttons/delete-cyrcle-button";
import BetonDetailTable from "./beton-detail-table";
import AddBetonDetailModal from "../../../Common/add-beton-detail-modal";
import EditBetonDetailModal from "../../../Common/edit-beton-detail-modal";
import {useBetonDetails} from "../../../../Hooks/material.hook";
import {setDetailPrice, setMixName} from "../../../../Utils/support";

const BetonDetailSection = (props) => {

    let betonDetailRow = 'no data';
    const [details] = useBetonDetails();
    const [addModal, setAddModal]= useState(false);
    const [editModal, setEditModal] = useState(false);
    const deleteDetail = (id) =>console.log('delete:',id);
    const sort =(val) => {
        props.detailsSort({details:details,category:val});
    }

    if(props.state.beton.beton_details.length){
        betonDetailRow = props.state.beton.beton_details.map((item,i)=>{
            let data = setDetailPrice(item,props.state.beton.beton_mixes,props.state.materials,props.state.workOperations);
            //console.log(data);
            return <div key={item.id} className={c.table_row}>
                <div key={i} className={c.table_item_body_bd}>{item.articul}</div>
                <div className={c.table_item_body_bd}>{item.height}</div>
                <div className={c.table_item_body_bd}>{item.width}</div>
                <div className={c.table_item_body_bd}>{item.weight}</div>
                <div className={c.table_item_body_bd}>{item.V}</div>
                <div className={c.table_item_body_bd}>{item.S}</div>
                <div className={c.table_item_body_bd}>{setMixName(item.betmixID,props.state.beton.beton_mixes)}</div>
                <div className={c.table_item_body_bd}>{item.markup}</div>
                <div className={c.table_item_body_bd}>{item.added_cost}</div>
                <div className={c.table_item_body_bd}>{(data.cost).toFixed(2)}</div>
                <div className={c.table_item_body_bd}>{(data.work).toFixed(2)}</div>
                <div className={c.table_item_body_bd}>{(data.price).toFixed(2)}</div>
                <div className={c.table_item_body_bd}>{item.amount}</div>
                <div className={c.table_item_body_bd}><EditCyrcleButton item={item} edit={props.editDetail} modal={setEditModal} /></div>
                <div className={c.table_item_body_bd}><DeleteCyrcleButton func={deleteDetail} number={item.id} /></div>
            </div>
        })
    }

    return (
        <div className={c.beton_detail_section}>
            <div className={c.table_row}>
                <div className={c.table_title}>Бетонные детали</div>
                <select className={c.sort_select}
                        onChange={(e)=>sort(e.target.value)}>
                    <option value="all">показать все</option>
                    <option value="стела">стелы</option>
                    <option value="подставка">подставки</option>
                    <option value="цветник">цветники</option>
                    <option value="ограды">ограды</option>
                    <option value="плитка">плитка</option>
                    <option value="другое">другое</option>
                </select>
                <AddButton add={setAddModal} />
            </div>
            <div className={c.table_box_det}>
                <BetonDetailTable row={betonDetailRow} />
            </div>
            <div className={c.notation}>

            </div>
            <AddBetonDetailModal
                state={props.state}
                adminState={props.adminState}
                modal={addModal}
                addFieldToArr={props.addFieldToArr}
                addFieldToMat={props.addFieldToMat}
                addFieldToWork={props.addFieldToWork}
                addBetonDetail={props.addBetonDetail}
                formState={props.formState}
                clearFields={props.clearFields}
                close={setAddModal}

            />
            <EditBetonDetailModal
                state={props.state}
                adminState={props.adminState}
                modal={editModal}
                addFieldToArr={props.addFieldToArr}
                addFieldToMat={props.addFieldToMat}
                addFieldToWork={props.addFieldToWork}
                formState={props.formState}
                clearFields={props.clearFields}
                updateBetonDetail={props.updateBetonDetail}
                close={setEditModal}
            />
        </div>
    );
}

export default BetonDetailSection;


