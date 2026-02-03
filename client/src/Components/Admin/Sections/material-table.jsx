import React from 'react';
import c from './../admin.module.css';

const MaterialTable = ({row}) => {


    return (
        <div className={c.table}>
            <div className={c.thead}>
                <div className={c.table_row}>
                    <div className={c.table_item_head}>id</div>
                    <div className={c.table_item_head}>наименование</div>
                    <div className={c.table_item_head}>изм</div>
                    <div className={c.table_item_head}>RUR</div>
                    <div className={c.table_item_head}>USD</div>
                    <div className={c.table_item_head}>BLR</div>
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

export default MaterialTable;
