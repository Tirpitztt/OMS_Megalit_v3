import React from 'react';
import c from './specification.module.css';
import Complects from "./complects";
import Handling from "./handling";
import Montaz from "./montaz";
import Information from "./information";
import {sketchGallery} from "../../../Utils/support";


const Specification = (props) => {
    let img = '';
    const styles = [c.sketch1,c.sketch2,c.sketch3]
    if(props.order.cards.length){
        img = sketchGallery(props.order.cards,styles)
    }

    return (
        <div className={c.wrapper}>
            <div className={c.head}>
                <div><p>Спецификация к договору N
                    <span>{props.order.number}</span> от {props.order.termin.date_start}</p></div>
                <div><p>Заказчик: <span>{props.customer.last_name}</span>
                <span> {props.customer.name}</span>
                <span> {props.customer.father_name}</span></p></div>
            </div>
            <div className={c.content_wrap}>
                <div className={c.left_box}>
                    <div className={c.picture_box}>
                        <div className={c.title}>эскиз</div>
                        <div className={c.sketchBox}>{img}</div>
                    </div>
                    <div className={c.information}>
                        <div className={c.title}>к сведению заказчика</div>
                        <Information />
                    </div>
                    <div className={c.text_box}>
                        <div className={c.title}>текст для гравировки</div>
                        <div><pre>{props.order.handling.text_grav}</pre></div>
                    </div>

                </div>
                <div className={c.right_box}>
                    <div className={c.details_box}>
                        <div className={c.title}>комплектация</div>
                        <Complects state={props.order.complects} />
                    </div>
                    <div className={c.details_box}>
                        <div className={c.title}>обработка</div>
                        <Handling state={props.order.handling} />
                    </div>
                    <div className={c.details_box}>
                        <div className={c.title}>монтажные работы</div>
                        <Montaz state={props.order.montaz} />
                    </div>
                </div>
            </div>
            <div className={c.footer}>
                <div className={c.sign}><p>Заказчик</p><div></div></div>
                <div className={c.sign}><p>Исполнитель</p><div></div></div>
            </div>
        </div>
    );
};

export default Specification;
