import {calculationAPI, mainAPI, ordersAPI, supportAPI} from "../../Api/api";
import Card from "../../Utils/Classes/card";

const SET_RATE = 'SET_RATE'
const SET_COMPL_ACTIVE = 'SET_COMPL_ACTIVE'
const SET_HANDEL_ACTIVE = 'SET_HANDEL_ACTIVE'
const SET_MONTAZ_ACTIVE = 'SET_MONTAZ_ACTIVE'
const EDITABLE_ORDER = 'EDITABLE_ORDER'
const ADD_COMPLECT = 'ADD_COMPLECT'
const ADD_HANDEL = 'ADD_HANDEL'
const ADD_MONTAZ = 'ADD_MONTAZ'
const SKETCH_PATH_CHANGE = 'SKETCH_PATH_CHANGE'
const TEXT_CHANGE = 'TEXT_CHANGE';
const NOTICE_CHANGE = 'NOTICE_CHANGE'
// const ADD_PAYMENT = 'ADD_PAYMENT'
const SET_ORIGINAL = 'SET_ORIGINAL';
const IS_EDITED = 'IS_EDITED';
const EMPLOYER_ID = 'EMPLOYER_ID'
const CLEAR_ORDER = 'CLEAR_ORDER';
const SET_FOUND = 'SET_FOUND'


let initialState = {
    order:false,
    originalOrder:{},
    isEdited:false,
    employerId:0,
    rate:[],
    isFound:true,
    activatorSections:{
        complectActive:true,
        handelActive:false,
        montazActive:false
    }
            }

const EditableReduser = (state=initialState,action)=>{
    switch(action.type){
        case SET_RATE:{
            let newState = {...state}
            newState.rate = [...action.data]
            return newState
        }
        case SET_COMPL_ACTIVE:{
            let newState = {...state}
            newState.activatorSections.complectActive = true
            newState.activatorSections.handelActive = false
            newState.activatorSections.montazActive = false
            return newState
        }
        case SET_HANDEL_ACTIVE:{
            let newState = {...state}
            newState.activatorSections.complectActive = false
            newState.activatorSections.handelActive = true
            newState.activatorSections.montazActive = false
            return newState
        }
        case SET_MONTAZ_ACTIVE:{
            let newState = {...state}
            newState.activatorSections.complectActive = false
            newState.activatorSections.handelActive = false
            newState.activatorSections.montazActive = true
            return newState
        }

        case EDITABLE_ORDER:{
            let newState = {...state}
            let sketchList = [];
            //console.log('red:',action.data)
            newState.order = {...action.data}
            if(newState.order.order){
                newState.order.order.complects.forEach(function(item){
                    item.summComplect = 0;
                    item.complect_items.forEach(function(det){
                        item.summComplect += det.price * det.amount
                    })
                })
            }
            // парсим ссылки на картинки и запихиваем их в массив
            // if(typeof newState.order.order.handling.sketch_path === 'string'){
            //     if(newState.order.order.handling.sketch_path.startsWith('[')){
            //         let list = JSON.parse(newState.order.order.handling.sketch_path)
            //         newState.order.order.handling.sketch_path = [...list]
            //     }else if(newState.order.order.handling.sketch_path.startsWith('http')){
            //         sketchList.push(newState.order.order.handling.sketch_path);
            //         newState.order.order.handling.sketch_path = [...sketchList]
            //     }
            // }else {
            //     newState.order.order.handling.sketch_path = []
            // }

            newState.isFound = true
            return newState;
        }
        case SET_FOUND:{
            let newState = {...state}
            newState.isFound = false;
            return newState
        }
        case SET_ORIGINAL:{
            let newState = {...state}
            newState.originalOrder = {...action.data.order}
            return newState;
        }
        case IS_EDITED:{
            let newState = {...state}
            newState.isEdited = true;
            return newState;
        }
        case EMPLOYER_ID:{
            let newState = {...state}
            newState.employerId = action.data;
            return newState;
        }
        case ADD_COMPLECT:{
            let newState = {...state}
            newState.order.order.complects.push({...action.data})
            newState.order.order.complects.forEach(function(item){
                item.complect_items.forEach(function(det){
                    item.summComplect += det.price * det.amount
                })
            })
            return newState
        }
        case ADD_HANDEL:{
            let newState = {...state}
            newState.order.order.handling.handling_items.push({...action.data})
            return newState
        }
        case ADD_MONTAZ:{
            let newState = {...state}
            newState.order.order.montaz.montaz_items.push({...action.data})
            return newState
        }
        case SKETCH_PATH_CHANGE:{
            let newState = {...state}
            newState.order.order.handling.sketch_path = action.data
            return newState
        }
        case TEXT_CHANGE:{
            let newState = {...state}
            newState.order.order.handling.text_grav = action.data
            return newState
        }
        case NOTICE_CHANGE:{
            let newState = {...state}
            newState.order.order.notice = action.data
            return newState
        }
        // case ADD_PAYMENT:{
        //     let newState = {...state}
        //     newState.order.order.calculation.payments.push({...action.data})
        //     return newState
        // }
        case CLEAR_ORDER:{
            let newState = {...state};
            newState.order = false;
            newState.isEdited = false;
            newState.isFound = true
            return newState;
        }
        default:return state;
    }
}


