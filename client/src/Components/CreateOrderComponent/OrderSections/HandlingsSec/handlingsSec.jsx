import React, {useState} from 'react';
import c from '../sections.module.css';
import HandelForm from "./handel-form";
import HandelTable from "./handel-table";
import SketchModal from "../../../Common/Forms/sketchModal";
import InfoHandleModal from "../../../Common/info-handle-modal";
import InfoButton from "../../../UI/Buttons/info-button";


const HandlingsSec = (props) => {
    const [modalSketch,setModalSketch] = useState(false);
    const [activeModalInfo,setActiveModalInfo] = useState(false);

    const changeH = ()=>{
        if(props.state.hydrophob){
            props.changeHydro(false);
        }else{
            props.changeHydro(true);
        }
        props.changeCrux();
    }

    const changeGrav=(e)=>{
        props.setText(e.target.value);
    }
    return (
        <div className='handlings_wrapper'>
            <div className={c.section_content}>
                <div className='form_box handel_pic'>
                    <div className={c.form_title}>
                        <div>
                            ОБРАБОТКА
                        </div>
                        <div>
                            <InfoButton func={setActiveModalInfo} number={true}/>
                        </div>
                    </div>
                    <div className={c.details_form}>
                        <HandelForm setHand={props.setHand}
                                    changeCrux={props.changeCrux}
                                    isNewOrder={props.isNewOrder}
                                    handlingId={props.handlingId}
                        />
                    </div>
                </div>
                <div className={c.table_box}>
                    <div className={c.check_box}>
                        <div className={c.hydro_box}>
                            <label>Гидрофоб: </label>
                            <input type="checkbox"
                                   onChange={changeH}
                                   checked={props.state.hydrophob}/>
                        </div>
                        <div className={c.sketchSelect}
                             onClick={()=>setModalSketch(true)}>
                            <p>выбрать эскиз</p>
                        </div>
                    </div>
                    <div className={c.text_box}>
                        <label>Текст для нанесения</label>
                        <div className={c.text_sketch_box}>
                            <textarea className={c.text_grav}
                                      onChange={changeGrav}
                                      value={props.state.text_grav}></textarea>
                            <div className={c.sketch_list}>
                                {props.cards}
                            </div>

                        </div>

                    </div>
                    <div>
                        <HandelTable details={props.state.handling_items}
                                     changeTotal={props.changeCrux}
                                     delHandel={props.delHand}/>
                    </div>

                </div>
            </div>
            <div className={c.button_box}>
                <button onClick={()=>props.changeDisplay(0)}>  назад </button>
                <button onClick={()=>props.changeDisplay(2)}>далее > </button>
            </div>
            <SketchModal active={modalSketch}
                         setActive={setModalSketch}
                         addFile={props.addFile}
                         setPath={props.setCardsList}/>
            <InfoHandleModal modal={activeModalInfo} close={setActiveModalInfo} />
        </div>
    );
};

export default HandlingsSec;
