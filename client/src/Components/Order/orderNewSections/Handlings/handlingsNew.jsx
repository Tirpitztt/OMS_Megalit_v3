import React, {useEffect, useState} from 'react';
import c from "../Handlings/handlings.module.css";
import {useForm} from "react-hook-form";
import HandelNew from "./handelNew";


const HandlingsNew = (props) => {
    let {register,handleSubmit,watch} = useForm();


    const changeTextGrav = (e)=>{
        props.setTextGravi(e.target.value);
    }
    return (
        <div className={c.handlings_box}>
                <p>Создать обработку</p>
            <div className={c.hand_title_box}>
                <div className={c.title_up}>
                    <div className={c.title_hydro_box}>
                        <label>Гидрофоб: </label>
                        <input type="checkbox"/>
                    </div>
                    <div className={c.title_text}>
                        <label>Текст для гравировки</label>
                        <textarea className={c.text_grav}
                                  {...register('text_grav',
                                      {onChange:changeTextGrav})}
                                  value={props.state.text_gravi}></textarea>
                    </div>
                </div>
                <HandelNew state={props.state}
                    setHandel={props.setHandel}/>
                <div className={c.title_down}>

                </div>
            </div>

        </div>
    );
};

export default HandlingsNew;