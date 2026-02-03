import React, {useState} from 'react';
import c from '../sections.module.css'
import DetailForm from "./detail-form";
import {useForm} from "react-hook-form";
import DetailsTable from "./details-table";
import DeleteButton from "../../../UI/Buttons/delete-button";
import InfoButton from "../../../UI/Buttons/info-button";
import InfoComplectModal from "../../../Common/info-complect-modal";
import {setNameDetailList} from "../../../../Utils/support";
import {buildFloat} from "../../../../Utils/buildNum";
import Complect from "../../../../Utils/Classes/complect";

const ComplectSec = (props) => {

    //console.log('props:',props.state)
    let {register,handleSubmit} = useForm();
    let [correct,setCorrect] = useState(0);
    let [complectActive,setComplectActive] = useState(1);
    let [nameList,setNameList] = useState([]);
    let disabled = true;
    let complects = 'нет комплектов...';
    const [activeModal, setActiveModal] = useState(false);

    const complectClick = (id,type)=>{
        setComplectActive(id);
        setNameDetailList(type,setNameList);
    }
    const wrapClicker = () => {  //убрать список артикулов по клику
        props.setArticulList([]);
    }
    const delCompl = (data)=>{
        props.delCompl(data);
        props.changeCrux();
    }
    const correctChange = (e)=>{
        setCorrect(e.target.value);
    }
    const correctApply = (id)=>{
        let data = {
            num:id,
            correct:buildFloat(correct)
        }
        props.correctApply(data);
        props.changeCrux();
    }
    if(props.state.length){
        disabled = false;
        complects = props.state.map((item,i)=>{
            return <div key={i}>
                <div className={c.compl_title}>
                    <p onClick={()=>complectClick(item.id,item.type)}
                       className={complectActive===item.id?c.active_compl:''}
                    >Комплект: <i>{item.type}</i></p>
                    <div className={c.correct_box}><label>коррекция</label><input
                        onChange={(e)=>correctChange(e)}
                        onBlur={()=>correctApply(item.id)}/></div>
                    <div className={c.correct_box}><label>сумма</label><p>{(item.summComplect).toFixed(2)}</p></div>
                    <div className={c.del_but}>
                        <DeleteButton del={delCompl} number={item.id}/>
                    </div>
                </div>
                <DetailsTable   props={item.complect_items}
                                delDetal={props.delDetal}
                                changeCrux={props.changeCrux}
                />
            </div>
        })
    }
    const onSubmit = (body)=>{
        //body.number = Math.ceil(Math.random()*1000);
        //body.complect_items = [];
        //body.summComplect = 0;
        const complect = new Complect(body.type)
        if(!props.isNewOrder){
            complect.setOrderId(props.orderId)
        }

        if(complect.getType().startsWith('standart')){
            props.getStandartKit(complect)
        }else{
            props.setComplect(complect);
        }
        props.changeCrux()
    }
    return (
        <div className='complect_wrapper' onClick={wrapClicker} >
            <div className={c.section_content}>
                <div className='form_box compl_pic'>
                    <div className={c.form_title}>
                        <div>
                            КОМПЛЕКТАЦИЯ
                        </div>
                        <div>
                            <InfoButton func={setActiveModal} number={true}/>
                        </div>
                    </div>
                    <div className={c.compl_form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className={c.form_section}>
                                <legend>добавить комплект</legend>
                                <label>тип комплекта</label>
                                <select {...register('type')}>
                                    <option value="памятник">памятник</option>
                                    <option value="ограда">ограждение</option>
                                    <option value="магазин">магазин</option>
                                    <option value="standart100">пам станд100</option>
                                    <option value="standart90">пам станд90</option>
                                    <option value="standart80">пам станд80</option>
                                </select>
                                <button className={c.add_button} type='submit'>добавить</button>
                            </fieldset>
                        </form>
                    </div>
                    <div className={c.details_form}>
                        <DetailForm number={complectActive}
                                    nameList={nameList}
                                    activeDetail={props.activeDetail}
                                    setActiveDetail={props.setActiveDetail}
                                    articulList={props.articulList}
                                    setArticulList={props.setArticulList}

                                    dis={disabled}
                                    setDetail={props.setDetail}
                                    wrapClicker={wrapClicker}
                                    changeCrux={props.changeCrux}/>
                    </div>
                </div>
                <div className={c.table_box}>
                    {complects}
                </div>
            </div>
            <div className={c.button_box}>
                <button onClick={()=>props.changeDisplay(1)}>далее > </button>
            </div>
            <InfoComplectModal modal={activeModal} close={setActiveModal}/>
        </div>
    );
};

export default ComplectSec;
