import React from 'react';
import c from '../workPages.module.css'

const MiddleHandSec = ({order}) => {
    console.log(order)
    return (
        <div className={c.upper_wrap}>
            <div className={c.upper_box}>
                <div className={c.title_box}>Текст</div>
                <div className={c.text_box}>
                    <pre>{order.handling.text_grav}</pre>
                </div>
            </div>
            <div className={c.upper_box}>
                <div className={c.title_box}>Отметки</div>
                <div className={c.check_box}>
                    <div className={c.check_box_row}>
                        <div className={c.check_box_elem}>Согласован</div>
                        <div className={c.check_box_elem}>Дата</div>
                    </div>
                    <div className={c.check_box_row}>
                        <div className={c.check_box_elem}>Выбит</div>
                        <div className={c.check_box_elem}>Дата</div>
                    </div>
                    <div className={c.check_box_row}>
                        <div className={c.check_box_elem}>Исполнитель</div>
                        <div className={c.check_box_elem}>ФИО</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiddleHandSec;
