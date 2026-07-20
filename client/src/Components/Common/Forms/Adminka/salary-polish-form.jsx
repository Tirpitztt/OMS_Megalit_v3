import React, {useState, useEffect } from 'react'
import c from "../form.module.css";

import {

    HEIGHT, WIDTH, WEIGHT,
    PROCESS_TYPE_FACE, PROCESS_TYPE_FACET_AROUND, PROCESS_TYPE_FACET_UP, PROCESS_TYPE_FACE_AROUND,
    PROCESS_TYPE_TWO_FACES, OPERATION_POLISH_FACE, OPERATION_POLISH_FACET, PROCESS_TYPE_SIDE_AROUND, OPERATION_POLISH_SIDE, OPERATION_POLISH_AROUND, PROCESS_TYPE_DETAIL_AROUND
} from '../../../../Utils/variables-const';


const SalaryPolishForm = (props) => {
   // console.log('polish',props.tempCost)

    const onChangeCost = (val) => {
        props.setVal(props.cost, val.toFixed(2))
    }
    useEffect(() => {
        onChangeCost(props.tempCost)
    }, [props.tempCost])

    const onChangeSize = (type,val) => {
        props.sizeDetailChange({type,val})
    }
    const onChangeProcessingGroup = (check,type,operationType) => {
        props.setProcessingChange({val:check,type,operationType,operations:props.workOperations})
    }
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