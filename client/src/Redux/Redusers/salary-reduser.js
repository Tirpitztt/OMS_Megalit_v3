import { salaryAPI } from "../../Api/api"
import { GET_SHIFTS_BY_MONTH, SET_INDIVIDUAL_SALARY_STATE } from "../../Utils/variables-const"


let initialState = {
    dataMonth: {
        monthDays:[]
    },
    individualSalaryState: {
        period: null,
        salaryOfPeriod: null,
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
        case SET_INDIVIDUAL_SALARY_STATE: {
            let newState = { ...state }
            newState.individualSalaryState.period = { year: newState.dataMonth.year, month: newState.dataMonth.month }
            newState.individualSalaryState.salaryOfPeriod = { ...action.data }
            newState.individualSalaryState.monthDays = [...newState.dataMonth.monthDays]
            return newState
        }
        
        default: return state
    }
}

export const getShiftsByMonth = (data) => ({ type: GET_SHIFTS_BY_MONTH, data })
export const getIndividualSalaryState = (data) => ({ type: SET_INDIVIDUAL_SALARY_STATE,data })



export const getShiftsByMonthThunkCreator = (body) => { //создание состояния
    console.log(body)
    return (dispatch) => {
        salaryAPI.getShiftsByMonth(body).then(data => {
            dispatch(getShiftsByMonth(data))
        })
    }
}
export const saveShiftByUserThunkCreator = (body) => {
    return (dispatch) => {
        salaryAPI.saveShiftByUser(body).then(data=>{
            salaryAPI.getShiftsByMonth({year:body.year,month:body.month}).then(data => {
                dispatch(getShiftsByMonth(data))
            })
            console.log(data)
        })

    }
    
}
export const destroyMandate = (body) => {
    return (dispatch) => {
        salaryAPI.destroyMandate(body).then(data => {
            console.log(data)
        })
    }
}


export default SalaryReduser