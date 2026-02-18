import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import SalaryPage from "./salary-page";
import { getShiftsByMonthThunkCreator, setMonthTitleDays } from '../../../../Redux/Redusers/salary-reduser';
import { getMonthDays} from '../../../../Utils/dateTermin';

class SalaryContainer extends React.Component{
    componentDidMount() {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()+1
        this.props.getShiftsByMonth({ dateStart: currentYear + '-' + currentMonth + '-' + 31, dateEnd: currentYear + '-' + currentMonth + '-' + 1 })
        this.props.setMonthTitleDays({ month: currentMonth, days: getMonthDays(currentYear, currentMonth-1) })
    }
    render() {
        return(
            <SalaryPage state={this.props.state.salaryPage}
                getShiftsByMonth={this.props.getShiftsByMonth}
                setMonthTitleDays={this.props.setMonthTitleDays}

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
        setMonthTitleDays: (body) => {
            dispatch(setMonthTitleDays(body))
        }

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)