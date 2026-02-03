import React from 'react'
import c from '../form.module.css'
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";

const AddMaterialForm = (props)=> {

    const {register,handleSubmit,watch,reset} = useForm();

    const onSubmit = (body) => {
            let BLR = buildFloat(body.BLR);
            body.USD = (BLR/props.rate[0].USD).toFixed(3);
            body.RUR = (BLR/props.rate[0].RUR).toFixed(3);
            body.BLR = BLR;
            props.add(body);
            reset();
            props.close(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_group}>
                    <label className={c.label_form}>наименование</label>
                    <input {...register('name')}/>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>ед. изм</label>
                    <input {...register('measure')}/>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>цена,BLR</label>
                    <input {...register('BLR')}/>
                </div>
                <div className={c.form_group}>
                    <button className={c.button_form} type='submit'>добавить материал</button>
                </div>
            </div>

        </form>
    )
}

export default AddMaterialForm;
