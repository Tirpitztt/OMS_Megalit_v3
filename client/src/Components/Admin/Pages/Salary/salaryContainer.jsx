import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import SalaryPage from "./salary-page";
import { getShiftsByMonthThunkCreator } from '../../../../Redux/Redusers/salary-reduser';
//import { getMonthDays} from '../../../../Utils/dateTermin';

class SalaryContainer extends React.Component{
    componentDidMount() {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth() + 1
        this.props.getShiftsByMonth({ year: currentYear, month: currentMonth })
        
    }
    render() {
        return(
            <SalaryPage state={this.props.state.salaryPage}
                        getShiftsByMonth={this.props.getShiftsByMonth}
                

            />
        )
    }
}
let mapStateToProps = (state) => {
    return {state}
}
let mapDispatchToProps = (dispatch) => {
    return {
        getShiftsByMonth: (body) => {
            dispatch(getShiftsByMonthThunkCreator(body))
        },
        

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)