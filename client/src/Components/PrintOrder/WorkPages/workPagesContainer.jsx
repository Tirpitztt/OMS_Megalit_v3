import React from 'react';
import c from "../printOrder.module.css";
import {useParams, NavLink} from "react-router-dom";
import {convertToInt} from "../../../Utils/buildNum";
import {useOrder} from "../../../Hooks/order.hook";
import CheckList from "./CheckListPage/checkList";
import {useRef} from 'react';
import {useReactToPrint} from "react-to-print";
import HandPage from "./HandlingPage/handPage";

const WorkPagesContainer = () => {
    const printClick = () => {
        window.print();
        //reactToPrintFn();
    }



    let number = useParams();
    let orderId = convertToInt(number.orderId)
    let {order,customer} = useOrder(orderId);
    const path = '/editable/'+orderId;
    let checkList = null;
    let handerPage = null;
    if(order){
        checkList = <CheckList order={order} customer={customer} />
        handerPage = <HandPage order={order} customer={customer} />
    }
    // const contentRef = useRef<HTMLDivElement>(checkList);
    // const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
            <div className={c.printbut_box}>
                <NavLink to={path} className={c.navlink}><p>&#8617;</p></NavLink>
                <div onClick={printClick} className={c.navlink}><p>Распечатать</p></div>
            </div>
            {/*<div className='print'>*/}
            {/*    {checkList}*/}
            {/*</div>*/}
            <div className='print'>
                {checkList}
                {handerPage}
            </div>
        </div>
    );
};

export default WorkPagesContainer;
