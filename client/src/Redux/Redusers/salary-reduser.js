import { salaryAPI, supportAPI } from "../../Api/api"
import { getShiftStatus } from "../../Utils/adminSupport"
import {
    GET_SHIFTS_BY_MONTH,
    SET_INDIVIDUAL_SALARY_STATE,
    SET_SALARY_FORM_STATE,
    FORM_OPTIONS_CHANGE,
    SET_WORK_OPERATION_NAME,
    GET_WORK_OPERATIONS, FORM_BASE, SELECT_WORK_OPERATION, CLEAR_FORM_OPTIONS, DETAILS_LIST_SORT,
    GET_WORK_OPERATIONS_INIT, FORM_SALARY_ROW_PUSH, STELA_SORT_CHECK, TUMB_SORT_CHECK, OTHER_SORT_CHECK, ALL_SORT_CHECK, BLACK_SORT_CHECK, WHITE_SORT_CHECK, GRAY_SORT_CHECK, RED_SORT_CHECK
} from "../../Utils/variables-const"
import {sortDetailParamsBuilder} from "../../Utils/support";


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
            status:null,
            salary:[]

        },
        formOptions: {
            workShop: FORM_BASE,
            baseActive:false,
            workOperationsInit:[],
            workOperations:[],
            detailsList: [],
            detailsListSort: [],
            sortParams: {det:[],colors:[]},
            sortCheckBoxList:[
                STELA_SORT_CHECK,TUMB_SORT_CHECK,OTHER_SORT_CHECK,ALL_SORT_CHECK
            ],
            sortColorCheckBoxList: [
                BLACK_SORT_CHECK, WHITE_SORT_CHECK, GRAY_SORT_CHECK, RED_SORT_CHECK
            ]

        },
        salaryCalculateBody: {
            workOperationID: 0,
            workOperationName: '',
            workOperationNotice: '',
            workShopID: 0,
            workOperationCost: 0,
            workOperationAmount: 0,
            workOperationSumma:0
        }
    },
    
    
    
}

