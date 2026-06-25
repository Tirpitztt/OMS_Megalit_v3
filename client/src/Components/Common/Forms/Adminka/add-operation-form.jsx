import React from 'react'
import c from '../form.module.css'
import {useForm} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";
import {workOperationBodyBuilder} from "../../../../Utils/adminSupport";
import {FORM_CONCREATE, FORM_MONTAZ, FORM_POLISH, FORM_VARIED} from "../../../../Utils/variables-const";

const AddOperationForm = (props)=> {

    const {register,handleSubmit,watch,reset} = useForm();

    const onSubmit = (body) => {
        let operation = workOperationBodyBuilder(body,props.rate[0].USD);
        props.add(operation);
        reset();
        props.close(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_group}>
                    <label className={c.label_form}>Цех</label>
                    <select {...register('type')}>
                        <option value={FORM_CONCREATE}>Заливка</option>
                        <option value={FORM_POLISH}>Шлифовка</option>
                        <option value={FORM_VARIED}>Разный</option>
                        <option value={FORM_MONTAZ}>Монтаж</option>
                    </select>
                    {/*<input {...register('type')}/>*/}
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>наименование</label>
                    <input {...register('name')}/>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>ед. изм</label>
                    <input {...register('measure')}/>
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
                    <button className={c.button_form} type='submit'>добавить операцию</button>
                </div>
            </div>

        </form>
    )
}

export default AddOperationForm;
