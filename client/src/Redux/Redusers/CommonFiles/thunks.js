import { usersAPI } from "../../../Api/api"
import { addEmployeeToGroup, getEmployeesList } from "../accure-reduser"

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
            dispatch(addEmployeeToGroup(data))
        })
    }
}