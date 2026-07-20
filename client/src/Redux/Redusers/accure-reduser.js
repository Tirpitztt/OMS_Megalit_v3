import {
    ADD_EMPLOYEE_TO_GROUP, ADD_SALARY_ROW,
    CLEAR_ACCURE_STATE, DEL_EMPLOYEE_FROM_GROUP,
    FORM_SALARY_ROW_PUSH, GET_EMPLOYEES_LIST, SET_SHIFT_DATE, SET_WORKSHOP_VALUE
} from "../../Utils/variables-const";



let initialState = {
    accureData: {
        employees: [],
        employeesListOP: [],


    },
    shiftData: {
        date: '',
        workShop: null,
        employeesShiftGroup: []
    }

}

const AccureReduser = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEES_LIST: {
            let newState = { ...state }
            newState.accureData.employees = [...action.data]
            if (action.data.length) {
                newState.accureData.employeesListOP = action.data.map((item, i) => {
                    return <option key={i} value={item.id}>{item.name }</option>
                })
            }
            return newState
        }
        case SET_WORKSHOP_VALUE: {
            let newState = { ...state }
            newState.shiftData.workShop = action.data
            return newState
        }
        case ADD_EMPLOYEE_TO_GROUP: {
            let newState = { ...state }
            if(newState.shiftData.employeesShiftGroup.length){
                newState.shiftData.employeesShiftGroup = newState.shiftData.employeesShiftGroup.filter((item)=>
                    item.id !== action.data.id)
            }
            newState.shiftData.employeesShiftGroup.push(action.data)
            return newState
        }
        case SET_SHIFT_DATE: {
            let newState = { ...state }
            newState.shiftData.date = action.data
            newState.shiftData.employeesShiftGroup = []
            return newState
        }
        case DEL_EMPLOYEE_FROM_GROUP: {
            let newState = { ...state }
            newState.shiftData.employeesShiftGroup =
                newState.shiftData.employeesShiftGroup.filter((item) =>
                    item.id !== action.data.id)
            return newState
        }
        case ADD_SALARY_ROW:{
            let newState = {...state}
            for(let item of newState.shiftData.employeesShiftGroup){
                let salaryData = {...action.data}
                salaryData.shiftID = item.shifts[0].id
                item.shifts[0].salarys.push(salaryData)
            }
            return newState
        }
        case CLEAR_ACCURE_STATE:{
            let newState = {...state}
            newState.shiftData.employeesShiftGroup = []
            return newState
        }
        default: return state
    }
}


export const getEmployeesList = (data) => ({ type: GET_EMPLOYEES_LIST, data })
export const setShiftDate = (data) => ({ type: SET_SHIFT_DATE, data })
export const setWorkShopValue = (data) => ({ type: SET_WORKSHOP_VALUE, data })
export const addEmployeeToGroup = (data) => ({ type: ADD_EMPLOYEE_TO_GROUP,data })
export const delEmployeeFromGroup = (data) => ({type:DEL_EMPLOYEE_FROM_GROUP,data})
export const addSalaryRowToShift = (data) => ({type:ADD_SALARY_ROW,data})
export const clearAccureState = () => ({type:CLEAR_ACCURE_STATE})

export default AccureReduser;