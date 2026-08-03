import React, { useEffect,useState} from 'react'
import c from '../form.module.css'
//import {detailSort, sortDetailParamsBuilder} from '../../../../Utils/support'


const SalaryConcreateForm = (props) => {
    
    let detailsList = []
    let detailsShiftKit = []
    const delDetFromKit = (id) => {
        props.delDetailFromKit({id})
    }

    useEffect(() => {
        props.getDetailsList(props.state.formOptions.sortParams)
    }, [props.state.formOptions.sortParams])

    if (props.state.formOptions.detailsList.length) {
        detailsList = props.state.formOptions.detailsList.map((item, i) => {
            return <div key={i}
                        className={c.field_concreate_box}
                        onClick={()=>props.addDetailToKit({id:item.id,articul:item.articul,amount:1})}
            >{item.articul }</div>
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
   const sortDetailList = (param) => {
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
                <div
                    className={c.concreate_detail_button}>Изготовлено</div>
                <div className={c.list_box_col}>
                    {detailsShiftKit}
                </div>

            </div>
            
        </div>

    )
}

export default SalaryConcreateForm;