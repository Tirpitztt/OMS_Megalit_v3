import React, {useEffect, useState} from 'react'
import c from '../form.module.css'
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";

const EditMaterialForm = (props)=> {

    const {register,handleSubmit,setValue,reset} = useForm();
    useEffect(()=>{
        setValue('name',props.element.name);
        setValue('measure',props.element.measure);
        setValue('BLR',props.element.BLR);
    },[props.element])



    const onSubmit = (body) => {
        body.id = props.element.id;
        body.BLR=buildFloat(body.BLR);
        body.USD = (body.BLR/props.state.rate[0].USD).toFixed(3);
        body.RUR = (body.BLR/props.state.rate[0].RUR).toFixed(3)
        props.update(body);
        reset();
        props.close(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_group}>
                    <label className={c.label_form}>наименование</label>
                    <input {...register('name',{onChange:(e)=>setValue('name',e.target.value)})}/>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>ед. изм</label>
                    <input {...register('measure')} defaultValue={props.element.measure}/>
                </div>


                <div className={c.form_group}>
                        <label className={c.label_form}>цена,BLR</label>
                        <input {...register('BLR')} defaultValue={props.element.BLR}/>
                </div>
                <div className={c.form_group}>
                    <button className={c.button_form} type='submit'>изменить материал</button>
                </div>

            </div>

        </form>
    )
}

export default EditMaterialForm;
