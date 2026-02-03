import React from 'react';
import c from './payInfo.module.css'
import {NavLink} from "react-router-dom";
import InfoYearTable from "./infoYearTable";
import InfoShopTable from "./infoShopTable";


const PayStatistics = (props) => {
    console.log('pstat:',props)
    const today = new Date()
    const tableTitle = 'Сравнительная таблица'
    const shopTitle = 'Сводная по магазинам'
    let equalsTableData = []
    let currentYearData = {}

    if(props.state.calcInfo.equalsCalculation.length){
        equalsTableData = [...props.state.calcInfo.equalsCalculation]
        props.state.calcInfo.equalsCalculation.forEach(stat=>{
            if(stat.year === today.getFullYear()){
                currentYearData = {...stat}
            }
        })
        //console.log(currentYearData)
    }
    return (
        <div className={c.wrapper}>
            <div className={c.main_title}>
                <NavLink to="/home" className={c.navlink}><p>&#8617;</p></NavLink>
                <div className={c.title}><p>Сводная прихода средств</p></div>
                <div>
                    <select className={c.sel}>
                        <option value="USD">USD</option>
                        <option value="BLR">BLR</option>
                    </select>
                </div>
            </div>
            <div className={c.work_space}>

                <InfoYearTable title={tableTitle} state={equalsTableData} />
                <InfoShopTable title={shopTitle} state={equalsTableData} />

            </div>

        </div>
    );
};

export default PayStatistics;
