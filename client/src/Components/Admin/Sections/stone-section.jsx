import React, {useState} from 'react';
import StoneModal from "../../Common/stoneModal";
import c from './../Pages/pages.module.css';
import AddButton from "../../UI/Buttons/add-button";
import EditStoneModal from "../../Common/edit-stone-modal";
import EditCyrcleButton from "../../UI/Buttons/edit_cyrcle_button";
import DeleteCyrcleButton from "../../UI/Buttons/delete-cyrcle-button";
import StoneDetailTable from "./stone-detail-table";
import {getStoneForEdit} from "../../../Utils/adminSupport";


const StoneSection = (props) => {

    const [active,setActive] = useState(false)
    const [activeEdit,setActiveEdit] = useState(false)
    const [editable,setEditable] = useState(false)

    let stoneData = 'NO DATA....'

    const setEditClick = (id) => {
        setEditable(true)
        props.setEditStone(getStoneForEdit(props.state.stone,id))
    }

    if(props.state.stoneUI.length){
        stoneData = props.state.stoneUI.map((item,i)=>{
            return <div key={i} className={c.table_row}>
                <div className={c.table_stone_item_bd}>{item.name}</div>
                <div className={c.table_stone_item_bd}>{item.country}</div>
                <div className={c.table_stone_item_bd}>{item.color}</div>
                <div className={c.table_stone_item_bd}>{item.t2}</div>
                <div className={c.table_stone_item_bd}>{item.t3}</div>
                <div className={c.table_stone_item_bd}>{item.t5}</div>
                <div className={c.table_stone_item_bd}>{item.t8}</div>
                <div className={c.table_stone_item_bd}>{item.t10}</div>
                <div className={c.table_stone_item_bd}>{item.t12}</div>
                <div className={c.table_stone_item_bd}>{item.t15}</div>
                <div className={c.table_stone_item_bd}>{item.t20}</div>
                <div className={c.table_stone_item_bd}>{item.t25}</div>
                <div className={c.table_stone_item_bd}>{item.t30}</div>
                <div className={c.table_stone_item_bd}>{item.ratio}</div>
                <div className={c.table_stone_item_bd}><EditCyrcleButton edit={setEditClick}
                                                                         item={item.id}
                                                                         modal={setActiveEdit} /></div>
                <div className={c.table_stone_item_bd}><DeleteCyrcleButton /></div>
            </div>
        })
    }





    return (
        <div className={c.stone_box}>
            <div className={c.table_row}>
                <div className={c.table_title}>Сводная камня</div>
                <AddButton add={setActive} />

            </div>
            <div className={c.table_box_mat}>
                <StoneDetailTable row={stoneData} />
            </div>
            <div className={c.notation}>
                Для того чтобы внести изменения или дополнения в конкретную позицию
                нужно нажать на круглую кнопку редактирования позиции.
            </div>
            <StoneModal active={active} close={setActive}
                        state={props.state}
                        formState={props.formState}
                        addFieldToArray={props.addFieldToArray}
                        setFieldsArray={props.setFieldsArray}
                        addFieldToWork={props.addFieldToWork}
                        clearStateFields={props.clearStateFields}
                        editable={editable}
                        addStone={props.addStone}
            />
            <EditStoneModal active={activeEdit} close={setActiveEdit}
                            addStone={props.addStone}
                            addFieldToWork={props.addFieldToWork}
                            addFieldToArray={props.addFieldToArray}
                            formState={props.formState}
                            clearStateFields={props.clearStateFields}
                            editable={editable}
                            setEditable={setEditable}
                            editStone={props.editStone}
                            state={props.state}
            />
        </div>
    );
};

export default StoneSection;
