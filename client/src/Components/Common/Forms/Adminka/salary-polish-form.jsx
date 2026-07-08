import React, {useState, useEffect } from 'react'
import c from "../form.module.css";
import {useForm } from 'react-hook-form'


const SalaryPolishForm = (props) => {
    const decSq = 100
    const decV = 10000
    const costOfPolish = 22.63
    
    const { register, watch, setValue, reset } = useForm()
    const sizeData = watch('sizeData')
    const [detailData,setDetailData] =useState([])
    const [detWidth, setDetWidth] = useState(0)
    const [detHeight, setDetHeight] = useState(0)
    const [detWeight, setDetWeight] = useState(0)
    const face = ((detHeight / decSq) * (detWidth / decSq))
    const twoFaces = face * 2
    const V = ((detHeight / decSq) * (detWidth / decSq) * (detWeight / decSq)) 
    const onChangeCost = (val) => {
        props.setVal(props.cost, val)
        props.setCorrectCost(val)
    }
    useEffect(() => {
        onChangeCost(props.tempCost)
        console.log(props.tempCost)
    }, [props.tempCost])

    const onChangeAmount = (val) => {
        props.setVal(props.amount, val)
        props.setAmount(val)
    }
    const onChangeFaceCheck = (check) => {
        if (check) {
            
            props.setTempCost((props.tempCost + (costOfPolish * face)).toFixed(2))
        } else {
            props.setTempCost((props.tempCost - (costOfPolish * face)).toFixed(2))
        }
    }
    const onChangeTwoFacesCheck = (check) => {
        if (check) {
            
            props.setTempCost((props.tempCost + (costOfPolish * twoFaces)).toFixed(2))
        } else {
            props.setTempCost((props.tempCost - (costOfPolish * twoFaces)).toFixed(2))
        }
    }

    return (
        <form className={c.support_polish_field_box}>
            <div className={c.row_form_box}>
                <div className={c.col_form_box}>
                    <div className={c.size_row}>
                        <input {...register('sizeData.0.width')} onChange={(e) => setDetWidth(e.target.value)} />
                        X
                        <input {...register('sizeData.1.height')} onChange={(e) => setDetHeight(e.target.value)} />
                        X
                        <input {...register('sizeData.2.weight')} onChange={(e) => setDetWeight(e.target.value)} />
                    </div>
                    <div className={c.row_form_box}>
                        
                    </div>
                </div>
                <div className={c.col_form_box}>
                    <div className={c.row_form_box}>
                        <div>{face}</div>
                        <div>,m2</div>
                        <div>лицо</div>
                        <div><input type='checkbox' onChange={(e) => onChangeFaceCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_form_box}>
                        <div>{twoFaces}</div>
                        <div>,m2</div>
                        <div>2 лица</div>
                        <div><input type='checkbox' onChange={(e) => onChangeTwoFacesCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_form_box}>
                        <div>{V}</div>
                    </div>
                </div>
            </div>
            <div className={c.row_form_box}>
                <input onChange={(e) => onChangeCost(e.target.value)} />
                <input onChange={(e) => onChangeAmount(e.target.value)} />

            </div>







            <div>
                

            </div>
            
            
            
        </form>

    )
}

export default SalaryPolishForm;