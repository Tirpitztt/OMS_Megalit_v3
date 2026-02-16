import React from 'react';
import c from './salary.module.css'
import TableTimeSheet from './tableTimeSheet';

const TimeSheetPage = (props) => {

    return (
        <div className={c.table_box}>
            <div className={c.table_title_box}>
                <div className={c.table_title_item}><p>Табель учета рабочего времени</p></div>
                <div className={c.table_title_item}></div>
            </div>
            <TableTimeSheet state={props.state } />
        </div>
    )
}

export default TimeSheetPage