import React from 'react';
import c from './details.module.css'
import {dateFormat} from "../../../Utils/support";

const MainInfo = (props) => {

    let maker = 'ИП Тихонович';
    if(props.order.maker==='megalit'){
        maker = 'OOO Мегалит Гран';
    }

    let customerRank = props.customer.rank
    let cssRank = [c.info_rank_norm]
    if(props.customer.rank == 1){
        cssRank = [c.info_rank_bad]
        customerRank = ''
    }

    const statusChange = (e) => {
        let body = {
            orderId:props.order.id,
            status:e.target.value
        }
        props.editStatus(body)
    }



    return (
        <div className={c.main_info_box}>
            <div className={c.info_side}>
                <div className={c.info_row}>
                    <p>Заказ N <strong>{props.order.number}</strong>  от <strong>{dateFormat(props.order.termin.date_start)}</strong> </p>
                </div>
                <div className={c.info_row}>
                    <p>Заказчик: <strong>{props.customer.full_name}</strong></p>
                    <p className={cssRank}>клиент: {customerRank}</p>
                </div>
                <div className={c.info_row}>
                    <p>адрес: <strong>{props.customer.address}</strong></p>
                </div>
                <div className={c.info_row}>
                    <p>телефон: <strong>{props.customer.phone}</strong> </p>
                </div>
            </div>
            <div className={c.info_side}>
                <div className={c.info_row}>
                    <label>статус:</label>
                    <select onChange={(e)=>statusChange(e)}>
                        <option value={props.order.status}>{props.order.status}</option>
                        <option value="принят">принят</option>
                        <option value="заливка">заливка</option>
                        <option value="распил">распил</option>
                        <option value="шлифовка">шлифовка</option>
                        <option value="граверка">граверка</option>
                        <option value="сборка">сборка</option>
                        <option value="готов">готов</option>
                        <option value="отгружен">отгружен</option>
                    </select>
                </div>
                <div className={c.info_row}>
                    <p>изготовитель:    {maker}</p>
                </div>
                <div className={c.info_row}>
                    <p>оформил:    {props.order.employerName}</p>
                </div>
                <div className={c.info_row}>
                    <p>сроки:   {props.order.termin.date_finish}</p>
                </div>

            </div>
        </div>
    );
};

export default MainInfo;
