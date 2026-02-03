import React, {useState} from 'react';
import c from "../sections.module.css";
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";
import {useMatState} from "../../../../Hooks/material.hook";

const MontazForm = (props) => {
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    let {register,handleSubmit,reset,watch} = useForm();
    let [isErr,setErr] = useState(false);
    const amountChange = (e)=>{
        if(e.target.value.includes(',')){
            setErr(true);
        }else{
            setErr(false);
        }
    }
    const onSubmit = (body)=>{
        if(!props.isNewOrder){
            body.montazId = props.montazId
        }
        body.id = Math.ceil(Math.random()*1000);
        body.price = buildFloat(body.price);
        body.amount = buildFloat(body.amount);
        body.rate = buildFloat(rate[0].USD)
        props.setMontaz(body);
        props.changeCrux();
        reset();
    }
    return (
        <form className={c.form_main} onSubmit={handleSubmit(onSubmit)}>
            <p className={c.form_title_into}>Добавить монтажные работы</p>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>наименование</label>
                    <input {...register('name')}/>
                </div>
                <div className={c.form_section}>
                    <label>категория</label>
                    <select {...register('category')}>
                        <option value="памятник" selected>памятник</option>
                        <option value="ограждение">ограждение</option>
                        <option value="пол">пол</option>
                        <option value="аксессуары">аксессуары</option>
                        <option value="прочее">прочее</option>

                    </select>
                </div>
                <div className={c.form_section}>
                    <label>тип</label>
                    <select {...register('type')}>
                        <option value="монтаж" selected>монтаж</option>
                        <option value="заливка">заливка</option>
                        <option value="укладка">укладка</option>
                        <option value="демонтаж">демонтаж</option>
                        <option value="дем/монтаж">дем/монтаж</option>
                        <option value="исправление">исправление</option>
                        <option value="прочее">прочее</option>
                    </select>
                </div>
            </div>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>цена</label>
                    <input {...register('price',{onChange:amountChange})}/>
                </div>
                <div className={c.form_section}>
                    <label>количество</label>
                    <input {...register('amount',{onChange:amountChange})} defaultValue='1'/>
                </div>
                {/*<div className={isErr?c.activeErr:c.hide}><p>Запятую НЕЛЬЗЯ!</p></div>*/}
            </div>
            <div className={c.form_body}>
                <button className={c.add_button} type='submit'>добавить</button>
            </div>
        </form>
    );
};

export default MontazForm;
