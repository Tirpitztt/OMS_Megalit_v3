import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import SalaryPage from "./salary-page";
import { getShiftsByMonthThunkCreator } from '../../../../Redux/Redusers/salary-reduser';

class SalaryContainer extends React.Component{
    componentDidMount() {

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
        }

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)