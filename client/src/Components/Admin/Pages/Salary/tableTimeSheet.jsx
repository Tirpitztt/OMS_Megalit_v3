import React from 'react';
import c from './salary.module.css'

const TableTimeSheet = (props) => {
    console.log(props)
    let usersRow = null
    let shiftsRow = null
    if (props.state.shiftsByMonth.length) {
        usersRow = props.state.shiftsByMonth.map((item, i) => {
            return <div className={c.table_row} key={i}>
                <div className={c.table_row_id}>{item.userId}</div>
                <div className={c.table_row_name}>{item.userName}</div>
            </div>
        })
        let daysArray = []
        for(let i = 0;i<31;i++){
            const day = <div className={c.table_day_box}></div>
            daysArray.push(day)
        }
        shiftsRow = props.state.shiftsByMonth.map((item,i)=>{

            return <div className={c.table_row} key={i}>
                {daysArray}
            </div>
        })

    }
    let daysBlocks = Array(31).fill(<div className={c.table_title_day_box}><div>01</div><div>tue</div></div>)

    
    return (
        <div className={c.table_container}>
            <div className={c.table_users}>
                <div className={c.table_title_row}>
                    <div className={c.table_title_month_row}>
                        <div></div>
                        <div>employee</div>
                        <div></div>
                    </div>
                    <div className={c.table_title_days_row}>grafs</div>
                </div>
                {usersRow }
            </div>
            <div className={c.table_timesheet}>
                <div className={c.table_title_row}>
                    <div className={c.table_title_month_row}>
                        <div>left</div>
                        <div>month</div>
                        <div>right</div>
                    </div>
                    <div className={c.table_title_days_row}>
                        {daysBlocks}
                    </div>
                </div>
                {shiftsRow}
            </div>
        </div>
    )
}

export default TableTimeSheet;