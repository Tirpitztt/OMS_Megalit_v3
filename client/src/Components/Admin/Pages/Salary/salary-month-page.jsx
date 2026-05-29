import React from 'react';
import c from './salary.module.css'

const SalaryMonthPage = (props) => {
    return (
        <div>
            <div onClick={()=>props.changePage(0) }>back</div>
            <div>salary-month</div>
            <div>{JSON.stringify(props.state) }</div>
        </div>
       
    )
}

export default SalaryMonthPage;