import React from 'react';
import {useForm} from "react-hook-form";

const FormMontaz = (props) => {

    let {register,handleSubmit} = useForm();
    const onSubmit = (body)=>{
        props.setMont(body);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>длина</label>
                <input {...register('height')}/>
            </div>
            <div>
                <label>ширина</label>
                <input {...register('width')}/>
            </div>
            <div>
                <label>высота</label>
                <input {...register('weight')}/>
            </div>
            <div>
                <label>доставка</label>
                <input {...register('delivery')}/>
            </div>
            <button type='submit'>добавить</button>
        </form>
    );
};

export default FormMontaz;