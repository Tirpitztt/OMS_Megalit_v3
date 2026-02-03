import React from 'react';
import c from "../form.module.css";
import {Controller,useFieldArray} from "react-hook-form";

const StoneFields = ({index,control,register,setValue}) => {

    const {fields} = useFieldArray({
        control,
        name:`allFields[${index}].priceList`
    })

    const fieldsArr = fields.map((item,i)=>{
        return <div key={i} className={c.table_row_stone}>
            <input {...register(`allFields[${index}].priceList[${i}].weight`)} placeholder={'толщина'} />
            <Controller render={({field})=><input {...field} placeholder={'цена,USD'}/>}
                        name={`allFields[${index}].priceList[${i}].price`}
                        control={control}
            />
        </div>
    })

    return (
        <div key={index} className={c.table_row_operation}>
            {fieldsArr}
        </div>
    );
};

export default StoneFields;
