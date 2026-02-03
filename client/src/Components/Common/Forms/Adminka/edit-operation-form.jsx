import React, {useEffect, useState} from 'react'
import c from '../form.module.css'
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";
import {workOperationBodyBuilder} from "../../../../Utils/adminSupport";

const EditOperationForm = (props)=> {

    const {register,handleSubmit,setValue,reset} = useForm();
    useEffect(()=>{
        setValue('type',props.element.type);
        setValue('name',props.element.name);
        setValue('measure',props.element.measure);
        setValue('stavka',props.element.stavka);
        setValue('bonus',props.element.bonus);
        setValue('BLR',props.element.BLR);
    },[props.element])



    const onSubmit = (body) => {
        let operation = workOperationBodyBuilder(body,props.state.rate[0].USD,props.element.id)

        props.update(operation);
        reset();
        props.close(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_group}>
                    <label className={c.label_form}>ед. изм</label>
                    <input {...register('type')} defaultValue={props.element.type}/>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>наименование</label>
                    <input {...register('name',{onChange:(e)=>setValue('name',e.target.value)})}/>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>ед. изм</label>
                    <input {...register('measure')} defaultValue={props.element.measure}/>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>ставка,BLR</label>
                    <input {...register('stavka')}/>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>премия,%</label>
                    <input {...register('bonus')}/>
                </div>


                <div className={c.form_group}>
                    <button className={c.button_form} type='submit'>изменить материал</button>
                </div>

            </div>

        </form>
    )
}

export default EditOperationForm;
