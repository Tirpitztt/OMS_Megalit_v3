import { salaryAPI } from "../../Api/api"
import {
    GET_SHIFTS_BY_MONTH,
    SET_INDIVIDUAL_SALARY_STATE,
    SET_SALARY_FORM_STATE,
    FORM_OPTIONS_CHANGE
} from "../../Utils/variables-const"


let initialState = {
    dataMonth: {
        monthDays:[]
    },
    individualSalaryState: {
        period: null,
        salaryOfPeriod: null,
        monthDays: [],
        salaryFormState: {
            date: '',
            shiftID: 0,
            salary:[]

        },
        formOptions: {
            workShop: 0,

        }
    },
    
    
    
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
            newState.individualSalaryState.salaryFormState.salary = []
            newState.individualSalaryState.period = { year: newState.dataMonth.year, month: newState.dataMonth.month }
            newState.individualSalaryState.salaryOfPeriod = { ...action.data }
            newState.individualSalaryState.monthDays = [...newState.dataMonth.monthDays]
            return newState
        }
        case SET_SALARY_FORM_STATE: {
            let newState = { ...state }
            newState.individualSalaryState.salaryFormState.salary = []//обнуляем массив работ
            newState.individualSalaryState.salaryFormState.date = action.data.date
            newState.individualSalaryState.salaryFormState.shiftID = action.data.shiftID
            if (newState.individualSalaryState.salaryOfPeriod) {
                let shiftsTemp = []
                for (let shift of newState.individualSalaryState.salaryOfPeriod.shifts) {
                    if (shift.id === action.data.shiftID) {
                        shiftsTemp.push(shift)
                    }
                }
                for (let item of shiftsTemp) {
                    if (item.salarys.length) {
                        for (let s of item.salarys) {
                            newState.individualSalaryState.salaryFormState.salary.push(s)
                        }
                    }
                }
            }
            return newState;
        }
        case FORM_OPTIONS_CHANGE: {
            let newState = { ...state }
            newState.individualSalaryState.formOptions.workShop = action.data
            return newState
        }
        
        default: return state
    }
}

export const getShiftsByMonth = (data) => ({ type: GET_SHIFTS_BY_MONTH, data })
export const getIndividualSalaryState = (data) => ({ type: SET_INDIVIDUAL_SALARY_STATE, data })
export const setSalaryFormState = (data) => ({ type: SET_SALARY_FORM_STATE, data })
export const setSalaryFormOptionChange = (data) => ({ type: FORM_OPTIONS_CHANGE,data })



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
            //console.log(data)
        })

    }
    
}
export const destroyMandate = (body) => {
    return (dispatch) => {
        salaryAPI.destroyMandate(body).then(data => {
            //console.log(data)
        })
    }
}


export default SalaryReduser