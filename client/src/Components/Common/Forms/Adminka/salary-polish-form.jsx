import React, {useState, useEffect } from 'react'
import c from "../form.module.css";
import {useForm } from 'react-hook-form'
import { buildFloat } from '../../../../Utils/buildNum';
import {getSizeSq, getTempCost, getTempCostModel} from '../../../../Utils/support';
import {
    SIZE_TYPE_FACE,
    SIZE_TYPE_FACET_AROUND,
    SIZE_TYPE_FACET_UP,
    SIZE_TYPE_FACE_AROUND,
    HEIGHT, WIDTH, WEIGHT, TYPE_MODEL_ONE, TYPE_MODEL_TWO, TYPE_MODEL_THREE, TYPE_MODEL_FOUR, SIZE_TYPE_TWO_FACES,
    PROCESS_TYPE_FACE, PROCESS_TYPE_FACET_AROUND, PROCESS_TYPE_FACET_UP, PROCESS_TYPE_FACE_AROUND,
    PROCESS_TYPE_TWO_FACES, OPERATION_POLISH_FACE, OPERATION_POLISH_FACET, PROCESS_TYPE_SIDE_AROUND, OPERATION_POLISH_SIDE, OPERATION_POLISH_AROUND, PROCESS_TYPE_DETAIL_AROUND
} from '../../../../Utils/variables-const';


