import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import {dateTimeFormat} from "../../Utils/dateTermin";

const Modal = (props)=>{

    let isActive = props.active;
    let payments = props.payments.map((pay,i)=>{
        return <tr key={i}><td>{dateTimeFormat(pay.pay_date)}</td><td>{pay.summaBlr}</td>
            <td>{pay.employerName}</td><td>{pay.cash?'нал':'безнал'}</td></tr>
    })
    const closeModal = ()=>{
        props.close(false);
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div><p>Платежи</p></div>
                <table>
                    <thead>
                    <tr><th>дата</th><th>сумма</th><th>сотрудник</th><th>нал</th></tr>
                    </thead>
                    <tbody>
                    {payments}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Modal;
