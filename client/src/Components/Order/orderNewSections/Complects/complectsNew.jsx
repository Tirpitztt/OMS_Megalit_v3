import React, {useEffect, useState} from 'react';
import c from './complects.module.css';
import {useForm} from "react-hook-form";
import DetailNew from "./detailNew";

const ComplectsNew = (props) => {
    let {register,handleSubmit} = useForm();
    let complects = 'нет комплектов...';
    if(props.state.length){
        complects = props.state.map((item,i)=>{
            return <div className={c.complects_box}>
                        <div className={c.title_compl}>
                            <p key={i}>Комплект <i>{item.type}</i></p>
                            <div className={c.del_compl_but}><p><span>X</span>  удалить</p></div>
                        </div>

                       <DetailNew complect={item} ind={i}
                                  setDetail={props.setDetail}
                                  changeCrux={props.changeCrux}/>
                   </div>
        });
    }

    const onSubmit=(body)=>{
        body.details=[];
        props.setComplect(body);
    }
    return (
            <div className={c.compl_box}>
                <p>Создать комплектацию</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={c.form_body}>
                        <label>выбери тип комплекта: </label>
                        <select {...register('type')}>
                            <option value="памятник">памятник</option>
                            <option value="ограда">ограда</option>
                            <option value="магазин">магазин</option>
                        </select>
                        <button type='submit'>добавить комплект</button>
                    </div>
                </form>
                {complects}
            </div>

    );
};

export default ComplectsNew;