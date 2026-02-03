import React from 'react';
import c from './../admin.module.css';

const WorkTable = ({row}) => {



    return (
        <div className={c.table}>
            <div className={c.thead}>
                <div className={c.table_row}>
                    <div className={c.table_item_head_work}>цех</div>
                    <div className={c.table_item_head_work}>наименование</div>
                    <div className={c.table_item_head_work}>изм</div>
                    <div className={c.table_item_head_work}>BLR</div>
                    <div className={c.table_item_head_work}>..</div>
                    <div className={c.table_item_head_work}>..</div>
                </div>
            </div>
            <div className={c.tbody}>
                {row}
            </div>
        </div>
    );
};

export default WorkTable;
