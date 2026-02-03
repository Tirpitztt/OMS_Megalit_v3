import React from 'react';
import c from './../pages.module.css';

const BetonMixTable = ({row}) => {

    return (
        <div className={c.table}>
            <div className={c.thead}>
                <div className={c.table_row}>

                    <div className={c.table_item_head}>артикул</div>
                    <div className={c.table_item_head}>описание</div>
                    <div className={c.table_item_head}>ед.изм</div>
                    <div className={c.table_item_head}>цена,BLR</div>
                    <div className={c.table_item_head}>..</div>
                    <div className={c.table_item_head}>..</div>
                </div>
            </div>
            <div className={c.tbody}>
                {row}
            </div>
        </div>
    );
};

export default BetonMixTable;
