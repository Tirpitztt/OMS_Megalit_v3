import React, {useState, useEffect } from 'react'
import c from "../form.module.css";
import {useForm } from 'react-hook-form'
import { buildFloat } from '../../../../Utils/buildNum';
import {getSizeSq, getTempCost, getTempCostModel} from '../../../../Utils/support';
import { SIZE_TYPE_FACE, SIZE_TYPE_FACET_AROUND, SIZE_TYPE_FACET_UP, SIZE_TYPE_FACE_AROUND } from '../../../../Utils/variables-const';


const SalaryPolishForm = (props) => {
    const decSq = 100

    const costOfPolish = 22.63
    const costOfFacet = 2.62
    
    const { register, watch, setValue, reset } = useForm()
    const sizeData = watch('sizeData')

    const [detWidth, setDetWidth] = useState(0)
    const [detHeight, setDetHeight] = useState(0)
    const [detWeight, setDetWeight] = useState(0)
    const face = getSizeSq(SIZE_TYPE_FACE, detWidth, detHeight, detWeight)
    const twoFaces = face * 2
    const faceAround = getSizeSq(SIZE_TYPE_FACE_AROUND, detWidth, detHeight, detWeight)
    const facetUp = getSizeSq(SIZE_TYPE_FACET_UP, detWidth, detHeight, detWeight)
    const facetAround = getSizeSq(SIZE_TYPE_FACET_AROUND, detWidth, detHeight, detWeight)
    

    const onChangeCost = (val) => {
        props.setVal(props.cost, val)
        props.setCorrectCost(val)
    }
    useEffect(() => {
        onChangeCost(props.tempCost)
        
    }, [props.tempCost])

    
    const onChangeFaceCheck = (check) => {
        props.setTempCost(getTempCost(check, props.tempCost, costOfPolish,face))
        
    }
    const onChangeTwoFacesCheck = (check) => {
        props.setTempCost(getTempCost(check, props.tempCost, costOfPolish, twoFaces))
        
    }
    const onChangeFaceAroundCheck = (check) => {
        props.setTempCost(getTempCost(check, props.tempCost, costOfPolish, faceAround))
        
    }
    const onChangeFacetUpCheck = (check) => {
        props.setTempCost(getTempCost(check, props.tempCost, costOfFacet, facetUp))
    }
    const onChangeFacetAroundCheck = (check) => {
        props.setTempCost(getTempCost(check, props.tempCost, costOfFacet, facetAround))
    }
    const onChangeModelCheck1 = (check) => {
        props.setTempCost(getTempCostModel(check,props.workOperations,props.tempCost,`Т-${detWeight} Iсл`))
    }
    const onChangeModelCheck2 = (check) => {
        props.setTempCost(getTempCostModel(check,props.workOperations,props.tempCost,`Т-${detWeight} IIсл`))
    }
    const onChangeModelCheck3 = (check) => {
        props.setTempCost(getTempCostModel(check,props.workOperations,props.tempCost,`Т-${detWeight} IIIсл`))
    }
    const onChangeModelCheck4 = (check) => {
        props.setTempCost(getTempCostModel(check,props.workOperations,props.tempCost,`Т-${detWeight} IVсл`))
    }
    
    return (
        <form className={c.support_polish_field_box}>
            <div className={c.row_form_box}>
                <div className={c.col_form_box}>
                    <div className={c.size_row}>
                        <input {...register('sizeData.0.height')} onChange={(e) => setDetHeight(e.target.value)} />
                        X
                        <input {...register('sizeData.1.width')} onChange={(e) => setDetWidth(e.target.value)} />
                        X
                        <input {...register('sizeData.2.weight')} onChange={(e) => setDetWeight(e.target.value)} />
                    </div>
                    <div className={c.col_model_form_box}>
                        <div>Модели:</div>
                        <div className={c.row_model_form_box}>
                            <div><input type='checkbox' onChange={(e)=>onChangeModelCheck1(e.target.checked)} /></div>
                            <div>I сложность</div>
                        </div>
                        <div className={c.row_model_form_box}>
                            <div><input type='checkbox' onChange={(e)=>onChangeModelCheck2(e.target.checked)} /></div>
                            <div>II сложность</div>
                        </div>
                        <div className={c.row_model_form_box}>
                            <div><input type='checkbox' onChange={(e)=>onChangeModelCheck3(e.target.checked)} /></div>
                            <div>III сложность</div>
                        </div>
                        <div className={c.row_model_form_box}>
                            <div><input type='checkbox' onChange={(e)=>onChangeModelCheck4(e.target.checked)} /></div>
                            <div>IV сложность</div>
                        </div>
                    </div>
                </div>
                <div className={c.col_form_box}>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{face}</div>
                        <div>,m2</div>
                        <div>лицо</div>
                        <div><input type='checkbox' onChange={(e) => onChangeFaceCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{twoFaces}</div>
                        <div>,m2</div>
                        <div>2 лица</div>
                        <div><input type='checkbox' onChange={(e) => onChangeTwoFacesCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{faceAround}</div>
                        <div>,m2</div>
                        <div>лица в круг</div>
                        <div><input type='checkbox' onChange={(e) => onChangeFaceAroundCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{facetUp}</div>
                        <div>,м.п.</div>
                        <div>фаска верх</div>
                        <div><input type='checkbox' onChange={(e) => onChangeFacetUpCheck(e.target.checked)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{facetAround}</div>
                        <div>,м.п.</div>
                        <div>фаска в круг</div>
                        <div><input type='checkbox' onChange={(e) => onChangeFacetAroundCheck(e.target.checked)} /></div>
                    </div>
                </div>
            </div>
            <div className={c.row_form_box}>
                {/*<input onChange={(e) => onChangeCost(e.target.value)} />*/}
                {/*<input onChange={(e) => onChangeAmount(e.target.value)} />*/}

            </div>
            <div>
                

            </div>
            
            
            
        </form>

    )
}

export default SalaryPolishForm;