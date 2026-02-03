import React from 'react';
import c from './protocol.module.css';
import ProtocolTable from "./protocolTable";
import ProtocolInfo from "./protocolInfo";

const Protocol = (props) => {


    return (
        <div className={c.wrapper}>
            <div className={c.head}>
                <div><p>Протокол согласования цен к договору N
                    <span>{props.order.number}</span> от {props.order.termin.date_start}</p></div>
                <div><p>Заказчик: <span>{props.customer.last_name}</span>
                    <span> {props.customer.name}</span>
                    <span> {props.customer.father_name}</span></p></div>
            </div>
            <div className={c.content_wrap}>
                <div className={c.table_box}>
                    <ProtocolTable state={props.order} rate={props.rate}
                                   calculator={props.calculator}
                                   delivery={props.delivery}
                                   hydro={props.hydro}/>
                </div>
                <div className={c.info_box}>
                    <ProtocolInfo />
                </div>
            </div>
            <div className={c.footer}>
                <div className={c.sign}><p>Заказчик</p><div></div></div>
                <div className={c.sign}><p>Исполнитель</p><div></div></div>
            </div>
        </div>
    );
};

export default Protocol;
