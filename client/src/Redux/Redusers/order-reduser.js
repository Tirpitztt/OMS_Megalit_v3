import {calculationAPI, createOrderAPI, ordersAPI} from "../../Api/api";

const SET_STATE = 'SET_STATE';
const SET_BOOL_ORDER = 'SET_BOOL_ORDER';
const CHANGE_STATE = 'CHANGE_STATE';
const CHANGE_TERMIN = 'CHANGE_TERMIN';
const SET_PRICE = 'SET_PRICE';
const UP_STATE='UP_STATE';

let initialState = {
    customer:{},
    order:{},
    material:{},
    price:0,
    isOrder:false
}

const OrderReduser = (state=initialState,action)=>{

    switch (action.type){
        case SET_STATE:{
            let newState = {...state};
            newState.customer = {...action.data.customer};
            newState.order = {...action.data.order};
            newState.material = {...action.data.material};
            return newState;
        }
        case SET_BOOL_ORDER:{
            let newState = {...state};
            newState.isOrder = action.bool;
            return newState;
        }
        case CHANGE_STATE:{
            let newState = {...state};
            let newData = {...action.data};
            switch(newData.type){
                case 'customer':{
                    for(let field in newData.customer){
                        if(field in newState.customer){
                            newState.customer[field] = newData.customer[field];
                        }
                    }
                    break;
                }
                case 'termin':{
                    for(let field in newData.termin){
                        if(field in newState.order.termin){
                            newState.order.termin[field] = newData.termin[field];
                        }
                    }
                    break;
                }
            }

            return newState;
        }
        case UP_STATE:{
            let newState = {...state};
            return newState;
        }
        case SET_PRICE:{
            let newState = {...state};
            newState.price = action.data.price;
            return newState;
        }

        default:return state;

    }

}


export const setState = (data)=>({type:SET_STATE,data});
export const trueOrder = (bool)=>({type:SET_BOOL_ORDER,bool});
export const changeState = (data)=>({type:CHANGE_STATE,data});
export const setPrice = (data)=>({type:SET_PRICE,data});


export const getOrderThunkCreator = (number)=>{
    return(dispatch)=>{
        ordersAPI.getOrder(number).then(data=>{
            dispatch(setState(data));
            dispatch(trueOrder(true));
        })
    }
}

export const saveChangeThunkCreator = (body)=>{
    return(dispatch)=>{
        ordersAPI.changeOrder(body).then(data=>{
        })
    }
}
export const getPriceThunkCreator = (body,flag)=>{
    if(flag){
        return(dispatch)=>{
            dispatch(setPrice({price:0}))
        }
    }
    return(dispatch)=>{
        calculationAPI.priceCreate(body).then(data=>{
            dispatch(setPrice(data));
        })
    }
}
export const createComplectThunkCreator = (body)=>{
    return(dispatch)=>{
        createOrderAPI.createComplect(body).then(data=>{
        })
    }

}




export default OrderReduser;