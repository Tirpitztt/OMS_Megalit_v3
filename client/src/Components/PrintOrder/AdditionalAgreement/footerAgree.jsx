import React from 'react';
import c from "./agree.module.css";

const FooterAgree = ({customer}) => {

    const name = 'OOO МегалитГран';
    const address = 'РБ,Могилевская обл.,г.Бобруйск ул.Парковая,57/3';
    const UNP = '790450614';
    const acc = 'BY52 BLBB 301 207 904 506 1400 1001';
    const phones = ['(225)41-25-65','(44)56-000-85','(44)576-111-6']

    return (
        <div>
            <div>
                <p>
                    Данное соглашение составлено в двух экземплярах и вступает в силу с
                    момента его подписания и является неотъемлемой частью договора
                </p>
            </div>
            <div className={c.footer_data}>
                <div className={c.maker_box}>
                    <p className={c.title}>Подрядчик</p>
                    <p><span>Наименование:</span> {name}</p>
                    <p><span>Адрес:</span> {address}</p>
                    <p><span>УНП:</span> {UNP}</p>
                    <p><span>р/с:</span> {acc}</p>
                    <p><span>тел:</span>{phones[0]}</p>
                    <p>{phones[1]}</p>
                    <p>{phones[2]}</p>
                </div>
                <div className={c.customer_box}>
                    <p className={c.title}>Заказчик</p>
                    <p><span>ФИО:</span> {customer.last_name} {customer.name} {customer.father_name}</p>
                    <p><span>Адрес:</span> {customer.address}</p>
                    <p><span>Телефон:</span> {customer.phone}</p>
                </div>
            </div>
            <div className={c.sign_box}>
                <div>Исполнитель</div>
                <div>Заказчик</div>
            </div>
        </div>
    );
};

export default FooterAgree;
