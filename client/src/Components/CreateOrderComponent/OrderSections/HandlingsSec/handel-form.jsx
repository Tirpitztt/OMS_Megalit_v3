import React, {useState} from 'react';
import c from "../sections.module.css";
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";
import {useMatState} from "../../../../Hooks/material.hook";
import {getDetailId} from "../../../../Utils/support";

const HandelForm = (props) => {
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    let {register,handleSubmit,reset} = useForm();
    const onSubmit = (body)=>{
        if(!props.isNewOrder){
            body.handlingId = props.handlingId
        }
        body.id = getDetailId()
        body.price = buildFloat(body.price);
        body.amount = buildFloat(body.amount);
        body.rate = buildFloat(rate[0].USD)
        props.setHand(body);
        props.changeCrux();
        reset();
    }

    return (
        <form className={c.form_main} onSubmit={handleSubmit(onSubmit)}>
            <p className={c.form_title_into}>Добавить обработку</p>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>наименование</label>
                    <input {...register('name')}/>
                </div>
                <div className={c.form_section}>
                    <label>категория</label>
                    <select {...register('category')}>
                        <option value="гравировка" selected>гравировка</option>
                        <option value="триплекс">триплекс</option>
                        <option value="золото">золото</option>
                        <option value="cagiati">cagiati</option>
                        <option value="резка">резка</option>
                        <option value="резка+полир">резка+полир</option>
                        <option value="пескоструй">пескоструй</option>
                    </select>
                </div>
                <div className={c.form_section}>
                    <label>размер</label>
                    <input {...register('size')}/>
                </div>
            </div>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>цена</label>
                    <input {...register('price')}/>
                </div>
                <div className={c.form_section}>
                    <label>количество</label>
                    <input {...register('amount')} defaultValue='1'/>
                </div>

            </div>
            <div className={c.form_body}>
                <button className={c.add_button} type='submit'>добавить</button>
            </div>
        </form>
    );
};

export default HandelForm;
