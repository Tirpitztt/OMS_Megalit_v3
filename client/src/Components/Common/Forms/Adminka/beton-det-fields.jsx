import React from 'react';
import c from "../form.module.css";
import {Controller, useFieldArray} from "react-hook-form";
import {buildFloat} from "../../../../Utils/buildNum";

const BetonDetFields = ({index,control,register,options,check,setValue}) => {

    const {fields} = useFieldArray({
        control,
        name:`allFields[${index}].complectList`
    })

    const changeValue = (e,i)=>{
        let newValue = (e.target.value).replace(/,/,'.');

        setValue(`allFields[${index}].complectList[${i}].amount`,newValue);
        check()
    }

    const fieldsArr = fields.map((item,i)=>{
        return <div key={i} className={c.table_row_ingred}>
            <select {...register(`allFields[${index}].complectList[${i}].elementID`)}>
                {options[index]}
            </select>
            <Controller render={({field})=><input {...field} onChange={(e)=>changeValue(e,i)} />}
                        name={`allFields[${index}].complectList[${i}].amount`}
                        control={control} />
        </div>
    })
    return (
        <div key={index} className={c.table_row_operation}>
            {fieldsArr}
        </div>
    );
};

export default BetonDetFields;
