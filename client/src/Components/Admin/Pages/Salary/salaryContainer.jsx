import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import SalaryPage from "./salary-page";
import {
    getShiftsByMonthThunkCreator,
    saveShiftByUserThunkCreator,
    destroyMandate,
    getIndividualSalaryState,
    setSalaryFormState,
    setWorkOperationName,
    getWorkOperationsThunkCreator
} from '../../../../Redux/Redusers/salary-reduser';
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
                saveShiftByUser={this.props.saveShiftByUser}
                destroyMandate={this.props.destroyMandate}
                getIndividualSalaryState={this.props.getIndividualSalaryState}
                setSalaryFormState={this.props.setSalaryFormState}

                setWorkOperationName={this.props.setWorkOperationName}
                getWorkOperationsGroup={this.props.getWorkOperationsGroup}

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
        saveShiftByUser: (body) => {
            dispatch(saveShiftByUserThunkCreator(body))
        },
        destroyMandate: (body) => {
            dispatch(destroyMandate(body))
        },
        getIndividualSalaryState: (data) => {
            dispatch(getIndividualSalaryState(data))
        },
        setSalaryFormState: (data) => {
            dispatch(setSalaryFormState(data))
        },

        setWorkOperationName: (data) => {
            dispatch(setWorkOperationName(data))
        },
        getWorkOperationsGroup: (data) => {
            dispatch(getWorkOperationsThunkCreator(data))
        }
        

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)