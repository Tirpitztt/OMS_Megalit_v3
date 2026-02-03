import React, {useEffect} from 'react';
import c from "../form.module.css";
import {useForm,useFieldArray,Controller} from "react-hook-form";
import BetonDetFields from "./beton-det-fields";
import {articulCheck, setSumDet} from "../../../../Utils/support";

const AddBetonDetailForm = (props) => {

    const rowPattern = [{
        func:props.addFieldToArr,
        arrState:props.formState.form.fieldsArr
    },{
        func:props.addFieldToWork,
        arrState: props.formState.form.fieldsWork
    }]
    const objPattern = {
        id:0,
        elementID:0,
        amount:''
    }
    const titlePattern = [{
        title:'Дополнительный материал'
    },{
        title:'Затраты на изготовление'
    }]


    let options = [props.state.matOptions,props.state.workOptions];
    let optionsMix = props.state.mixOptions;

    const {register,handleSubmit,control,setValue,
        watch,reset,setError,clearErrors,formState:{errors}} = useForm({
        defaultValues:{
            allFields:[
                {
                    name:'materials',
                    complectList:props.formState.form.fieldsArr
                },
                {
                    name:'operations',
                    complectList:props.formState.form.fieldsWork
                }
            ],
        }
    })

    let dataDet = watch('dataDet');
    let artWatch = watch('articul');

    const {fields,remove} = useFieldArray({
        control,
        name:'allFields'
    })
    //console.log('fields:',fields)
    let allFieldsWatch = watch('allFields')

    const check = ()=>{
        let data = {
            dataArr:allFieldsWatch,
            dataNumbers:dataDet
        }
        let result = setSumDet(data,props.state.materials,props.state.beton.beton_mixes,props.state.workOperations);

        setValue('V',result.Vdet);
        setValue('S',result.Sdet);
        setValue('mat_cost',result.sumMat);
        setValue('work_cost',result.sumWork);
        setValue('all_added_cost',result.sumMarkup);
        setValue('cost',result.priceDet)

    }

    const clearFields = () => {
        fields.forEach(function(item,i){
            item.complectList = [];
            setValue(`allFields[${i}].complectList`,[]);
        })
    }

    useEffect(()=>{
        if(props.formState.form.editDetail){
            setValue('name',props.formState.form.editDetail.name)
            setValue('articul',props.formState.form.editDetail.articul)
            setValue('dataDet.0.height', props.formState.form.editDetail.height)
            setValue('dataDet.1.width',props.formState.form.editDetail.width)
            setValue('dataDet.2.weight',props.formState.form.editDetail.weight)
            setValue('dataDet.3.mixID',props.formState.form.editDetail.betMixID)
            setValue('dataDet.4.markup',props.formState.form.editDetail.markup)
            setValue('dataDet.5.added_cost',props.formState.form.editDetail.added_cost)
            setValue('allFields[0].complectList',props.formState.form.fieldsArr)
            setValue('allFields[1].complectList',props.formState.form.fieldsWork)
            check();
        }else{
            //clearFields();
            setValue('name','')
            setValue('articul','')
            setValue('dataDet.0.height', '')
            setValue('dataDet.1.width','')
            setValue('dataDet.2.weight','')
            setValue('dataDet.3.mixID','')
            setValue('dataDet.4.markup','')
            setValue('dataDet.5.added_cost','')
            setValue('allFields[0].complectList',[])
            setValue('allFields[1].complectList',[])
            check();
        }

    },[props.formState.form.editDetail,props.formState.form.fieldsArr,props.formState.form.fieldsWork])
    const checkMix = (e)=>{
        setValue('dataDet.3.mixID',e.target.value)
        check();
    }
    const addField = (index)=>{
        rowPattern[index].func(objPattern)
        setValue(`allFields[${index}].complectList`,rowPattern[index].arrState)
    }

    let allFields = fields.map((item,i)=>{
        return <div key={i} className={c.table_box_list_bd}>
            <div className={c.title_sec}>
                <div>{titlePattern[i].title}</div>
                <div className={c.add_but_sec} onClick={()=>addField(i)}>доб</div>
            </div>
            <BetonDetFields index={i}
                            control={control}
                            register={register}
                            check={check}
                            setValue={setValue}
                            options={options} />
        </div>
    })
    const artCheck = ()=>{
        clearErrors();
        articulCheck(artWatch,props.adminState.details,setError,props.formState.form.editDetail.articul)
    }

    const onSubmit = (body) =>{
        if(props.formState.form.editDetail){
            body.id = props.formState.form.editDetail.id
            props.updateBetonDetail(body)
        }else{
            if(body.dataDet[5].added_cost===''){
                body.dataDet[5].added_cost = 0;
            }
            if(body.dataDet[4].markup===''){
                body.dataDet[4].markup = 0;
            }
            body.category = 'beton'
            //console.log('body:',body)
            props.addBetonDetail(body)
        }
        reset();
        clearFields();
        props.close();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.form_box_mat}>
                <div className={c.form_box_up}>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>категория</label>
                        <select {...register('name')}>
                            {props.categoryOptions}
                        </select>
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>артикул</label>
                        <input {...register('articul',{onBlur:artCheck}) } />
                        {errors.articul&&<p className={c.error}>{errors.articul.message}</p>}
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>бет смесь</label>
                        <select {...register('dataDet.3.mixID',
                            {onChange:(e)=>checkMix(e)})} >
                            <option key={'100'} >выбор смеси</option>
                            {optionsMix}
                        </select>
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>наценка,%</label>
                        <input {...register('dataDet.4.markup')}  />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>доб стоимость,руб</label>
                        <input {...register('dataDet.5.added_cost')}  />
                    </div>
                </div>
                <div className={c.form_box_up}>
                    <div className={c.form_group_col}>
                        <div className={c.form_gabarit_sec}>
                            <div className={c.form_group_col}>
                                <label className={c.label_form_col}>высота</label>
                                <input {...register('dataDet.0.height',{onBlur:check})} />
                            </div>
                            <div className={c.form_group_col}>
                                <label className={c.label_form_col}>ширина</label>
                                <input {...register('dataDet.1.width',{onBlur:check})}  />
                            </div>
                            <div className={c.form_group_col}>
                                <label className={c.label_form_col}>толщина</label>
                                <input {...register('dataDet.2.weight',{onBlur:check})}  />
                            </div>
                        </div>
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>V,м3</label>
                        <input {...register('V')} disabled />
                    </div>
                    <div className={c.form_group_col}>
                        <label className={c.label_form_col}>S,м2</label>
                        <input {...register('S')} disabled />
                    </div>
                </div>
                <div className={c.form_box_down}>
                    {allFields}
                    <div className={c.table_box_list_bd}>
                        <div className={c.form_group}>
                            <label className={c.label_form}>материалы</label>
                            <input {...register('mat_cost')} disabled />
                        </div>
                        <div className={c.form_group}>
                            <label className={c.label_form}>работа</label>
                            <input {...register('work_cost')} disabled />
                        </div>
                        <div className={c.form_group}>
                            <label className={c.label_form}>наценки</label>
                            <input {...register('all_added_cost')} disabled />
                        </div>
                    </div>
                </div>
            </div>
            <div className={c.form_footer}>
                <button className={c.button_form} type='submit'>сохранить</button>
                <div className={c.form_group_footer}>
                    <label className={c.label_form}>Стоимость:</label>
                    <input {...register('cost')} />
                </div>
            </div>

        </form>
    );
}

export default AddBetonDetailForm;
