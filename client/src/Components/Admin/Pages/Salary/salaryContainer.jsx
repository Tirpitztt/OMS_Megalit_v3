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
    getWorkOperationsThunkCreator,
    getDetailsListThunkCreator,
    setSalaryFormOptionChange,
    clearFormOptions,
    getDetailsListSort,
    pushSalaryRow
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
                getDetailsList={this.props.getDetailsList}
                setWorkOperationName={this.props.setWorkOperationName}
                getWorkOperationsGroup={this.props.getWorkOperationsGroup}
                setSalaryFormOptionChange={this.props.setSalaryFormOptionChange}
                clearFormOptions={this.props.clearFormOptions}
                        pushSalaryRow={this.props.pushSalaryRow}
                getDetailsListSort={this.props.getDetailsListSort }

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
        },
        getDetailsList:(body)=>{
            dispatch(getDetailsListThunkCreator(body))
        },
        setSalaryFormOptionChange:(body)=>{
            dispatch(setSalaryFormOptionChange(body))
        },
        getDetailsListSort: (data) => {
            dispatch(getDetailsListSort(data))
        },
        pushSalaryRow:(data) => {
          dispatch(pushSalaryRow(data))
        },
        clearFormOptions:()=>{
            dispatch(clearFormOptions())
        }
        

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)