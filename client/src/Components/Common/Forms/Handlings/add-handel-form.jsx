import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import c from './../form.module.css'
import {buildFloat} from "../../../../Utils/buildNum";
import {useMatState} from "../../../../Hooks/material.hook";

const AddHandelForm = (props) => {
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    const {register,handleSubmit,reset} = useForm()

    const onSubmit = (body) => {
        body.id = 'hui'
        body.orderId = props.order.id
        body.handlingId = props.order.handling.id
        body.price = buildFloat(body.price)
        body.rate = buildFloat(rate[0].USD)
        props.addHandel(body)
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
                    <label>Категория</label>
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
                <div className={c.form_group_col_30}>
                    <label>Размер</label>
                    <input {...register('size')} />
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

export default AddHandelForm;
