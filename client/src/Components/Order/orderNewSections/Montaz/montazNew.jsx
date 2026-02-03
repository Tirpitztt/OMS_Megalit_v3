import React, {useEffect, useState} from 'react';
import c from './montaz.module.css'
const MontazNew = () => {




    return (
        <div className={c.montaz_box}>
            <p>создать монтажные работы</p>
            <div className={c.montaz_title_box}>
                <div className={c.title_item}>
                    <label>длина уч</label>
                    <input type="text"/>
                </div>
                <div className={c.title_item}>
                    <label>ширина уч</label>
                    <input type="text"/>
                </div>
                <div className={c.title_item}>
                    <label>высота уч</label>
                    <input type="text"/>
                </div>
                <div className={c.title_item}>
                    <label>доставка,км</label>
                    <input type="text"/>
                </div>

            </div>
        </div>
    );
};

export default MontazNew;