import React, {useContext} from 'react';
import c from "./dblist.module.css"
import {NavLink} from "react-router-dom";
import {getRedDate} from "../../../Utils/adminSupport";
import {UserContext} from "../../../Context/user.context";

const DbContent = (props) => {
    const users = useContext(UserContext)
    //console.log(users)
    const classes = {
        norm:c.db_table_body,
        red:[c.db_table_body,c.color_red].join(' '),
        orange:[c.db_table_body,c.color_orange].join(' ')
    }

    let tableBody = props.row.map((item,i) =>{
        const isTermin = getRedDate(item.termin,item.status,classes)
        return <NavLink to={'/editable/'+ item.id} key={i} className={c.db_table_body_row} >
            <div className={c.db_table_body}>{item.number}</div>
            <div className={c.db_table_body}>
                {item.customer}
                <div className={c.db_hide_text}>{item.text}</div>
            </div>
            <div className={c.db_table_body}>{item.total.toFixed(2)}</div>
            <div className={c.db_table_body}>{item.avans.toFixed(2)}</div>
            <div className={c.db_table_body}>{item.balance.toFixed(2)}</div>
            <div className={isTermin}>{item.termin}</div>
            <div className={c.db_table_body}>{item.status}</div>
            <div className={c.db_table_body}>{item.montaz}</div>
            <div className={c.db_table_body}>{item.montazPlace}</div>
            <div className={c.db_table_body}>{item.notice}</div>
        </NavLink>
    })

    return (
        <div className={c.db_content_wrap}>
            <div className={c.db_content_header}>
                <div className={c.db_table_head}>N</div>
                <div className={c.db_table_head}>заказчик</div>
                <div className={c.db_table_head}>сумма</div>
                <div className={c.db_table_head}>аванс</div>
                <div className={c.db_table_head}>остаток</div>
                <div className={c.db_table_head}>сроки</div>
                <div className={c.db_table_head}>статус</div>
                <div className={c.db_table_head}>уст</div>
                <div className={c.db_table_head}>кладбище</div>
                <div className={c.db_table_head}>примечание</div>

            </div>
            <div className={c.db_table_wrap}>
                {tableBody}
            </div>
        </div>
    );
};

export default DbContent;