export const getEditableOrder = (data)=>({type:EDITABLE_ORDER,data})
export const setComplActive = ()=>({type:SET_COMPL_ACTIVE})
export const setHandelActive = ()=>({type:SET_HANDEL_ACTIVE})
export const setMontazActive = ()=>({type:SET_MONTAZ_ACTIVE})
export const addComplect = (data)=>({type:ADD_COMPLECT,data})
export const addHandel = (data)=>({type:ADD_HANDEL,data})
export const addMontaz = (data)=>({type:ADD_MONTAZ,data})
export const sketchPathChange = (data)=>({type:SKETCH_PATH_CHANGE,data})
export const textChange = (data)=>({type:TEXT_CHANGE,data})
//export const addPayment = (data)=>({type:ADD_PAYMENT,data})
export const noticeChange = (data)=>({type:NOTICE_CHANGE,data})
export const setOriginalOrder = (data)=>({type:SET_ORIGINAL,data})
export const isEdited = ()=>({type:IS_EDITED})
export const setEmployerId = (data)=>({type:EMPLOYER_ID,data})
export const setRate = (data)=>({type:SET_RATE,data})
export const setFound = ()=>({type:SET_FOUND})

export const clearOrder = ()=>({type:CLEAR_ORDER})


export const setEditableOrderThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editOrder(body.orderId).then(data=>{
            if(data.isFind){
                dispatch(setEmployerId(body.userId))
                dispatch(getEditableOrder(data))
                dispatch(setOriginalOrder(data))
            }else{
                dispatch(setFound())
            }
        })
    }
}
export const setRateThunkCreator = () => {
    return(dispatch)=>{
        supportAPI.getRates().then(data=>{
            dispatch(setRate(data))
        })
    }
}
export const setPaymentThunkCreator = (body)=>{
    return(dispatch)=>{
        calculationAPI.setPayment(body).then(data=>{
            dispatch(getEditableOrder(data))
        })
    }
}
export const addComplectThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.addComplect(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const addHandelThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.addHandling(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const addMontazThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.addMontaz(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const deleteComplectThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.deleteComplect(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
// export const deleteDetailThunkCreator = (body) => {
//     return(dispatch)=>{
//         ordersAPI.deleteDetail(body).then(data=>{
//             if(data.status){
//                 calculationAPI.totalCostUpdate(body).then(data=>{
//                     if(data.status){
//                         ordersAPI.getEditable(body).then(data=>{
//                             dispatch(getEditableOrder(data))
//                             dispatch(isEdited())
//                         })
//                     }
//                 })
//             }
//         })
//     }
// }

export const deleteDetailThunkCreator = (body) => {
    return(dispatch)=>{

    }
}
export const deleteHandelThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.deleteHandling(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const deleteSketchThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.deleteSketch(body).then(data=>{
            if(data){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const deleteMontazThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.deleteMontaz(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const editMontazThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editMontaz(body).then(data=>{
            if(data.status){
                calculationAPI.totalCostUpdate(body).then(data=>{
                    if(data.status){
                        ordersAPI.getEditable(body).then(data=>{
                            dispatch(getEditableOrder(data))
                            dispatch(isEdited())
                        })
                    }
                })
            }
        })
    }
}
export const editTextGravThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editTextGrav(body).then(data=>{
            if(data.status){
                ordersAPI.getEditable(body).then(data=>{
                    dispatch(getEditableOrder(data))
                    dispatch(isEdited())
                })
            }
        })
    }
}
export const editSketchPathThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editSketchPath(body).then(data=>{
            if(data.status){
                ordersAPI.getEditable(body).then(data=>{
                    dispatch(getEditableOrder(data))
                    dispatch(isEdited())
                })
            }
        })
    }
}
export const addSketchFromPC = (body) =>{
    return(dispatch)=>{
        mainAPI.addFile(body.fd).then(data=>{
            //console.log(data)
            const card = new Card();
            card.setLink(data.Location)
            card.setOrderId(body.orderId)
            ordersAPI.editSketchPath(card).then(d=>{
                if(d.status){
                    ordersAPI.getEditable(body).then(dt=>{
                        dispatch(getEditableOrder(dt))
                        dispatch(isEdited())
                    })
                }
            })
        })
    }
}
export const editNoticeThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editNotice(body).then(data=>{
            if(data.status){
                ordersAPI.getEditable(body).then(data=>{
                    dispatch(getEditableOrder(data))
                })
            }
        })
    }
}
export const editStatusThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editStatus(body).then(data=>{
            if(data.status){
                ordersAPI.getEditable(body).then(data=>{
                    dispatch(getEditableOrder(data))
                })
            }
        })
    }
}
export const editTerminThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.editTermin(body).then(data=>{
            if(data.status){
                ordersAPI.getEditable(body).then(data=>{
                    dispatch(getEditableOrder(data))
                    dispatch(isEdited())
                })
            }
        })
    }
}
export const clearStateThunkCreator = (state) => {
        //console.log('clear',state)
    let body = {}
    if(state.order){ // костыль если стейт пустой
        body = {
            orderId:state.order.order.id,
            employerId:state.employerId,
            before:state.originalOrder,
            after:state.order.order
        }
    }

    return(dispatch)=>{
            if(state.isEdited && Object.keys(body).length){
                ordersAPI.addEditHistory(body).then(data=>{
                    console.log(data)
                })
            }
        dispatch(clearOrder())
    }
}

export const deleteOrderThunkCreator = (body) => {
    return(dispatch)=>{
        ordersAPI.deleteOrder(body).then(data=>{
            if(data.status === 'HUI'){
                //придумать какую-то затычку
                dispatch(clearOrder())
            }
            dispatch(clearOrder())
        })
    }
}

export default EditableReduser;
