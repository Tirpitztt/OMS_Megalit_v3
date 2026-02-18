import { salaryAPI } from "../../Api/api"
import { GET_SHIFTS_BY_MONTH, SET_MONTH_TITLE_DAYS } from "../../Utils/variables-const"


let initialState = {
    shiftsByMonth: [],
    monthTitleDays: {}
}

const SalaryReduser = (state = initialState,action) => {
    switch (action.type) {
        case GET_SHIFTS_BY_MONTH: {
            let newState = { ...state }
            newState.shiftsByMonth = [...action.data]
            return newState
        }
        case SET_MONTH_TITLE_DAYS: {
            let newState = { ...state }
            newState.monthTitleDays = {month:action.data.month,monthDays:[...action.data.days]}
            return newState
        }
        default: return state
    }
}

export const getShiftsByMonth = (data) => ({ type: GET_SHIFTS_BY_MONTH, data })
export const setMonthTitleDays = (data) => ({ type: SET_MONTH_TITLE_DAYS,data })


export const getShiftsByMonthThunkCreator = (body) => {
    return (dispatch) => {
        salaryAPI.getShiftsByMonth(body).then(data => {
            dispatch(getShiftsByMonth(data))
        })
    }
}


export default SalaryReduser