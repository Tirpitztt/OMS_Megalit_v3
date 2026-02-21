import React from 'react';
import c from './salary.module.css'
import TableTimeSheet from './tableTimeSheet';

const TimeSheetPage = (props) => {
    let year = null
    if (props.state.dataMonth.year) {
        year = props.state.dataMonth.year
    }
    return (
        <div className={c.table_box}>
            <div className={c.table_title_box}>
                <div className={c.table_title_item}><p>Табель учета рабочего времени {year }г.</p></div>
                <div className={c.table_title_item}></div>
            </div>
            <TableTimeSheet state={props.state}
                            nextMonthData={props.nextMonthData}
                            prewMonthData={props.prewMonthData}
            />
        </div>
    )
}

export default TimeSheetPage