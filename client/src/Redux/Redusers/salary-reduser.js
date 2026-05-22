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