import React, {useEffect, useState} from 'react';
import c from './printOrder.module.css';
import {useOrder} from "../../Hooks/order.hook";
import {NavLink, useParams} from "react-router-dom";
import Specification from "./Specification/specification";
import Protocol from "./Protocol/protocol";
import Contract from "./Contract/contract";
import WorkPage from "./WorkPage/workPage";
import {useMaterials} from "../../Hooks/material.hook";
import {convertToInt} from "../../Utils/buildNum";
import {getCalcBlr} from "../../Utils/DB_support";
import LoadingData from "../Common/loadingData";


const PrintOrder = () => {
    let [rate,setRate] = useState(0);
    const [delivery,setDelivery] = useState()
    const [hydro,setHydro] = useState()
    let [materials] = useMaterials();
    useEffect(()=>{
        if(Object.entries(materials).length){
            setRate(materials.rate[0].USD);
            setDelivery(materials.rate[1].USD * materials.rate[0].USD)
            setHydro(materials.rate[2].USD * materials.rate[0].USD)
        }
    },[materials])
    let number = useParams();
    let orderId = convertToInt(number.orderId)
    let {order,customer} = useOrder(orderId);
    let pathBack = '/editable/'+orderId;
    let specification = <LoadingData />;
    let protocol = <LoadingData />;
    let contract = <LoadingData />;
    let workPage = <LoadingData />;

    let additionalButton = null;
    if(order){
        const calculator = getCalcBlr(order,materials.rate)
        specification = <Specification order={order} customer={customer} />;
        protocol = <Protocol order={order} customer={customer} rate={order.calculation.rate} calculator={calculator} delivery={delivery} hydro={hydro}/>;
        contract = <Contract order={order} customer={customer} rate={order.calculation.rate} calculator={calculator}/>;
        workPage = <WorkPage order={order} customer={customer} rate={materials.rate} calculator={calculator}/>;

        if(order.edited_historys.length){
            additionalButton = <NavLink to={'/print-add/' + orderId}
                                        className={c.navlink}><p>Доп соглашение</p></NavLink>
        }
    }
    const changeRate = (e)=>{
        setRate(materials.rate[0][e.target.value]);
    }
    const printClick = ()=>{
        window.print();
    }
    return (
        <div>
            <div className={c.printbut_box}>
                <NavLink to={pathBack} className={c.navlink}><p>&#8617;</p></NavLink>
                <div onClick={printClick} className={c.navlink}><p>Распечатать</p></div>
                <NavLink to={'/print-work-pages/' + orderId} className={c.navlink}><p>Рабочие листы</p></NavLink>
                {additionalButton}
                <select onChange={changeRate} className={c.select_rate}>
                    <option value="USD" selected>BLR</option>
                    <option value="BLR">USD</option>
                </select>
            </div>
            <div className='print'>
                {specification}
                {protocol}
                {contract}
                {workPage}

                {/*{JSON.stringify(order)}*/}
            </div>
        </div>
    );
};

export default PrintOrder;
