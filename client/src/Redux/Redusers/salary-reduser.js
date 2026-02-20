import { salaryAPI } from "../../Api/api"
import { GET_SHIFTS_BY_MONTH } from "../../Utils/variables-const"


let initialState = {
    dataMonth: {
        monthDays:[]
    }
    
    
}

const SalaryReduser = (state = initialState,action) => {
    switch (action.type) {
        case GET_SHIFTS_BY_MONTH: {
            let newState = { ...state }
            newState.dataMonth = { ...action.data }
            
            return newState
        }
        
        default: return state
    }
}

export const getShiftsByMonth = (data) => ({ type: GET_SHIFTS_BY_MONTH, data })



export const getShiftsByMonthThunkCreator = (body) => { //создание состояния
    return (dispatch) => {
        salaryAPI.getShiftsByMonth(body).then(data => {
            dispatch(getShiftsByMonth(data))
        })
    }
}


export default SalaryReduser