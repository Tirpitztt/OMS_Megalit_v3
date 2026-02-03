import React, {useEffect, useState} from 'react';
import c from './complect-fom.module.css'
import {useForm} from "react-hook-form";
import {useMatState} from "../../../../Hooks/material.hook";
import {getBetonMixPrice, setDetailPrice, setMixName, setStonePrice} from "../../../../Utils/support";
import {nameSort} from "../../../../Utils/nameSort";
import {buildFloat} from "../../../../Utils/buildNum";


const DetailSecForm = (props) => {
    let detailList = [...props.detailList]
    const [matName,setMatName] = useState('не определено')

    let [betDetCost,setBetDetCost] = useState(0);
    let [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    let matOptions = [<option key={8}>primer</option>]
    if(stone){
        matOptions = stone.map((item,i)=>{
            return <option key={i}  value={item.id}>{item.name}</option>
        })
    }
    const {register,setValue,watch,reset} = useForm();
    let detail = watch('detail')
    let priceAmount = watch('price')

    useEffect(()=>{
        setStonePrice(detail,stone,setValue,'price.0.price',betDetCost)
    },[JSON.stringify(detail)])

    const selectArticul = (id) => {
        betonDetails.forEach(function(item){
            if(item.id === id){
                let betMixWithPrice = getBetonMixPrice(betonMix,materials);
                let mixName = setMixName(item.betmixID,betonMix);
                let data = setDetailPrice(item,betMixWithPrice,materials,workOperations)
                let priceUSD = data.price/rate[0].USD;

                setValue('detail.4.name',item.name);
                setValue('detail.5.articul',item.articul)
                //setValue('detail.0.material',mixName)
                setMatName(mixName)
                setValue('detail.1.height',item.height)
                setValue('detail.2.width',item.width)
                setValue('detail.3.weight',item.weight)
                setValue('price.0.price',priceUSD.toFixed(2))
                setBetDetCost(priceUSD)
            }
        })
        props.setArticulList([])
    }
    const setArticulSortList = (e) => {
        props.setArticulList([]);
        let substr = e.target.value;
        let res = nameSort(betonDetails,substr,'articul')
        let resultArr = res.map((item,i)=>{
            return <div key={i}
                        onClick={()=>selectArticul(item.id)}
                        className={c.drop_list}
                        value={item.id}>
                <p>{item.articul}</p>
            </div>
        })
        props.setArticulList(resultArr)
    }
    const matNameChange = (e) => {
        stone.forEach((item)=>{
            if(item.id == e.target.value){
                setMatName(item.name)
            }
        })
    }
    const priceChange = (e) => {
        setValue('price.0.price',e.target.value)
    }
    const detailCreate = ()=>{
        let body = {
            name : detail[4].name,
            articul : detail[5].articul,
            type:'ss',
            sort:'B',
            material : matName,
            status:'ss',
            local:'ss',
            height : buildFloat(detail[1].height),
            width : buildFloat(detail[2].width),
            weight : buildFloat(detail[3].weight),
            price : buildFloat(priceAmount[0].price),
            amount : buildFloat(priceAmount[1].amount),
            rate : buildFloat(rate[0].USD)
        };
        detailList.push(body)
        props.addDetail(detailList)
        reset()
        setBetDetCost(0)
        setMatName('no-name')
        setValue('price.0.price',0)
    }

    return (
        <div >
            <div className={c.detail_sec_row}>
                <div className={c.form_box_col}>
                    <label>наименование</label>
                    <select {...register('detail.4.name')} >{props.complectType}</select>
                </div>
                <div className={c.form_box_col}>
                    <label>артикул</label>
                    <input {...register('detail.5.articul',{onChange:setArticulSortList})}  />
                </div>
                <div className={c.form_box_col}>
                    <label>материал</label>
                    <select {...register('detail.0.material',{
                        onChange:(e)=>matNameChange(e)})}>
                        <option value="0">no-name</option>
                        {matOptions}
                    </select>
                </div>
                <div className={c.form_box_col}>
                    <label >выс</label>
                    <input {...register('detail.1.height')} />
                </div>
                <div className={c.form_box_col}>
                    <label>шир</label>
                    <input {...register('detail.2.width')}/>
                </div>
                <div className={c.form_box_col}>
                    <label>толщ</label>
                    <input {...register('detail.3.weight')}/>
                </div>
                <div className={c.form_box_col}>
                    <label>цена</label>
                    <input {...register('price.0.price',{
                        onChange:(e)=>priceChange(e)
                    })} />
                </div>
                <div className={c.form_box_col}>
                    <label>кол</label>
                    <input {...register('price.1.amount')}/>
                </div>
                <div className={c.form_box_col}>
                    <div onClick={detailCreate}
                         className={c.add_button_det}>добавить</div>
                </div>
            </div>
            <div className={props.articulList.length?c.list_block:c.hidden}>
                {props.articulList}
            </div>
        </div>

    );
};

export default DetailSecForm;
