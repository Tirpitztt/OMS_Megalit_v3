import React from 'react';
import c from './contract.module.css';

const Requisites = ({maker,customer}) => {

    let performer = {
        name:'ООО МегалитГран',
        address:'РБ,Могилевская обл.,г.Бобруйск ул.Парковая,57/3',
        UNP:'790450614',
        acc:' BY52 BLBB 301 207 904 506 1400 1001, BIC:BLBBBY2X',
        phones:['(225)76-56-86 ' ,' (44)56-000-85 ',' (44)576-111-6'],
        mail:' tihongrav@mail.ru, megalitgran@mail.ru'
    }


    return (
        <div className={c.req_box}>
            <div className={c.maker_box}>
                <p className={c.title}>Подрядчик</p>
                <p><span>Наименование:</span> {performer.name}</p>
                <p><span>Адрес:</span> {performer.address}</p>
                <p><span>УНП:</span> {performer.UNP}</p>
                <p><span>р/с:</span> {performer.acc}</p>
                <p><span>тел:</span>{performer.phones[0]}<span>моб:</span>{performer.phones[1]}<span>Монтажные работы: </span> {performer.phones[2]}</p>
                <p><span>e-mail:</span>{performer.mail}</p>
            </div>
            <div className={c.customer_box}>
                <p className={c.title}>Заказчик</p>
                <p><span>ФИО:</span> {customer.last_name} {customer.name} {customer.father_name}</p>
                <p><span>Адрес:</span> {customer.address}</p>
                <p><span>Телефон:</span> {customer.phone}</p>
            </div>
        </div>
    );
};

export default Requisites;