const SalaryReduser = (state = initialState,action) => {
    switch (action.type) {
        case GET_SHIFTS_BY_MONTH: {
            //console.log('month state:', action.data)
            let newState = { ...state }
            newState.dataMonth = { ...action.data }
            return newState
        }
        case SET_INDIVIDUAL_SALARY_STATE: {
            //console.log('indsalarsnane',action.data)
            let newState = { ...state }
            newState.individualSalaryState.salaryFormState.salary = []
            newState.individualSalaryState.period = { year: newState.dataMonth.year, month: newState.dataMonth.month }
            newState.individualSalaryState.salaryOfPeriod = { ...action.data }
            newState.individualSalaryState.monthDays = [...newState.dataMonth.monthDays]
            return newState
        }
        case SET_SALARY_FORM_STATE: {
            //console.log('formstate',action.data)
            let newState = { ...state }
            newState.individualSalaryState.salaryFormState.salary = []//обнуляем массив работ
            newState.individualSalaryState.salaryFormState.date = action.data.date
            newState.individualSalaryState.salaryFormState.shiftID = action.data.shiftID
            if (newState.individualSalaryState.salaryOfPeriod) {
                let shiftsTemp = []
                for (let shift of newState.individualSalaryState.salaryOfPeriod.shifts) {
                    if (shift.id === action.data.shiftID) {
                        shiftsTemp.push(shift)
                        newState.individualSalaryState.formOptions.baseActive = true
                        newState.individualSalaryState.salaryFormState.status = getShiftStatus(shift)
                    }else if(!action.data.shiftID){
                        newState.individualSalaryState.salaryFormState.status = 'нет смены'
                        newState.individualSalaryState.formOptions.baseActive = false
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
        case GET_WORK_OPERATIONS_INIT:{
            let newState = {...state}
            newState.individualSalaryState.formOptions.workOperationsInit = [...action.data]
            return newState
        }
        case GET_WORK_OPERATIONS: {
            let newState = { ...state }
            let tempArr = action.data.map((item,i)=>{
                return <option key={i} value={item.id} >{item.name}</option>
            })
            newState.individualSalaryState.formOptions.workOperations = [...tempArr]
            return newState;
        }
        case FORM_OPTIONS_CHANGE: {
            let newState = { ...state }
            newState.individualSalaryState.formOptions.workShop = action.data
            return newState
        }
        
        case SELECT_WORK_OPERATION:{
            let newState = {...state}
            newState.individualSalaryState.formOptions.detailsList = [...action.data]
            
            return newState
        }
        case DETAILS_LIST_SORT: {
            let newState = { ...state }
            //console.log(action.data)
            let params = newState.individualSalaryState.formOptions.sortParams
            if(action.data.val === 'all'){
                newState.individualSalaryState.formOptions.sortParams = {det:[],colors:[]}
                for (const item of newState.individualSalaryState.formOptions.sortCheckBoxList){
                    if(item.value === action.data.val){
                        item.checkON()
                    }else{
                        item.checkOFF()
                    }
                }
                for (const item of newState.individualSalaryState.formOptions.sortColorCheckBoxList){
                    item.checkOFF()
                }
                return newState
            }
            if (action.data.type === 1 && action.data.val !== 'all') {
                for (const item of newState.individualSalaryState.formOptions.sortCheckBoxList) {
                    if (item.value === action.data.val) {
                        item.checkON()
                        params.det = [...sortDetailParamsBuilder(action.data.val)]
                    } else {
                        item.checkOFF()
                    }
                }
            } else if (action.data.type === 2) {
                for (const item of newState.individualSalaryState.formOptions.sortColorCheckBoxList) {
                    if (item.value === action.data.val && item.checked) {
                        item.checkOFF()
                        params.colors = params.colors.filter((color) => {
                            return color !== action.data.val}  )
                    }else if(item.value === action.data.val && !item.checked) {
                        item.checkON()
                        params.colors.push(item.value)
                    }
                }
            }
            //console.log(params)
            newState.individualSalaryState.formOptions.sortParams = {...params}

            return newState
        }

        case CLEAR_FORM_OPTIONS:{
            let newState = {...state}
            newState.individualSalaryState.salaryFormState.status = 'нет смены'
            newState.individualSalaryState.formOptions.baseActive = false
            return newState
        }
        default: return state
    }
}

export const getShiftsByMonth = (data) => ({ type: GET_SHIFTS_BY_MONTH, data })
export const getIndividualSalaryState = (data) => ({ type: SET_INDIVIDUAL_SALARY_STATE, data })
export const setSalaryFormState = (data) => ({ type: SET_SALARY_FORM_STATE, data })
export const setSalaryFormOptionChange = (data) => ({ type: FORM_OPTIONS_CHANGE, data })
export const setWorkOperationName = (data) => ({ type: SET_WORK_OPERATION_NAME, data })
export const getWorkOperations = (data) => ({ type: GET_WORK_OPERATIONS,data })
export const getWorkOperationsInit = (data)=>({type:GET_WORK_OPERATIONS_INIT,data})
export const selectWorkOperation = (data) => ({ type: SELECT_WORK_OPERATION, data })
export const getDetailsListSort = (data) => ({ type: DETAILS_LIST_SORT,data })
export const pushSalaryRow = (data)=>({type:FORM_SALARY_ROW_PUSH,data})
export const clearFormOptions = ()=>({type:CLEAR_FORM_OPTIONS})



export const getShiftsByMonthThunkCreator = (body) => { //создание состояния
    
    return (dispatch) => {
        salaryAPI.getShiftsByMonth(body).then(data => {
            //console.log('main state',data)
            dispatch(getShiftsByMonth(data))
        })
        supportAPI.getWorkOperations().then(data=>{
            dispatch(getWorkOperations(data))
            dispatch(getWorkOperationsInit(data))
        })
    }
}
export const getWorkOperationsThunkCreator = (body) => {
    return (dispatch) => {
        supportAPI.getWorkOperationsGroup(body).then(data => {
            dispatch(getWorkOperations(data))
            dispatch(setSalaryFormOptionChange(body.type))
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
export const getDetailsListThunkCreator = (body) => {
    return (dispatch) => {
        
        salaryAPI.getDetailsGroup(body).then(data => {
            
            dispatch(selectWorkOperation(data))
        })


    }
}
export const signSalaryOfShiftThunkCreator = (body) => {
    return (dispatch) => {
        salaryAPI.signSalaryShift(body).then(data => {
            
            if (data.length) {
                salaryAPI.getShiftsByMonth(body.period).then(data => {
                    let salaryDataUser = { shifts: [], userId: body.salaryOfPeriod.userId, userName: body.salaryOfPeriod.userName }
                    dispatch(getShiftsByMonth(data))
                    for (let user of data.users) {
                        if (salaryDataUser.userId === user.userId) {
                            salaryDataUser.shifts = [...user.shifts]
                        }
                    }
                    dispatch(getIndividualSalaryState(salaryDataUser))
                    dispatch(setSalaryFormState({shiftID:body.shiftID,date:body.date}))
                })
            }
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