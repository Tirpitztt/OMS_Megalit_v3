import React from 'react';
import c from './handlings.module.css';
import {useForm} from "react-hook-form";
import HandelItem from "./handelItem";

const HandelNew = (props) => {
    let {register,handleSubmit} = useForm();
    let details = <tr><td>no details....</td></tr>
    if(props.state.details.length){
        details = props.state.details.map((item)=>{
            return <HandelItem props={item} />
        })
    }

    const onSubmit=(body)=>{
        props.setHandel(body);
    }

    return (
        <div className={c.handel_box}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={c.form_body}>
                    <div className={c.form_section}>
                        <label>наименование</label>
                        <input {...register('name')} />
                    </div>
                    <div className={c.form_section}>
                        <label>категория</label>
                        <input {...register('category')}/>
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
                        <input {...register('amount')}/>
                    </div>
                    <div className={c.form_section}>
                        <button type='submit'>добавить</button>
                    </div>
                </div>
            </form>
            <table>
                <thead>
                <tr><th>наим</th><th>категория</th><th>размер</th><th>кол</th><th>цена</th><th></th></tr>
                </thead>
                <tbody>
                {details}
                </tbody>
            </table>
        </div>
    );
};

export default HandelNew;