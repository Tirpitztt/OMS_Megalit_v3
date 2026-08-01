import React, { useEffect,useState} from 'react'
import c from '../form.module.css'
import {detailSort, sortDetailParamsBuilder} from '../../../../Utils/support'
//import { ALL_CHECK_ON, ALL_COLORS_CHECK_ON, BLACK_CHECK_ON, GRAY_CHECK_ON, OTHER_CHECK_ON, RED_CHECK_ON, STELA_CHECK_ON, TUMBA_CHECK_ON, WHITE_CHECK_ON } from '../../../../Utils/variables-const'


const SalaryConcreateForm = (props) => {
    console.log(props.concreateFormState.detailsShiftKit)
    //const checkList = [STELA_CHECK_ON, TUMBA_CHECK_ON, OTHER_CHECK_ON, ALL_CHECK_ON]
    //const checkColorList = [BLACK_CHECK_ON, GRAY_CHECK_ON, WHITE_CHECK_ON, RED_CHECK_ON, ALL_COLORS_CHECK_ON]
    let detailsList = []
    let detailsShiftKit = []
    const delDetFromKit = (id) => {
        props.delDetailFromKit({id})
    }

    useEffect(() => {
        props.getDetailsList(props.state.formOptions.sortParams)
    }, [props.state.formOptions.sortParams])

    //if (props.state.formOptions.detailsList.length) {
    //    detailsList = props.state.formOptions.detailsListSort.map((item, i) => {
    //        return <div key={i}
    //            className={c.field_concreate_box }
    //            onClick={() => props.addDetailToKit({ id: item.id, articul: item.articul,amount:1 })}>{item.articul}</div>
    //    })
    //}

    if (props.state.formOptions.detailsList.length) {
        detailsList = props.state.formOptions.detailsList.map((item, i) => {
            return <div key={i} className={c.field_concreate_box}>{item.articul }</div>
        })
    }
    if (props.concreateFormState.detailsShiftKit.length) {
        detailsShiftKit = props.concreateFormState.detailsShiftKit.map((item, i) => {
            return <div key={i} className={c.field_concreate_box}>
                <div className={c.field_concreate_box_item }>
                    <div>{item.articul} - </div>
                    <div>{item.amount} шт</div>
                </div>
                <div className={c.field_concreate_box_item_button}>
                    <div onClick={() => delDetFromKit(item.id)}>X</div>
                </div>
                
            </div>
        })
    }
    // const sortDetailsList = (val) => {
    //     //console.log(val)
    //     checkList.forEach(item => {
    //         if (val === item.value) {
    //             item.checked = item.checkOn()
    //             let arr = detailSort({
    //                    category: item.value,
    //                    details: props.state.formOptions.detailsList
    //             })
    //             props.getDetailsListSort(arr)
    //         } else {
    //            item.checked =  item.checkOff()
    //         }
    //     })
    // }
    // const sortDetailsList = (val) => {
    //     props.concreateFormState.sortCheckBoxList.forEach(item => {
    //         if(val === item.value){
    //             item.checkON()
    //             let arr = detailSort({
    //                 category: item.value,
    //                 details:props.state.formOptions.detailsList
    //             })
    //             props.getDetailsListSort(arr)
    //         }else{
    //             item.checkOFF()
    //         }
    //     })
    // }


    // const sortColorDetailsList = (val) => {
    //     console.log(val)
    //     checkColorList.forEach(item => {
    //         if(val === item.value){
    //             item.checked = item.checkOn()
    //         }
    //     })
    // }

    const sortDetailList = (param) => {
        //props.getDetailsListSort({det:['стела'],colors:['с','ч']})
        //ввести тип параметра? {type:'',val:val}
        props.getDetailsListSort(param)
    }

    return (
        <div className={c.concreate_main_wrap }>

            <div className={c.sup_concr_item }>
                <div className={c.details_check_row}>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>все</label>
                        <input type='checkbox' value='all'
                            checked={props.state.formOptions.sortCheckBoxList[3].checked}
                            onChange={(e) => sortDetailList({ type: 1, val: e.target.value })} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>стела</label>
                        <input type='checkbox' value='стела'
                            checked={props.state.formOptions.sortCheckBoxList[0].checked}
                            onChange={(e) => sortDetailList({ type: 1, val: e.target.value })} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>подст</label>
                        <input type='checkbox' value='подставка'
                            checked={props.state.formOptions.sortCheckBoxList[1].checked}
                            onChange={(e) => sortDetailList({ type: 1, val: e.target.value })} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>другое</label>
                        <input type='checkbox' value='другое'
                            checked={props.state.formOptions.sortCheckBoxList[2].checked}
                            onChange={(e) => sortDetailList({ type: 1, val: e.target.value })} />
                    </div>
                </div>
                <div className={c.details_list_box}>
                    <div className={c.check_list_col}>
                        <div className={c.concreate_checkbox_color_wrap}>
                            <label>Ч</label>
                            <input type='checkbox' value='ч'
                                checked={props.state.formOptions.sortColorCheckBoxList[0].checked}
                                onChange={(e) => sortDetailList({ type: 2, val: e.target.value })}
                            />
                        </div>
                        <div className={c.concreate_checkbox_color_wrap}>
                            <label>Б</label>
                            <input type='checkbox' value='б'
                                checked={props.state.formOptions.sortColorCheckBoxList[1].checked}
                                onChange={(e) => sortDetailList({ type: 2, val: e.target.value })}
                            />
                        </div>
                        <div className={c.concreate_checkbox_color_wrap}>
                            <label>С</label>
                            <input type='checkbox' value='с'
                                checked={props.state.formOptions.sortColorCheckBoxList[2].checked}
                                onChange={(e) => sortDetailList({ type: 2, val: e.target.value })}
                            />
                        </div>
                        <div className={c.concreate_checkbox_color_wrap}>
                            <label>К</label>
                            <input type='checkbox' value='к'
                                checked={props.state.formOptions.sortColorCheckBoxList[3].checked}
                                onChange={(e) => sortDetailList({ type: 2, val: e.target.value })}
                            />
                        </div>

                    </div>
                    <div className={c.list_box_col }>
                        {detailsList}

                    </div>
                    
                </div>
            </div>
            <div className={c.sup_concr_item}>
                {detailsShiftKit}
            </div>
            
        </div>

    )
}

export default SalaryConcreateForm;