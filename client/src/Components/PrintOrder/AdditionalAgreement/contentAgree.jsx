import React from 'react';
import {agreeDetailsBodyCreator, dateFormat, getAgreeImgArray, sortDetails} from "../../../Utils/support";
import c from './agree.module.css';

const ContentAgree = ({body}) => {
    let termin = null;
    let text = null;
    let size = null;
    let delivery = null;
    let delivery_point = null;
    let totalCost = null;
    let cards = null;
    let deletedSection = null;
    let addedSection = null;
    const detailSorted = sortDetails(body)
    if(body.termin){
        termin = <div className={c.details_wrap}>
            - изменить редакцию пункта 1.2(Сроки исполнения) --
            с <span>{dateFormat(body.termin.before)}</span>
            на <span>{dateFormat(body.termin.after)}</span>
        </div>
    }
    if(body.handling.textGrav){
        text = <div className={c.text_wrap}>
            <div className={c.text_title}>- изменить текст надписи и(или) эпитафии</div>
            <div className={c.text_content_wrap}>
                <div className={c.text_box}>
                    <div className={c.text_box_title}>c</div>
                    <div>
                        <pre>{body.handling.textGrav.before}</pre>
                    </div>
                </div>
                <div className={c.text_box}>
                    <div className={c.text_box_title}>на</div>
                    <div>
                        <pre>{body.handling.textGrav.after}</pre>
                    </div>
                </div>
            </div>

        </div>
    }
    if(body.montaz.size){
        size = <div className={c.details_wrap}>
            - изменить редакцию пункта спецификации 'размеры участка' --
            с <span>{body.montaz.size.before}</span>
            на <span>{body.montaz.size.after}</span>
        </div>
    }
    if(body.montaz.delivery){
        delivery = <div className={c.details_wrap}>
            - изменить редакцию пункта спецификации 'доставка, км' --
            с <span>{body.montaz.delivery.before}</span>  km
            на <span>{body.montaz.delivery.after}</span>  km
        </div>
    }
    if(body.montaz.delivery_point){
        delivery_point = <div className={c.details_wrap}>
            - изменить редакцию пункта спецификации 'доставка, место' --
            с <span>{body.montaz.delivery_point.before}</span>
            на <span>{body.montaz.delivery_point.after}</span>
        </div>
    }
    if(body.calculation){
        totalCost = <div className={c.details_wrap}>
            - изменить редакцию пункта 3.1 договора (общая стоимость) --
            с <span>{body.calculation.before.toFixed(2)}</span> бел.руб
            на <span>{body.calculation.after.toFixed(2)}</span>  бел.руб
        </div>
    }
    if(body.cards.added.length || body.cards.deleted.length){
        cards = <div className={c.details_wrap}>
            - изменить редакцию пункта спецификации (эскиз) --
            <div className={c.img_wrap}>
                <div className={c.img_box}>
                    <p>удалить</p>
                    <div className={c.img_row}>{getAgreeImgArray(body.cards.deleted)}</div>
                </div>
                <div className={c.img_box}>
                    <p>добавить</p>
                    <div className={c.img_row}>{getAgreeImgArray(body.cards.added)}</div>
                </div>
            </div>
        </div>
    }
    if(detailSorted.deleted.length){
        deletedSection = <div className={c.details_wrap}>
            - удалить из спецификации следующие позиции:{agreeDetailsBodyCreator(detailSorted.deleted)}
        </div>
    }
    if(detailSorted.added.length){
        addedSection = <div className={c.details_wrap}>
            - добавить в спецификацию следующие позиции:{agreeDetailsBodyCreator(detailSorted.added)}
        </div>
    }

    return (
        <div className={c.content_sec}>
            {termin}
            {text}
            {size}
            {delivery}
            {delivery_point}
            {deletedSection}
            {addedSection}
            {cards}
            {totalCost}
        </div>
    );
};

export default ContentAgree;
