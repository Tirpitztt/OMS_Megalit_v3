import React, { useState} from 'react';
import c from './../sections.module.css';
import SketchModal from "../../../Common/Forms/sketchModal";
import SelectOptions from "../../../Common/select-options";
import {UTM_OPTIONS} from "../../../../Utils/variables-const";
import PayModal from "../../../Common/payModal";
import {buildFloat} from "../../../../Utils/buildNum";

const FinalForm = (props) => {
    let payText = 'внести платеж'
    if(props.state.isNewOrder){
        let summa = 0
        if(props.state.newOrder.calculation.payments.length){
            props.state.newOrder.calculation.payments.forEach(item=>{
                summa += item.summaBlr
            })
            payText = summa + ' руб'
        }
    }
    console.log(props.state)
    const [modalSketch,setModalSketch] = useState(false);
    const [payActive, setPayActive] = useState(false)
    let [discount,setDiscount] = useState(0);

    const itemUTM = (value) =>{
        props.changeUTM(value)
    }

    const setDisc = ()=>{
        props.setDiscount(buildFloat(discount));
        props.changeCrux();
    }

    const changeNotice = (e)=>{
        props.setNotice(e.target.value)
    }
    const onChangeTermin = (e)=>{
        props.setTermin(e.target.value);
    }
    return (
        <div>
            <div className={c.kassa_sec}>
                <div className={c.kassa_item}>

                    <label>UTM метка:</label>
                    <SelectOptions defaultValue={props.state.orderOption.UTM}
                                   options={UTM_OPTIONS}
                                   onChange={itemUTM} />
                </div>
                <div>
                    <label>Примечание к заказу</label>
                    <textarea  cols="40"
                               onChange={(e)=>changeNotice(e)}
                               value={props.state.orderOption.notice}
                               rows="10">

                    </textarea>
                </div>
                <div className={c.termin_box}>
                    <div>
                        <label>Сроки:</label>
                        <input type="date" value={props.state.orderOption.termin}
                               onChange={onChangeTermin} />
                    </div>
                    <div>
                        <div className={c.avans_button}
                            onClick={()=>setPayActive(true)}
                        ><p>{payText}</p></div>
                    </div>
                    <div>
                        <label>Скидка:</label>
                        <input onChange={(e)=>setDiscount(e.target.value)}
                               onBlur={setDisc} />
                    </div>

                </div>

            </div>


            <div className={c.kassa_sec}>
                <div className={c.sketchSelect}
                     onClick={()=>setModalSketch(true)}>
                    <p>выбрать эскиз</p>
                </div>
                <div className={c.sketch_list}>
                    {props.cards}
                </div>
            </div>
            <SketchModal active={modalSketch}
                         setActive={setModalSketch}
                         addFile={props.addFile}
                         setPath={props.setCardsList}/>
            <PayModal active={payActive}
                      addPayment={props.setPayment}
                      rate={props.state.materials.rate}
                      order={props.state.newOrder}
                      user={props.state.orderOption.employer}
                      close={setPayActive}
            />

        </div>
    );
};

export default FinalForm;
