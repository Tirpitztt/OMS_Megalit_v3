import React from 'react';
import c from './../../main.module.css'

const AdminInfoUtm = ({state}) => {
    return (
        <div className={c.card_wrap_statistic}>
            <div className={c.info_row}>
                <div className={c.info_item}>По рекомендации:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[1]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Старый заказчик:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[2]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Реклама интернет:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[3]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Реклама улица:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[4]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Реклама в прессе:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[5]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Реклама магазина:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[6]}</div>
            </div>
            <div className={c.info_row}>
                <div className={c.info_item}>Реклама на авто:</div>
                <div className={c.info_item}></div>
                <div className={c.info_item}>{state.adminInfo.orderStatistic.utmPoint[7]}</div>
            </div>
        </div>
    );
};

export default AdminInfoUtm;
