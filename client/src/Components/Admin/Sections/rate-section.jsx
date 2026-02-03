import React, {useState} from 'react';
import RateTable from "./rate-table";
import c from './sections.module.css';
import HideButton from "../../UI/Buttons/hide-button";
import OpenButton from "../../UI/Buttons/open-button";

const RateSection = (props) => {

    const [activeForm, setActiveForm] = useState(false);

    let matRow = 'no data';
    const point = (id,val,name)=>{
        let p = <div className={c.table_item_body_rate} onDoubleClick={()=>doubleClick(id)}>{val}</div>
        if(props.state.selectEl===id){
            p = <div className={c.table_item_body_rate}><input onChange={(e)=>changeField(e,id,name)}
                           onBlur={()=>saveData(id,val,name)}
                           value={val}/></div>
        }
        return p;
    }
    const changeField = (e,id,name)=>{
        let body = {
            id:id,
            value:e.target.value,
            field:name
        }
        props.changeField(body);
    }
    const doubleClick = (id)=>{
        props.selectEl(id);
    }
    const saveData = (id,val,name)=>{
        let body = {
            id:id,
            value:val,
            field:name
        }
        props.saveMat(body);
    }
    if(props.state.rate.length){
        matRow = props.state.rate.map((item,i)=>{
            return <div className={c.table_row_rate}>
                <div className={c.table_item_body_rate} key={i}>{item.id}</div>
                {point(item.id,item.name,'name')}
                {point(item.id,item.USD,'USD')}
                {point(item.id,item.EUR,'EUR')}
                {point(item.id,item.RUR,'RUR')}
                <div className={c.table_item_body_rate}>{item.BLR}</div>
                </div>
        });
    }
    return (
        <div>

            <div className={c.table_box}>
                <div className={c.title_row}>
                    <div className={c.title}>
                        Таблица курсов валют
                    </div>
                    <HideButton func={setActiveForm} number={false}/>
                    <OpenButton func={setActiveForm} number={true}/>
                </div>
                <RateTable row={matRow} active={activeForm}/>

            </div>

        </div>
    );
};

export default RateSection;
