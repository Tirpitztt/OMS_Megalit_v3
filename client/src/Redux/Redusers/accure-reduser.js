import { ADD_EMPLOYEE_TO_GROUP, DEL_EMPLOYEE_FROM_GROUP, GET_EMPLOYEES_LIST } from "../../Utils/variables-const";



let initialState = {
    accureData: {
        employees: [],
        employeesListOP: [],
        operations:[]

    },
    shiftData: {
        date: '05-05-2026',
        workShop: 'заливка',
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
        case ADD_EMPLOYEE_TO_GROUP: {
            let newState = { ...state }
            newState.accureData.employeesShiftGroup.push(action.data)
            return newState
        }
        case DEL_EMPLOYEE_FROM_GROUP: {
            let newState = { ...state }
            newState.shiftData.employeesShiftGroup =
                newState.shiftData.employeesShiftGroup.filter((item) =>
                    item.id === action.data.id)
            return newState
        }
        default: return state
    }
}


export const getEmployeesList = (data) => ({ type: GET_EMPLOYEES_LIST,data })


export default AccureReduser;