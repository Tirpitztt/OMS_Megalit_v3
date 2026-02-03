import {mainAPI} from "../../Api/api";

const SET_CALC_STATE = 'SET_CALC_STATE'
const SET_CALC_OF_DATE = 'SET_CALC_OF_DATE'


let initialState = {
    calcInfo:{
        allCalculation:{},
        monthCalculation:{},
        lastYearCalculation:{},
        currentYearCalculation:{},
        equalsCalculation:[],


    }
}

const AdminStatisticsReduser = (state = initialState,action) => {
    switch(action.type){
        case SET_CALC_STATE:{
            let newState = {...state}
            newState.calcInfo.allCalculation = {...action.data.allCalculation}
            newState.calcInfo.monthCalculation = {...action.data.monthCalculation}
            newState.calcInfo.currentYearCalculation = {...action.data.currentYearCalculation}
            newState.calcInfo.equalsCalculation = [...action.data.equalsCalculation]
            return newState
        }
        case SET_CALC_OF_DATE:{
            let newState = {...state}
            newState.calcInfo.monthCalculation = {...action.data}
            return newState;
        }
        default:return state
    }
}


export const setCalcState = (data)=>({type:SET_CALC_STATE,data})
export const setCalcOfDate = (data)=>({type:SET_CALC_OF_DATE,data})

export const getCalcStateThunkCreator = () =>{
    return(dispatch)=>{
        mainAPI.getCalcState().then(data=>{
            dispatch(setCalcState(data))
        })
    }
}
export const getCalcOfDateThunkCreator = (body) => {
    return(dispatch)=>{
        mainAPI.getCalcOfDate(body).then(data=>{
            dispatch(setCalcOfDate(data))
        })
    }
}



export default AdminStatisticsReduser;
