import {betonAPI, salaryAPI, usersAPI} from "../../../Api/api"
import { addEmployeeToGroup, getEmployeesList } from "../accure-reduser"
import {clearDetailsListOnly, clearSupportFormState} from "../form-reduser";

export const getEmployeesListThunkCreator = (body) => {
    return (dispatch) => {
        usersAPI.getUsersGroup(body).then(data => {
            dispatch(getEmployeesList(data))
        })
    }
}

export const addEmployeeToGroupThunkCreator = (body) => {
    return (dispatch) => {
        //console.log(body)
        usersAPI.getUserSalaryInfo(body).then(data => {
            if(data){
                dispatch(addEmployeeToGroup(data))
            }

        })
    }
}

export const signSalaryToShiftThunkCreator = (body) => {
    console.log(body)
    return(dispatch) => {
        salaryAPI.signSalaryShift(body).then(data=>{
            //console.log(data)
            if(data){
                usersAPI.getUserSalaryInfo({id:body.id,date:body.date}).then(data=>{
                    dispatch(addEmployeeToGroup(data))
                })
            }
        })
    }
}

export const addDetailsListToStorageThunkCreator = (body) => {
    return(dispatch) => {
        betonAPI.addDetailsListToStorage(body).then(data=>{
            dispatch(clearDetailsListOnly())
        })
    }
}