import React, {useContext, useState} from 'react';
import c from "./modal.module.css";
import {setToday} from "../../Utils/dateTermin";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import {buildFloat} from "../../Utils/buildNum";
import Payment from '../../Utils/Classes/Payment'

const PayModal = (props) => {

    let isActive = props.active;
    const [cash,setCash] = useState(false)
    const [payValueBLR,setPayValueBLR] = useState(0)
    const [payValueUSD,setPayValueUSD] = useState(0)
    let paymentsData = null
    if(props.order.calculation.payments.length){
        paymentsData = props.order.calculation.payments.map((item,i)=>{
            return <div key={i} className={c.table_body}>
                <div className={c.table_body_item}>{item.pay_date}</div>
                <div className={c.table_body_item}>{item.summaBlr}</div>
                <div className={c.table_body_item}>{item.employerName}</div>
                <div className={c.table_body_item}>{item.cash?'нал':'безнал'}</div>
            </div>
        })
    }

    const setPaymentV = (val)=>{
        setPayValueBLR(buildFloat(val))
        setPayValueUSD(buildFloat(val)/props.rate[0].USD)

    }
    const cashChange = (val)=>{
        setCash(val)
    }
    const savePayment = ()=>{
        const body = new Payment(setToday())
        body.setCalculationId(props.order.calculation.id)
        body.setSumma(payValueUSD,payValueBLR)
        body.setEmployer(props.user)
        body.setCash(cash)
        props.addPayment(body);
        props.close(false);
        setPaymentV(0)
    }


    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={props.close} num={false} /></div>
                <div className={c.modal_title}><p>Внести платеж,:</p><p>бел.руб</p></div>
                <div className={c.pay_box}>
                    <input value={payValueBLR}
                           className={c.input_pay}
                           onChange={(e)=>setPaymentV(e.target.value)}/>
                    <div className={c.pay_cash_box}>
                        <label>наличные:</label>
                        <input type='checkbox'
                               onChange={(e)=>cashChange(e.target.checked)}  />
                    </div>
                </div>
                <div className={c.table_box}>
                    <div className={c.table_head}>
                        <div className={c.table_head_item}>дата</div>
                        <div className={c.table_head_item}>сумма</div>
                        <div className={c.table_head_item}>сотрудник</div>
                        <div className={c.table_head_item}>тип</div>
                    </div>
                    {paymentsData}
                </div>
                <div className={c.button_pay_box}>
                    <div onClick={savePayment} className={c.button_pay}>
                        <p>сохранить</p>
                    </div>
                    {/*<button onClick={savePayment}>сохранить</button>*/}
                </div>

            </div>

        </div>
    );
};

export default PayModal;
