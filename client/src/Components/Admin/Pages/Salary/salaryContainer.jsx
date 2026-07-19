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
    pushSalaryRow,

} from '../../../../Redux/Redusers/salary-reduser';
import {
    addEmployeeToGroupThunkCreator,
    getEmployeesListThunkCreator,
    signSalaryToShiftThunkCreator
} from '../../../../Redux/Redusers/CommonFiles/thunks';
import {
    addSalaryRowToShift,
    clearAccureState, delEmployeeFromGroup,
    setShiftDate,
    setWorkShopValue
} from '../../../../Redux/Redusers/accure-reduser';
import {
    clearSupportFormState,
    setPolishModelValue,
    setProcessingChange,
    sizeDetailChange
} from '../../../../Redux/Redusers/form-reduser';
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
                accureState={this.props.state.accurePage}
                supportFormState={this.props.state.formState.supportFormState }
                getShiftsByMonth={this.props.getShiftsByMonth}
                getEmployeesList={this.props.getEmployeesList}
                saveShiftByUser={this.props.saveShiftByUser}
                setShiftDate={this.props.setShiftDate}
                setWorkShopValue={this.props.setWorkShopValue}
                addEmployeeToGroup={this.props.addEmployeeToGroup}
                        delEmployeeFromGroup={this.props.delEmployeeFromGroup}
                destroyMandate={this.props.destroyMandate}
                getIndividualSalaryState={this.props.getIndividualSalaryState}
                setSalaryFormState={this.props.setSalaryFormState}
                getDetailsList={this.props.getDetailsList}
                setWorkOperationName={this.props.setWorkOperationName}
                getWorkOperationsGroup={this.props.getWorkOperationsGroup}
                setSalaryFormOptionChange={this.props.setSalaryFormOptionChange}
                addSalaryRowToShift={this.props.addSalaryRowToShift}
                        //
                pushSalaryRow={this.props.pushSalaryRow}
                        //
                signSalaryShift={this.props.signSalaryShift}
                getDetailsListSort={this.props.getDetailsListSort}
                setPolishModelValue={this.props.setPolishModelValue}
                        sizeDetailChange={this.props.sizeDetailChange}
                        setProcessingChange={this.props.setProcessingChange}
                        clearFormOptions={this.props.clearFormOptions}
                        clearAccureState={this.props.clearAccureState}
                        clearSupportForm={this.props.clearSupportForm}
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
        getEmployeesList: (body) => {
            dispatch(getEmployeesListThunkCreator(body))
        },
        setShiftDate: (date) => {
            dispatch(setShiftDate(date))
        },
        setWorkShopValue: (data) => {
            dispatch(setWorkShopValue(data))
        },
        addEmployeeToGroup: (data) => {
            dispatch(addEmployeeToGroupThunkCreator(data))
        },
        delEmployeeFromGroup:(data) => {
          dispatch(delEmployeeFromGroup(data))
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
          //dispatch(pushSalaryRow(data))
        },
        addSalaryRowToShift:(data) => {
            dispatch(addSalaryRowToShift(data))
        },
        signSalaryShift: (data) => {
            dispatch(signSalaryToShiftThunkCreator(data))
        },
        setPolishModelValue: (data) => {
            dispatch(setPolishModelValue(data))
        },
        sizeDetailChange:(data)=>{
            dispatch(sizeDetailChange(data))
        },
        setProcessingChange:(data)=>{
            dispatch(setProcessingChange(data))
        },
        clearFormOptions:()=>{
            dispatch(clearFormOptions())
        },
        clearAccureState:()=>{
            dispatch(clearAccureState())
        },
        clearSupportForm:() => {
            dispatch(clearSupportFormState())
        }
        

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)