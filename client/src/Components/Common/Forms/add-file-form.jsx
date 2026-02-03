import React from 'react';
import {useForm} from "react-hook-form";
import c from './form.module.css'

const AddFileForm = ({addFile,orderId}) => {
    const {register,handleSubmit,reset} = useForm()

    const onChangeFile = (e) => {
        //console.log(e.target.file)
    }
    const onSubmit = (body) => {
        let data = {
            orderId:orderId,
            path:'megalit/contures/Added',
            fd:null
        }
        const formData = new FormData()
        formData.append('files',body.file[0])
        body = {...body,file:body.file[0].name,path:data.path}
        formData.append("recipe", JSON.stringify(body))
        data.fd = formData
        addFile(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={c.art_form}>
            <div className={c.title_sec_art}>
                <div className={c.title}>
                    Добавить файл
                </div>
            </div>
            <div className={c.form_box_art}>
                <input type='file' {...register('file',{onChange:(e)=>onChangeFile(e)})} />
                <input type='submit'/>
            </div>
        </form>
    );
};

export default AddFileForm;