const SalaryPolishForm = (props) => {
   // console.log('polish',props.tempCost)
    const decSq = 100


    const costOfPolish = 22.63
    const costOfFacet = 2.62
    
    // const { register, watch, setValue, reset } = useForm()
    // const sizeData = watch('sizeData')

    const [detWidth, setDetWidth] = useState(0)
    const [detHeight, setDetHeight] = useState(0)
    const [detWeight, setDetWeight] = useState(0)
    //const face = getSizeSq(SIZE_TYPE_FACE, detWidth, detHeight, detWeight)
    // const twoFaces = face * 2
    // const faceAround = getSizeSq(SIZE_TYPE_FACE_AROUND, detWidth, detHeight, detWeight)
    // const facetUp = getSizeSq(SIZE_TYPE_FACET_UP, detWidth, detHeight, detWeight)
    // const facetAround = getSizeSq(SIZE_TYPE_FACET_AROUND, detWidth, detHeight, detWeight)
    

    const onChangeCost = (val) => {
        props.setVal(props.cost, val.toFixed(2))
        //props.setCorrectCost(val.toFixed(2))
    }
    useEffect(() => {
        onChangeCost(props.tempCost)
        
    }, [props.tempCost])

    const onChangeSize = (type,val) => {
        if(type === HEIGHT){
            setDetHeight(val)
        }else if(type === WIDTH){
            setDetWidth(val)
        }else if(type === WEIGHT){
            setDetWeight(val)
        }
        props.sizeDetailChange({type,val})
    }
    // const onChangeFaceCheck = (check) => {
    //     props.setTempCost(getTempCost(check, props.tempCost, costOfPolish,face))
    //
    // }
    // const onChangeTwoFacesCheck = (check) => {
    //     props.setTempCost(getTempCost(check, props.tempCost, costOfPolish, twoFaces))
    //
    // }
    // const onChangeFaceAroundCheck = (check) => {
    //     props.setTempCost(getTempCost(check, props.tempCost, costOfPolish, faceAround))
    //
    // }
    // const onChangeFacetUpCheck = (check) => {
    //     props.setTempCost(getTempCost(check, props.tempCost, costOfFacet, facetUp))
    // }
    // const onChangeFacetAroundCheck = (check) => {
    //     props.setTempCost(getTempCost(check, props.tempCost, costOfFacet, facetAround))
    // }

    //const onChangeModelCheck = (check,key,type) => {
    //    const recCost = getTempCostModel(check, props.workOperations, props.tempCost, key)
    //    props.setTempCost(recCost)
    //    props.setPolishModelValue({type,value:check})
    //}
    const onChangeProcessingGroup = (check,type,operationType) => {
        props.setProcessingChange({val:check,type,operationType,operations:props.workOperations})
    }

    // const onChangeModelCheck1 = (check) => {
    //     props.setTempCost(getTempCostModel(check, props.workOperations, props.tempCost, `Т-${detWeight} Iсл`))
    //     props.setPolishModelValue({type:'one',value:check})
    // }
    // const onChangeModelCheck2 = (check) => {
    //     props.setTempCost(getTempCostModel(check, props.workOperations, props.tempCost, `Т-${detWeight} IIсл`))
    //     props.setPolishModelValue({ type: 'two', value: check })
    // }
    // const onChangeModelCheck3 = (check) => {
    //     props.setTempCost(getTempCostModel(check, props.workOperations, props.tempCost, `Т-${detWeight} IIIсл`))
    //     props.setPolishModelValue({ type: 'three', value: check })
    // }
    // const onChangeModelCheck4 = (check) => {
    //     props.setTempCost(getTempCostModel(check, props.workOperations, props.tempCost, `Т-${detWeight} IVсл`))
    //     props.setPolishModelValue({ type: 'four', value: check })
    // }
    
    return (
        <form className={c.support_polish_field_box}>
            <div className={c.row_form_box}>
                <div className={c.col_form_box}>
                    <div className={c.size_row}>
                        <input onChange={(e) => onChangeSize(HEIGHT,e.target.value)}
                                value={props.polishFormState.h}
                        />
                        X
                        <input onChange={(e) => onChangeSize(WIDTH,e.target.value)}
                               value={props.polishFormState.w}
                        />
                        X
                        <input onChange={(e) => onChangeSize(WEIGHT,e.target.value)}
                               value={props.polishFormState.l}
                        />
                    </div>
                    <div className={c.col_model_form_box}>
                        <div className={c.row_polish_form_box}>
                            <div>=</div>
                            <div>{props.polishFormState.sizes.sideAround}</div>
                            <div>,м.п.</div>
                            <div>торцы в круг</div>
                            <div><input type='checkbox'
                                checked={props.polishFormState.processing.sideAround}
                                onChange={(e) => onChangeProcessingGroup(e.target.checked, PROCESS_TYPE_SIDE_AROUND, OPERATION_POLISH_SIDE)} /></div>
                        </div>
                        <div className={c.row_polish_form_box}>
                            <div>=</div>
                            <div>{props.polishFormState.sizes.faceAround}</div>
                            <div>,m2</div>
                            <div>деталь в круг</div>
                            <div><input type='checkbox'
                                checked={props.polishFormState.processing.detailAround}
                                onChange={(e) => onChangeProcessingGroup(e.target.checked, PROCESS_TYPE_DETAIL_AROUND, OPERATION_POLISH_AROUND)} /></div>
                        </div>
                        {/*<div>Модели:</div>*/}
                        {/*<div className={c.row_model_form_box}>*/}
                        {/*    <div><input type='checkbox'*/}
                        {/*                onChange={(e) => onChangeModelCheck(e.target.checked, `Т-${detWeight} Iсл`,TYPE_MODEL_ONE)}*/}
                        {/*                checked={props.polishFormState.modelValue.one} /></div>*/}
                        {/*    <div>I сложность</div>*/}
                        {/*</div>*/}
                        {/*<div className={c.row_model_form_box}>*/}
                        {/*    <div><input type='checkbox'*/}
                        {/*                onChange={(e) => onChangeModelCheck(e.target.checked,`Т-${detWeight} IIсл`,TYPE_MODEL_TWO)}*/}
                        {/*                checked={props.polishFormState.modelValue.two} /></div>*/}
                        {/*    <div>II сложность</div>*/}
                        {/*</div>*/}
                        {/*<div className={c.row_model_form_box}>*/}
                        {/*    <div><input type='checkbox'*/}
                        {/*                onChange={(e) => onChangeModelCheck(e.target.checked,`Т-${detWeight} IIIсл`,TYPE_MODEL_THREE)}*/}
                        {/*                checked={props.polishFormState.modelValue.three} /></div>*/}
                        {/*    <div>III сложность</div>*/}
                        {/*</div>*/}
                        {/*<div className={c.row_model_form_box}>*/}
                        {/*    <div><input type='checkbox'*/}
                        {/*                onChange={(e) => onChangeModelCheck(e.target.checked,`Т-${detWeight} IVсл`,TYPE_MODEL_FOUR)}*/}
                        {/*                checked={props.polishFormState.modelValue.four} /></div>*/}
                        {/*    <div>IV сложность</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={c.col_form_box}>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{props.polishFormState.sizes.face}</div>
                        <div>,m2</div>
                        <div>лицо</div>
                        <div><input type='checkbox'
                                    checked={props.polishFormState.processing.face}
                                    onChange={(e) => onChangeProcessingGroup(e.target.checked,PROCESS_TYPE_FACE,OPERATION_POLISH_FACE)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{props.polishFormState.sizes.twoFaces}</div>
                        <div>,m2</div>
                        <div>2 лица</div>
                        <div><input type='checkbox'
                                    checked={props.polishFormState.processing.twoFaces}
                                    onChange={(e) => onChangeProcessingGroup(e.target.checked,PROCESS_TYPE_TWO_FACES,OPERATION_POLISH_FACE)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{props.polishFormState.sizes.faceAround}</div>
                        <div>,m2</div>
                        <div>лица в круг</div>
                        <div><input type='checkbox'
                                    checked={props.polishFormState.processing.faceAround}
                                    onChange={(e) => onChangeProcessingGroup(e.target.checked,PROCESS_TYPE_FACE_AROUND,OPERATION_POLISH_FACE)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{props.polishFormState.sizes.facetUp}</div>
                        <div>,м.п.</div>
                        <div>фаска верх</div>
                        <div><input type='checkbox'
                                    checked={props.polishFormState.processing.facetUp}
                                    onChange={(e) => onChangeProcessingGroup(e.target.checked,PROCESS_TYPE_FACET_UP,OPERATION_POLISH_FACET)} /></div>
                    </div>
                    <div className={c.row_polish_form_box}>
                        <div>=</div>
                        <div>{props.polishFormState.sizes.facetAround}</div>
                        <div>,м.п.</div>
                        <div>фаска в круг</div>
                        <div><input type='checkbox'
                                    checked={props.polishFormState.processing.facetAround}
                                    onChange={(e) => onChangeProcessingGroup(e.target.checked,PROCESS_TYPE_FACET_AROUND,OPERATION_POLISH_FACET)} /></div>
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