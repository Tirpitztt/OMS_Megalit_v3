import React from 'react';
import {useForm} from "react-hook-form";
import c from "../form.module.css";
import {buildFloat} from "../../../../Utils/buildNum";
import {useMatState} from "../../../../Hooks/material.hook";

const AddMontazForm = (props) => {
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    const {register,handleSubmit,reset} = useForm()

    const onSubmit = (body)=>{
        body = {
            id:'hui',
            orderId:props.order.id,
            montazId:props.order.montaz.id,
            name:body.name,
            category:body.category,
            type:body.type,
            price:buildFloat(body.price),
            amount:buildFloat(body.amount),
            rate:buildFloat(rate[0].USD)
        }
        props.addMontaz(body)
        reset()
        props.close()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_row_100}>
                <div className={c.form_group_col_30}>
                    <label>Наименование</label>
                    <input {...register('name')} />
                </div>
                <div className={c.form_group_col_30}>
                    <label>категория</label>
                    <select {...register('category')}>
                        <option value="памятник" selected>памятник</option>
                        <option value="ограждение">ограждение</option>
                        <option value="пол">пол</option>
                        <option value="аксессуары">аксессуары</option>
                        <option value="прочее">прочее</option>

                    </select>
                </div>
                <div className={c.form_group_col_30}>
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
            <div className={c.form_box_row_100}>
                <div className={c.form_group_col_30}>
                    <label>Цена</label>
                    <input {...register('price')} />
                </div>
                <div className={c.form_group_col_30}>
                    <label>Количество</label>
                    <input {...register('amount')} />
                </div>
            </div>
            <div className={c.add_but_wrap}>
                <button type='submit'>добавить</button>
            </div>


        </form>
    );
};

export default AddMontazForm;
