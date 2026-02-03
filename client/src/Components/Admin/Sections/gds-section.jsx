import React, {useState} from 'react';
import c from './../Pages/pages.module.css';
import AddGdsModal from "../../Common/add-gds-modal";
import AddButton from "../../UI/Buttons/add-button";
import GdsTable from "./gds-table";
import EditCyrcleButton from "../../UI/Buttons/edit_cyrcle_button";
import DeleteCyrcleButton from "../../UI/Buttons/delete-cyrcle-button";
import EditGdsModal from "../../Common/edit-gds-modal";
import Detail from "../../../Utils/Classes/detail";

const GdsSection = (props) => {

    const [activeModal, setActiveModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)

    let gdsData = 'NO DATA...'
    const editGoods = (body) => {
        body.id = props.formState.form.editGds.id;
        body.category = 'goods';
        let gds = new Detail();
        gds.setDetail(body);
        props.editGDS(gds.getDetail());
    }

    const addGoods = (body) => {
        let gds = new Detail();
        body.category = 'goods';
        gds.setDetail(body);
        props.addGDS(gds.getDetail());
    }

    if(props.state.gds.length){
        gdsData = props.state.gds.map((item,i)=>{
            return <div key={i} className={c.table_row}>
                <div className={c.table_gds_item}>{item.name}</div>
                <div className={c.table_gds_item}>{item.articul}</div>
                <div className={c.table_gds_item}>{item.type}</div>
                <div className={c.table_gds_item}>{item.sort}</div>
                <div className={c.table_gds_item}>{item.material}</div>
                <div className={c.table_gds_item}>{item.color}</div>
                <div className={c.table_gds_item}>{item.status}</div>
                <div className={c.table_gds_item}>{item.local}</div>
                <div className={c.table_gds_item}>{item.height}</div>
                <div className={c.table_gds_item}>{item.width}</div>
                <div className={c.table_gds_item}>{item.weight}</div>
                <div className={c.table_gds_item}>{item.price}</div>
                <div className={c.table_gds_item}>{item.amount}</div>
                <div className={c.table_gds_item}>
                    <EditCyrcleButton modal={setActiveEditModal}
                                      edit={props.setEditGDS}
                                      item={item}
                    />
                </div>
                <div className={c.table_gds_item}><DeleteCyrcleButton /></div>

            </div>
        })
    }


    return (
        <div className={c.stone_box}>
            <div className={c.table_row}>
                <div className={c.table_title}>Сводная товаров</div>
                <AddButton add={setActiveModal} />
            </div>
            <div className={c.table_box_mat}>
                <GdsTable row={gdsData} />
            </div>

            <AddGdsModal modal={activeModal}
                         close={setActiveModal}
                         formState={props.formState}
                         details={props.state.details}
                         clearStateFields={props.clearStateFields}
                         addGoods={addGoods}
                         title='Добавить товар'/>
            <EditGdsModal modal={activeEditModal}
                          close={setActiveEditModal}
                          clearStateFields={props.clearStateFields}
                          details={props.state.details}
                          editGDS={editGoods}
                          formState={props.formState}
                          title='Изменить товар' />
        </div>
    );
};

export default GdsSection;
