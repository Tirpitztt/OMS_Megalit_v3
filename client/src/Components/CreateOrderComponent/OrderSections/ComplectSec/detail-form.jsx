import React, {useEffect, useState} from 'react';
import c from './../sections.module.css'
import {useMatState, useOwnState} from "../../../../Hooks/material.hook";
import {useForm} from "react-hook-form";
import {
    getDetailId,
    getDetailOfArticul,
    setStonePrice,
    setWeightOptions
} from "../../../../Utils/support";
import {buildFloat} from "../../../../Utils/buildNum";
import {nameSort} from "../../../../Utils/nameSort";
import Detail from '../../../../Utils/Classes/detail'

const DetailForm = (props) => {
    let articulList = []
    if(props.articulList){
        articulList = props.articulList  // убирает проблему длинны массива при первом рендере
    }
    let [flag,setFlag] = useState(true);
    let [betDetCost,setBetDetCost] = useState(0);
    let [detailId, setDetailId] = useState(0);
    const [stoneName,setStoneName] = useState('no-name')
    const [optionsWeight,setOptionsWeight] = useState(<option value='0'>no data</option>)
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState();  //убрать костыль
    const {allState} = useOwnState();
    let {register,handleSubmit,setValue,watch,reset} = useForm();
    let dataPrice = watch('dataPrice');
    let options = 'no data';

    if(stone){
        options = stone.map((item,i)=>{
            return <option key={i} value={item.id}>{item.name}</option>;
        })
    }

    useEffect(()=>{
        setStonePrice(dataPrice,stone,setValue,'price',betDetCost);
        },[JSON.stringify(dataPrice)]);

    const selectArticul = (element)=>{
        const detail = getDetailOfArticul(allState,element)

        setValue('name',element.name)
        setValue('article',element.articul)
        setStoneName(detail.material)
        setValue('dataPrice.3.weight',element.weight)
        setValue('dataPrice.2.width',element.width)
        setValue('dataPrice.1.height',element.height)
        setValue('price',detail.price)
        setBetDetCost(buildFloat(detail.price))
        props.setActiveDetail(element)
        props.setArticulList([]);
    }
    const setArticulSortList = (e) => {
        props.setArticulList([]);
        let substr = e.target.value;
        let res = nameSort([...allState.betonDetails,...allState.gds],substr,'articul')
        let resultArray = res.map(item => {
            return <div key={item.id}
                        className={c.drop_list}
                        onClick={()=>selectArticul(item)} >
                <p>{item.articul}</p>
            </div>
        })
        props.setArticulList(resultArray);

    }
    const materialChange = (e) => {
        setWeightOptions(stone,e.target.value,setOptionsWeight,setStoneName)
    }

    const priceChange = (e)=>{
        if(flag){
            setValue('price',e.target.value);
        }
    }

    const onSubmit = (body)=>{

        body.complectId = props.number;
        body.id = detailId;
        body.price = buildFloat(body.price);
        body.sort = 'B';
        body.local='sklad';
        body.status = 'no';
        body.height = dataPrice[1].height||0;
        body.width = dataPrice[2].width||0;
        body.weight = dataPrice[3].weight;
        body.material = stoneName;
        body.amount = buildFloat(body.amount);
        body.rate = buildFloat(rate[0].USD)
        // const detail = new Detail() // добавить когда перейдем на классы
        // detail.setDetail(body)
        props.setDetail(body);
        props.changeCrux();
        reset();
        props.setActiveDetail({})
        setBetDetCost(0)
        setStoneName('no-name')
        setValue('price',0)
    }


    return (
        <form className={c.form_main} onSubmit={handleSubmit(onSubmit)}>
            <p className={c.form_title_into}>Добавить деталь</p>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>наименование</label>
                    <select {...register('name')}>
                        {props.nameList}
                    </select>
                </div>
                <div className={c.form_section}>
                    <label>артикул</label>
                    <input {...register('article',{onChange:setArticulSortList})}/>
                    {/*//список сортированных артикулов*/}
                    {articulList.length?<div className={c.list_block}>{props.articulList}</div>:null}
                </div>
                <div className={c.form_section}>
                    <label>материал</label>
                    <select {...register('dataPrice.0.material',
                        {onChange:(e)=>materialChange(e)})}>
                        <option value='none'>выбери название</option>
                        {options}
                    </select>
                </div>
            </div>
            <fieldset className={c.form_section}>
                <legend>габариты,см</legend>
                <label>толщ</label>
                <select {...register('dataPrice.3.weight')}>
                    {optionsWeight}
                </select>
                <label>выс</label>
                <input {...register('dataPrice.1.height')}/>
                <label>шир</label>
                <input {...register('dataPrice.2.width')}/>
            </fieldset>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>цена</label>
                    <input {...register('price',{onChange:priceChange})}/>
                </div>
                <div className={c.form_section}>
                    <label>количество</label>
                    <input {...register('amount')} defaultValue='1'/>
                </div>
                {/*<div className={isErr?c.activeErr:c.hide}><p>Запятую НЕЛЬЗЯ!</p></div>*/}
            </div>
            <div className={c.form_body}>
                <button className={c.add_button}
                        disabled={props.dis}
                        onClick={()=>setDetailId(getDetailId())}
                        type='submit'>добавить</button>
            </div>

        </form>
    );
};

export default DetailForm;
