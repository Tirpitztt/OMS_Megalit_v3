import React, {useEffect, useState} from 'react';
import c from './complects.module.css'
import DetailItem from "./detail-item";
import {useForm} from "react-hook-form";
import {useMaterial} from "../../../../Hooks/material.hook";
import {setPrice} from "../../../../Utils/support";

const DetailNew = (props) => {
    let [cost,setCost] = useState(0);
    let [flag,setFlag] = useState(true);
    let {material} = useMaterial();

    let details = <tr><td>'еще нет деталей...'</td></tr>;
    if(props.complect.details.length){
        details = props.complect.details.map((item,i)=>{
            return <DetailItem detail={item} />
        })
    }
    let {register,handleSubmit,watch}=useForm();
    let dataPrice = watch('dataPrice');

    useEffect(()=>{
        setPrice(dataPrice,material,setCost);
      },[JSON.stringify(dataPrice)])

    const priceChange = (e)=>{
        if(flag){
            setCost(e.target.value);
        }
    }

    const onSubmit = (body)=>{
        body.ind = props.ind;
        body.price = cost;
        body.height = dataPrice[1].height;
        body.width = dataPrice[2].width;
        body.weight = dataPrice[3].weight;
        body.material = dataPrice[0].material;
        props.setDetail(body);
        props.changeCrux();
    }

    return (
        <div className={c.details_box}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={c.form_body}>
                    <div className={c.form_section}>
                        <label>название</label>
                        <select {...register('name')}>
                            <option value="стела">стела</option>
                            <option value="подставка">подставка</option>
                            <option value="цветник">цветник</option>
                            <option value="капля">капля</option>
                            <option value="перемычка">перемычка</option>
                            <option value="столбик">столбик</option>
                        </select>
                    </div>
                    <div className={c.form_section}>
                        <label>артикул</label>
                        <input {...register('article')}/>
                    </div>
                    <div className={c.form_section}>
                        <label>материал</label>
                        <select {...register('dataPrice.0.material')}>
                            <option value="gabbro">габбро</option>
                            <option value="beton">бетон</option>
                        </select>
                    </div>
                    <div className={c.form_section}>
                        <label>сорт</label>
                        <select {...register('sort')}>
                            <option value="A">A</option>
                            <option value="B" selected>B</option>
                        </select>
                    </div>
                    <div className={c.form_section}>
                        <label>цена</label>
                        <input {...register('price',{onChange:priceChange})} value={cost} />
                    </div>
                </div>

                <div className={c.form_body}>
                    <div className={c.form_section}>
                        <label>высота</label>
                        <input {...register('dataPrice.1.height')} defaultValue='0'/>
                    </div>
                    <div className={c.form_section}>
                        <label>ширина</label>
                        <input {...register('dataPrice.2.width')} defaultValue='0'/>
                    </div>
                    <div className={c.form_section}>
                        <label>толщина</label>
                        <select {...register('dataPrice.3.weight')}>
                            <option value="t_2">2</option>
                            <option value="t_3">3</option>
                            <option value="t_5">5</option>
                            <option value="t_8">8</option>
                            <option value="t_10">10</option>
                            <option value="t_12">12</option>
                            <option value="t_15">15</option>
                        </select>
                    </div>

                    <div className={c.form_section}>
                        <label>кол-во</label>
                        <input {...register('amount')}/>
                    </div>

                    <div className={c.form_section}><button type='submit'>добавить</button></div>
                </div>

            </form>
            <table>
                <thead>
                <tr><th>наим</th><th>арт</th><th>мат</th><th>р-р</th><th>кол</th><th>цена</th><th>сорт</th><th></th></tr>
                </thead>
                <tbody>
                {details}
                </tbody>
            </table>
        </div>
    );
};

export default DetailNew;