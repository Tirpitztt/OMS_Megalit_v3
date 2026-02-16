import React from 'react';
import c from './salary.module.css'

const TableTimeSheet = (props) => {
    console.log(props)
    let usersRow = null
    if (props.state.shiftsByMonth.length) {
        usersRow = props.state.shiftsByMonth.map((item, i) => {
            return <div className={c.table_row} key={i}>
                <div className={c.table_row_id}>{item.userId}</div>
                <div className={c.table_row_name}>{item.userName}</div>
            </div>
        })
    }
    
    return (
        <div className={c.table_container}>
            <div className={c.table_users}>{usersRow }</div>
            <div className={c.table_timesheet}></div>
        </div>
    )
}

export default TableTimeSheet;