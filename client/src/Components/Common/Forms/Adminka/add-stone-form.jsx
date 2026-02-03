import React, {useEffect} from 'react';
import c from "../form.module.css";
import {useFieldArray, useForm} from "react-hook-form";
import StoneFields from "./stone-fields";
import {stoneBodyBuilder} from "../../../../Utils/adminSupport";

const AddStoneForm = (props) => {
    const rowPattern = [{
        func:props.addFieldToArray,
        arrState:props.formState.form.fieldsArr
    },{
        func:props.addFieldToWork,
        arrState:props.formState.form.fieldsWork
    }]
    const titlePattern = [{
        title:'Слэбы'
    },{
        title:'Блоки'
    }]
    const objPattern = {
        weight:'',
        price:''
    }
    const {register,handleSubmit,reset,control,setValue} = useForm({
        defaultValues:{
            allFields:[
                {
                    name:'slabs',
                    priceList:[]
                },
                {
                    name:'blocks',
                    priceList:[]
                }
            ]
        }
    })

    const {fields} = useFieldArray({
        control,
        name:'allFields'
    })

    useEffect(()=>{
        if(props.formState.form.editStone){
            setValue('name',props.formState.form.editStone.name)
            setValue('country',props.formState.form.editStone.country)
            setValue('color',props.formState.form.editStone.color)
            setValue('ratio',props.formState.form.editStone.ratio)
            setValue('allFields[0].priceList',props.formState.form.editStone.slabs)
            setValue('allFields[1].priceList',props.formState.form.editStone.blocks)
        }else{
            props.clearFormFields(fields,setValue)
        }
    },[props.formState.form.editStone,setValue])

    const addField = (index)=>{
        rowPattern[index].func(objPattern)
        setValue(`allFields[${index}].priceList`,rowPattern[index].arrState)
    }

    let allFields = fields.map((item,i)=>{
        return <div key={i} className={c.table_box_list_bd}>
            <div className={c.title_sec}>
                <div>{titlePattern[i].title}</div>
            </div>
            <StoneFields index={i}
                         control={control}
                         register={register}
                         setValue={setValue}

            />
            <div className={c.add_but_wrap}>
                <div className={c.add_but_slab} onClick={()=>addField(i)}></div>
            </div>

        </div>
    })



    const onSubmit = (body) => {
        if(props.editable){
            body = stoneBodyBuilder(body,props.formState.form.editStone.id)
            props.editStone(body)
        }else{
            body = stoneBodyBuilder(body)
            props.addStone(body)
        }

        reset();
        props.clearFormFields(fields,setValue);
        props.close();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_box_up}>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>название</label>
                        <input {...register('name')} />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>происхождение</label>
                        <input {...register('country')} />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>цвет</label>
                        <input {...register('color')} />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>коэффициент</label>
                        <input {...register('ratio')} />
                    </div>
                </div>
                <div className={c.form_box_down}>
                    {allFields}
                    <div className={c.table_box_list_bd}>
                        <div className={c.form_stone_notation}>
                            При добавлении или исправлении свойств камня
                            в слебах, цены указываются
                            в долларах за квадратный метр, а толщина
                            слеба в сантиметрах.
                            В секции блоков цена указываается в долларах
                            за кубический метр, а в поле толщина буквой указывается сорт
                            типа А, В и тп
                        </div>
                    </div>
                </div>
            </div>
            <div className={c.form_footer}>
                <button className={c.button_form} type='submit'>сохранить</button>
            </div>
        </form>
    );
};

export default AddStoneForm;
