import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import c from './form.module.css'

const AddArticleForm = (props) => {

    const {register,handleSubmit,setValue,reset} = useForm()
    let artID = 'hui';
    if(props.editArt.length){
        artID = props.editArt[0].id;
        setValue('title',props.editArt[0].title);
        setValue('text',props.editArt[0].text);
    }



    const onSubmit = (body)=>{
        body.id = artID;
        body.author = props.userName
        body.status = 'standart'
        body.likes = 1
        if(artID === 'hui'){
            props.addArticle(body)
        }else{
            props.editArticle(body)
            props.setEditArticle([])
        }

        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={c.art_form}>
            <div className={c.form_box_art}>
                <label className={c.art_label}>Заголовок</label>
                <input {...register('title')} className={c.input_art} />
            </div>
            <div className={c.form_box_art}>
                <label className={c.art_label}>Текст</label>
                <textarea className={c.text_arr_art} {...register('text')}></textarea>
            </div>
            <div className={c.form_footer}>
                <button type='submit'>добавить</button>
            </div>
        </form>
    );
};

export default AddArticleForm;
