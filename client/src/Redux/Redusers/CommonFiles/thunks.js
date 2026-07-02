import { usersAPI } from "../../../Api/api"
import { getEmployeesList } from "../accure-reduser"

export const getEmployeesListThunkCreator = (body) => {
    return (dispatch) => {
        usersAPI.getUsersGroup(body).then(data => {
            dispatch(getEmployeesList(data))
        })
    }
}