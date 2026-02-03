import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import c from "../form.module.css";
import {articulCheck} from "../../../../Utils/support";

const AddGdsForm = (props) => {
    const {register,handleSubmit,
        setValue,watch,
        setError,clearErrors,
        formState:{errors},reset} = useForm()

    const artWatch = watch('articul')

    useEffect(()=>{
        if(props.formState.form.editGds){
            setValue('name',props.formState.form.editGds.name)
            setValue('articul',props.formState.form.editGds.articul)
            setValue('type',props.formState.form.editGds.type)
            setValue('material',props.formState.form.editGds.material)
            setValue('color',props.formState.form.editGds.color)
            setValue('measure',props.formState.form.editGds.measure)
            setValue('height',props.formState.form.editGds.height)
            setValue('width',props.formState.form.editGds.width)
            setValue('weight',props.formState.form.editGds.weight)
            setValue('price',props.formState.form.editGds.price)
            setValue('amount',props.formState.form.editGds.amount)
        }else{
            setValue('name','')
            setValue('articul','')
            setValue('type','')
            setValue('material','')
            setValue('color','')
            setValue('measure','')
            setValue('height','')
            setValue('width','')
            setValue('weight','')
            setValue('price','')
            setValue('amount','')
            props.clearStateFields()
        }
    },[props.formState.form.editGds])

    const artCheck = () => {
        clearErrors();
        articulCheck(artWatch,props.details,setError,props.formState.form.editGds.articul)

    }

    const onSubmit = (body) => {
        if(props.formState.form.editGds){
            props.editGDS(body)
        }else{
            props.addGoods(body)
        }
        props.close()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_group}>
                    <label className={c.label_form}>наименование</label>
                    <input {...register('name')}/>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>артикул</label>
                    <input {...register('articul',{onBlur:artCheck})}/>
                    {errors.articul&&<p className={c.error}>{errors.articul.message}</p> }
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>тип</label>
                    <select {...register('type')}>
                        <option value="лепнина">лепнина</option>
                        <option value="ограждение">ограждение</option>
                        <option value="МАФ">МАФ</option>
                        <option value="скамейка">скамейка</option>
                        <option value="благоустройство">благоустройство</option>
                    </select>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>материал</label>
                    <select {...register('material')}>
                        <option value="полим-бетон">полим-бетон</option>
                        <option value="ковка">ковка</option>
                        <option value="оцинковка">оцинковка</option>
                        <option value="мрамор">мрамор</option>
                        <option value="гранит">гранит</option>
                        <option value="полиэстер">полиэстер</option>
                        <option value="бронза">бронза</option>
                    </select>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>цвет</label>
                    <select {...register('color')}>
                        <option value="белый">белый</option>
                        <option value="черный">черный</option>
                        <option value="бронза">бронза</option>
                        <option value="красный">красный</option>
                        <option value="золото">золото</option>
                        <option value="зеленый">зеленый</option>
                        <option value="патина">патина</option>
                    </select>
                </div>

                <div className={c.form_group}>
                    <label className={c.label_form}>ед изм</label>
                    <select {...register('measure')}>
                        <option value="шт">шт</option>
                        <option value="компл">компл</option>
                    </select>
                </div>
                <div className={c.form_gabarit_sec}>
                    <div className={c.form_group_col_30}>
                        <label className={c.label_form}>выс</label>
                        <input {...register('height')}/>
                    </div>
                    <div className={c.form_group_col_30}>
                        <label className={c.label_form}>шир</label>
                        <input {...register('width')}/>
                    </div>
                    <div className={c.form_group_col_30}>
                        <label className={c.label_form}>толщ</label>
                        <input {...register('weight')}/>
                    </div>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>цена</label>
                    <input {...register('price')}/>
                </div>
                <div className={c.form_group}>
                    <label className={c.label_form}>количество</label>
                    <input {...register('amount')}/>
                </div>
                <div className={c.form_group}>
                    <button className={c.button_form} type='submit'>добавить</button>
                </div>
            </div>
        </form>
    );
};

export default AddGdsForm;
