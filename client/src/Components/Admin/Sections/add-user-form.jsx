import React from 'react';
import {useForm} from "react-hook-form";
import c from './sections.module.css';

const AddUserForm = (props) => {

    let isActive = props.active;

    let {register,handleSubmit,reset} = useForm();

    const onSubmit = (body)=>{
        props.addUser(body);
        reset();
    }
    return (
        <div className={isActive?c.user_form_wrap:c.hide_box}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={c.form_box}>
                    <div className={c.field_box}>
                        <input {...register('name')} placeholder='name'/>
                    </div>
                    <div className={c.field_box}>
                        <input {...register('mail')} placeholder='e-mail'/>
                    </div>
                    <div className={c.field_box}>
                        <input {...register('password')} placeholder='password'/>
                    </div>
                    <div className={c.field_box}>
                        <select {...register('role')} >
                            <option value="huskarl" selected>приемщик</option>
                            <option value="yarl">менеджер</option>
                            <option value="konung">админ</option>
                        </select>
                    </div>
                    <div className={c.field_box}>
                        <button className={c.button_form} type='submit'>Добавить</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
