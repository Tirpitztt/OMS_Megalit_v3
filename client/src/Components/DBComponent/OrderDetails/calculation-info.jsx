import React, {useEffect, useState} from 'react';
import c from './details.module.css'
import EditButton from "../../UI/Buttons/edit_button";
import Modal from "../../Common/modal";
import PayModal from "../../Common/payModal";
import {useMatState} from "../../../Hooks/material.hook";
import {getCalcBlr} from "../../../Utils/DB_support";


const CalculationInfo = (props) => {

    // const [materials,betonDetails,stone,workOperations,rate,betonMix] = useMatState()
    // console.log(props.rate)
    // let avanses = 0;
    // let avansesUSD = 0;
    //
    // if(props.order.calculation.payments.length){
    //     props.order.calculation.payments.forEach(function(item){
    //         avanses += item.summaBlr;
    //         avansesUSD += item.summa;
    //     })
    // }
    const calculator = getCalcBlr(props.order,props.rate)

    const [noticeValue,setNoticeValue] = useState('')
    const [isPaymentsActive, setPaymentsActive] = useState(false)
    const [isPayActive,setPayActive] = useState(false)
    useEffect(()=>{
        setNoticeValue(props.order.notice)
    },[])
    const onChangeText = (e) => {
        setNoticeValue(e.target.value)
    }
    const saveNotice = () => {
        let body = {
            orderId:props.order.id,
            notice:noticeValue
        }
        props.noticeChange(body)
    }
    return (
        <div className={c.main_info_box}>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>расчеты</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <div className={c.info_content_row}>
                        <div>общая стоимость</div>
                        <div><span className={[c.total_usd]}>{(calculator.totalUSD).toFixed(2)}</span>,$</div>
                        <div><span className={c.total_color}>{(calculator.totalBLR).toFixed(2)}</span>,BLR</div>
                        <div></div>
                    </div>
                    <div className={c.info_content_row}>
                        <div>авансы</div>
                        <div><span className={c.avans_usd}>{calculator.avanceUSD.toFixed(2)}</span>,$</div>
                        <div><span className={c.avans_color}>{calculator.avanceBLR.toFixed(2)}</span>,BLR</div>
                        <div onClick={()=>setPaymentsActive(true)} className={c.show_pay}>показать</div>
                    </div>
                    <div className={c.info_content_row}>
                        <div>остаток</div>
                        <div><span className={c.balance_usd}>{(calculator.balanceUSD).toFixed(2)}</span>,$</div>
                        <div><span className={c.balance_color}>{(calculator.balanceBLR).toFixed(2)}</span>,BLR</div>
                        <div></div>
                    </div>
                    <div className={c.info_content_row}>
                        <div>скидка</div>
                        <div>{props.order.calculation.discount}</div>
                        <div></div>
                        <div onClick={()=>setPayActive(true)}
                             className={c.add_pay}>внести платеж</div>
                    </div>
                </div>
            </div>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>примечание</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <textarea value={noticeValue}
                              onChange={(e)=>onChangeText(e)}
                              onBlur={saveNotice}
                              cols="80" rows="10"> </textarea>
                </div>
            </div>
            <Modal payments={props.order.calculation.payments}
                   close={setPaymentsActive}
                   active={isPaymentsActive} />
            <PayModal active={isPayActive}
                      addPayment={props.addPayment}
                      rate={props.rate}
                      user={props.user}
                      order={props.order}
                      close={setPayActive}
            />
        </div>
    );
};

export default CalculationInfo;
