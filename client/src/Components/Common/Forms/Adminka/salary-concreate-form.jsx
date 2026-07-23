import React, { useEffect,useState} from 'react'
import c from '../form.module.css'
import { detailSort } from '../../../../Utils/support'
import { ALL_CHECK_ON, OTHER_CHECK_ON, STELA_CHECK_ON, TUMBA_CHECK_ON } from '../../../../Utils/variables-const'


const SalaryConcreateForm = (props) => {
    console.log(props.concreateFormState.detailsShiftKit)
    const checkList = [STELA_CHECK_ON, TUMBA_CHECK_ON, OTHER_CHECK_ON, ALL_CHECK_ON]
    let detailsList = []
    let detailsShiftKit = []
    const delDetFromKit = (id) => {
        props.delDetailFromKit({id})
    }

    useEffect(() => {
        props.getDetailsList()
    }, [])

    if (props.state.formOptions.detailsList.length) {
        detailsList = props.state.formOptions.detailsListSort.map((item, i) => {
            return <div key={i}
                onClick={() => props.addDetailToKit({ id: item.id, articul: item.articul,amount:1 })}>{item.id} {item.articul}</div>
        })
    }
    if (props.concreateFormState.detailsShiftKit.length) {
        detailsShiftKit = props.concreateFormState.detailsShiftKit.map((item, i) => {
            return <div key={i} className={c.field_concreate_box }>
                <div>{item.id} - {item.articul} - {item.amount}</div>
                <div onClick={() => delDetFromKit(item.id)}>X</div>
            </div>
        })
    }
    const sortDetailsList = (val) => {
        //console.log(val)
        checkList.forEach(item => {
            if (val === item.value) {
                item.checked = item.checkOn()
                let arr = detailSort({
                       category: item.value,
                       details: props.state.formOptions.detailsList
                })
                props.getDetailsListSort(arr)
            } else {
               item.checked =  item.checkOff()
            }
        })
    }

    return (
        <div className={c.field_concreate_box }>

            <div className={c.sup_concr_item }>
                <div className={c.details_check_row}>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>все</label>
                        <input type='checkbox' value='all'
                            checked={checkList[3].checked}
                            onChange={(e) => sortDetailsList(e.target.value)} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>стела</label>
                        <input type='checkbox' value='стела'
                            checked={checkList[0].checked}
                            onChange={(e) => sortDetailsList(e.target.value)} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>подст</label>
                        <input type='checkbox' value='подставка'
                            checked={checkList[1].checked}
                            onChange={(e) => sortDetailsList(e.target.value)} />
                    </div>
                    <div className={c.concreate_checkbox_wrap}>
                        <label>другое</label>
                        <input type='checkbox' value='другое'
                            checked={checkList[2].checked}
                            onChange={(e) => sortDetailsList(e.target.value)} />
                    </div>
                </div>
                <div className={c.details_list_box}>

                    {detailsList}
                </div>
            </div>
            <div className={c.sup_concr_item}>
                {detailsShiftKit}
            </div>
            
        </div>

    )
}

export default SalaryConcreateForm;