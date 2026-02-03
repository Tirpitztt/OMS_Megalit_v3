import React, {useEffect, useState} from 'react';
import c from './complect-fom.module.css'
import DetailSecForm from "./detail-sec-form";
import {setNameDetailList} from "../../../../Utils/support";
import {useForm} from "react-hook-form";

const AddComplectForm = (props) => {
    //console.log('form',props.state)

    const {register,handleSubmit,setValue,reset} = useForm()
    const [nameOptions,setNameOptions] = useState([<option key={9}>primer</option>])
    const [complectName, setComplectName] = useState('')
    const [detailList,setDetailList] = useState([])
    const detailListDiv = detailList.map((item,i)=>{
        return <div key={i} className={c.detail_sec_row}>
            <div>{item.name}</div>
            <div>{item.articul}</div>
            <div>{item.material}</div>
            <div>{item.height}</div>
            <div>{item.width}</div>
            <div>{item.weight}</div>
            <div>{item.price}</div>
            <div>{item.amount}</div>
        </div>
    })



    const radioClick = (e) => {
        setComplectName(e.target.value)
        setNameDetailList(e.target.value,setNameOptions)
    }

    const saveComplect = () => {
        //console.log(props.order)
        let body = {
            id:'hui',
            orderId:props.order.id,
            summComplect:0,
            type:complectName,
            complect_items:detailList
        }
        props.submit(body)
        setNameOptions([<option key={9}>primer</option>])
        setDetailList([])
    }

    return (
        <form onSubmit={handleSubmit(saveComplect)}>
            <div className={c.complect_sec}>
                <div className={c.form_row}>
                    <div className={c.form_box_row}>
                        <label>памятник</label>
                        <input type='radio'
                               name='complect'
                               value='памятник'
                               onClick={(e)=>radioClick(e)} />
                    </div>
                    <div className={c.form_box_row}>
                        <label>ограждение</label>
                        <input type='radio' name='complect' value='ограда' onClick={(e)=>radioClick(e)} />
                    </div>
                    <div className={c.form_box_row}>
                        <label>магазин</label>
                        <input type='radio' name='complect' value='магазин' onClick={(e)=>radioClick(e)} />
                    </div>
                </div>
                <div className={c.form_row}>
                    <div className={c.form_box_row}>
                        деталь
                    </div>
                </div>
                <DetailSecForm detailList={detailList}
                               articulList={props.articulList}
                               setArticulList={props.setArticulList}
                               addDetail={setDetailList}
                               complectType={nameOptions}/>
            </div>
            <div className={c.details_sec}>
                {detailListDiv}
            </div>
            <div className={c.form_row}>
                <button type='submit'>сохранить</button>
            </div>
        </form>
    );
};

export default AddComplectForm;
