import React from 'react';
import { onlyDateFormat} from "../../../Utils/dateTermin";
import c from './agree.module.css'

const HeaderAgree = ({order,customer,number,date}) => {

    return (
        <div className={c.header_wrap}>
            <div className={c.header_title}>
                <p>
                   Дополнительное соглашение N <span>{number}</span>
                </p>
                <p>
                    к договору N <span>{order.number}</span>
                    от <span>{order.termin.date_start}</span>
                </p>
            </div>
            <div className={c.header_middle}>
                <div>г.Бобруйск</div>
                <div>{onlyDateFormat(date)}</div>
            </div>
            <div className={c.header_text}>
                <p>
                    Общество с ограниченной ответственностью "Мегалит Гран"
                    в лице директора Тихонович С.В. действующего на основании устава, далее
                    именуемый "Исполнитель" с одной стороны и Гражданин(ка): <span>{customer.last_name}
                    {customer.name} {customer.father_name}</span> проживающий по адресу:
                    <span>{customer.address}</span> телефон <span>{customer.phone}</span> именуемый в дальнейшем "Заказчик"
                    заключили настоящее соглашение о нижеследующем:
                </p>
            </div>
        </div>
    );
};

export default HeaderAgree;
