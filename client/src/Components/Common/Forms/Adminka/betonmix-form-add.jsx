import React from 'react';
import {useForm, useFieldArray,Controller} from 'react-hook-form'
import c from '../form.module.css'
import AddMatButton from "../../../UI/Buttons/add-mat-button";
import {buildFloat} from "../../../../Utils/buildNum";

const BetonmixFormAdd = (props) => {

    let options = props.state.matOptions;

    const {register,handleSubmit,control,setValue,reset} = useForm({
        defaultValues:{
            ingredients:props.formState.form.fieldsArr
        }
    })

    const {fields} = useFieldArray({
        control,
        name:'ingredients'
    })
    const addField = ()=>{
        props.addFieldToArr({
            id:0,
            amount:0,
            betonMixId:props.formState.form.editElement.id,
            materialId:0,
            name:''
        })
        setValue('ingredients',props.formState.form.fieldsArr);
    }
    let ingredientsList = fields.map((item,i)=>{
        return <div key={i} className={c.table_row_ingred}>
            <select {...register(`ingredients.${i}.materialId`,{})} defaultValue='1' >
                <option defaultValue={item.name}>{item.name}</option>
                {options}
            </select>
            <Controller render={({field})=> <input {...field} />}
                        name={`ingredients.${i}.amount`}
                        control={control}/>
        </div>
    })

    const onSubmit = (body) => {

        body.ingredients.forEach(function(item){
            item.amount = buildFloat(item.amount)
            item.materialId = buildFloat(item.materialId)
        })
        let ingredientsRes = body.ingredients.filter((item)=>item.amount!==0)
        body.ingredients = [...ingredientsRes];
        props.addBetonMix(body)
        reset();
        props.close();

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_box_up}>
                    <div className={c.form_group_col}>
                        <label className={c.label_form}>артикул</label>
                        <input {...register('articul')} />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form}>описание</label>
                        <input {...register('notation')}  />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form}>ед.изм</label>
                        <input {...register('measure')}   />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form}>цена</label>
                        <input {...register('price')}  />
                    </div>
                    <AddMatButton add={addField}  />
                </div>
                <div className={c.form_box_down}>
                    <div className={c.table_box_list}>
                        {ingredientsList}
                    </div>
                    <div className={c.form_notation}>
                        <p>При добавлении материалов следует учитывать количество материала на кубометр бетона.
                        Для этого нужно количество материала на один замес в бетономешалке <strong>умножить на 3.6.</strong>
                            Бетон для деталей плитки, бордюров и пр <strong>умножать на 4.6</strong></p>
                        <p>Так же при указании количества материала следует учитывать единицы измерения материала в тоннах, в килограммах и тд</p>
                        <p>*Строки с нулевым количеством не сохраняются</p>
                    </div>
                </div>
            </div>
            <button className={c.button_form} type='submit'>сохранить</button>
        </form>
    );
};

export default BetonmixFormAdd;
