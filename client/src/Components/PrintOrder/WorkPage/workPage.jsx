import React from 'react';
import c from './workPage.module.css';
import UpperSec from "./upperSec";
import MiddleSec from "./middleSec";
import DownSec from "./downSec";


const WorkPage = (props) => {

    return (
        <div className={c.wrapper}>
            <div className={c.header}>
                <p>Заказ № <span className={c.numorder}>{props.order.number}</span>
                    от  <span>{props.order.termin.date_start}</span></p>
            </div>
            <UpperSec calculator={props.calculator}
                      order={props.order}
                      rate={props.rate}
                      sketchPath={props.order.handling.sketch_path}
                      termin={props.order.termin}
                      notice={props.order.notice}
                      customer={props.customer} />
            <MiddleSec text={props.order.handling.text_grav} />
            <DownSec order={props.order} customer={props.customer}/>
        </div>
    );
};

export default WorkPage;
