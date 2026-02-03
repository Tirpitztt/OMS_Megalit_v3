import React, {useState} from 'react';
import c from '../sections.module.css'
import MontazForm from "./montaz-form";
import {GUARANTIES_OPTIONS} from "../../../../Utils/variables-const";
import MontazTable from "./montaz-table";
import {buildFloat, convertToInt} from "../../../../Utils/buildNum";
import InfoMontazModal from "../../../Common/info-montaz-modal";
import InfoButton from "../../../UI/Buttons/info-button";
import SelectOptions from "../../../Common/select-options";

const MontazSec = (props) => {

    const [activeModalInfo, setActiveModalInfo] = useState(false);
    let defaultHeight = props.state.height
    let defaultWidth = props.state.width
    let defaultWeight = props.state.weight


    let sizeToString = buildFloat(defaultWidth).toFixed(2)+' X '+buildFloat(defaultWeight).toFixed(2)+' X '+buildFloat(defaultHeight).toFixed(2);
    const changeSizeMontaz = (type,size)=>{
        props.setSizeMontaz({type:type,size:buildFloat(size)});
    }
    const deliveryChange=(e)=>{
        props.setDelivery(buildFloat(e.target.value));
        props.changeCrux();
    }
    const deliveryPointChange=(e)=>{
        props.setDeliveryPoint(e.target.value);
    }
    const setGuaranties = (value) => {
        props.setGuaranties(value)
    }

    return (
        <div className='montaz_wrapper'>
            <div className={c.section_content}>
                <div className='form_box montaz_pic'>
                    <div className={c.form_title}>
                        <div>
                            МОНТАЖНЫЕ РАБОТЫ
                        </div>
                        <div>
                            <InfoButton func={setActiveModalInfo} number={true}/>
                        </div>
                    </div>
                    <div className={c.details_form}>
                        <MontazForm setMontaz={props.setMontaz}
                                    setGuaranties={setGuaranties}
                                    changeCrux={props.changeCrux}
                                    isNewOrder={props.isNewOrder}
                                    montazId={props.montazId}

                        />
                    </div>
                </div>
                <div className={c.table_box}>
                    <p>размер участка</p>
                    <div className={c.size_section}>
                        <div>
                            <label>ширина</label>
                            <input onChange={(e)=>changeSizeMontaz('width',e.target.value)} defaultValue={defaultWidth} />
                        </div>
                        <div>
                            <label>длина</label>
                            <input onChange={(e)=>changeSizeMontaz('weight',e.target.value)} defaultValue={defaultWeight} />
                        </div>
                        <div>
                            <label>высота</label>
                            <input onChange={(e)=>changeSizeMontaz('height',e.target.value)} defaultValue={defaultHeight} />
                        </div>
                        <div>
                            <label>Доставка,km: </label>
                            <input onChange={deliveryChange}
                                   value={props.state.delivery}/>
                        </div>
                        <div>
                            <label>Нас. пункт: </label>
                            <input  onChange={deliveryPointChange}
                                    value={props.state.delivery_point}/>
                        </div>
                        <div>
                            <label>Гарантия: </label>
                            <SelectOptions defaultValue={props.state.guaranties}
                                           options={GUARANTIES_OPTIONS}
                                           onChange={setGuaranties}
                            />
                        </div>
                    </div>
                    <div className={c.montaz_table_sec}>
                        <div>Размер участка,m: {sizeToString}</div>
                        <MontazTable state={props.state.montaz_items}
                                     changeCrux={props.changeCrux}
                                     delMontaz={props.delMontaz}/>
                    </div>
                </div>
            </div>
            <div className={c.button_box}>
                <button onClick={()=>props.changeDisplay(1)}>назад </button>
                <button onClick={()=>props.changeDisplay(3)}>далее > </button>
            </div>
            <InfoMontazModal modal={activeModalInfo} close={setActiveModalInfo} />
        </div>
    );
};

export default MontazSec;
