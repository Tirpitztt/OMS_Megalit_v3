import {calculationAPI, mainAPI, ordersAPI, supportAPI} from "../../Api/api";
import {setToday} from "../../Utils/dateTermin";
import {correctPrice} from "../../Utils/support";
import Card from "../../Utils/Classes/card";
import OrderBase from '../../Utils/Classes/orderBase'

const SET_CUSTOMER_STATE = 'SET_CUSTOMER_STATE';
const SET_ORDER_STATE = 'SET_ORDER_STATE'
const SET_EMPLOYER = 'SET_EMPLOYER';
const GET_MATERIALS = 'GET_MATERIALS';
const SET_FINDING_CUSTOMER='SET_FINDING_CUSTOMER';
const SET_ACTIVE_DETAIL = 'SET_ACTIVE_DETAIL';
const IS_DETAIL_ACTIVE = 'IS_DETAIL_ACTIVE';
const SET_COMPLECT = 'SET_COMPLECT';
const CORRECT_APPLY = 'CORRECT_APPLY';
const SET_ARTICUL_LIST = 'SET_ARTICUL_LIST'
const DELETE_COMPLECT = 'DELETE_COMPLECT';
const SET_DETAIL = 'SET_DETAIL';
const DELETE_DETAIL = 'DELETE_DETAIL';
const SET_HANDEL = 'SET_HANDEL';
const DELETE_HANDEL = 'DELETE_HANDEL';
const SET_MONTAZ = 'SET_MONTAZ';
const DELETE_MONTAZ = 'DELETE_MONTAZ';
const SET_TOTAL_COST= 'SET_TOTAL_COST';
const SET_TEXT_GRAVI = 'SET_TEXT-GRAVI';
const CHANGE_HYDRO = 'CHANGE_HYDRO';
const SET_SIZE_MONTAZ = 'SET_SIZE_MONTAZ';
const SET_DELIVERI = 'SET_DELIVERY';
const SET_DELIVERI_POINT = 'SET_DELIVERI_POINT';
const SET_GUARANTIES = 'SET_GUARANTIES';
const SET_TERMIN = 'SET_TERMIN';
const SET_PAYMENT = 'SET_PAYMENT';
const ADD_PAYMENT = 'ADD_PAYMENT'
const SET_DISCOUNT = 'SET_DISCOUNT';
const CHANGE_MAKER = 'CHANGE_MAKER';
const SET_UTM = 'SET_UTM';
const SET_STATUS_OK = 'SET_STATUS_OK';
const SET_NUMBER = 'SET_NUMBER';
const SET_SKETCH_PATH = 'SET_SKETCH_PATH';
const SET_CARDS_LIST = 'SET_CARDS_LIST';
const DELETE_CARD = 'DELETE_CARD'
const SET_NOTICE = 'SET_NOTICE';
const SET_PRINT_STATUS = 'SET_PRINT_STATUS'
const SET_AGREE_STATUS = 'SET_AGREE_STATUS'
const SET_EDIT_FALSE = 'SET_EDIT_FALSE'    //флаг на наличие изменений
const CLEAR_STATE = 'CLEAR_STATE';

let initialState = {
    isNewOrder:true,
    title:'Создание нового заказа',
    customer:{
        findingCustomer:{},
        allCustomers:[],
        customerIsOK:false
    },
    newOrder:{
        complects:[],
        handling:{
            id:0,
            hydrophob:false,
            text_grav:'',
            sketchPath:[],
            handling_items:[]
        },
        montaz:{
            id:0,
            size:'',
            delivery:0,
            delivery_point:'Бобруйск',
            guaranties:0,
            montaz_items:[],
            height:0,
            width:0,
            weight:0
        },
        calculation:{
            id:0,
            new_total_cost:0,
            discount:0,
            payments:[],
            rate:0
        },
        cardsList:[]
    },
    orderBase:OrderBase,
    orderOption:{
        orderId:0,
        today:'',
        termin:'',
        maker:'megalit',
        UTM:0,
        employer:{
            id:2,
            name:'света'
        },
        status:'принят',
        notice:''
    },
    isDetailActive:false,
    activeBetDetail:{},
    status_OK:true,
    number:null,
    materials:[],
    articulList:[],
    printStatus:false,
    agreeStatus:false,
    editFalse:true              //non edit

}

const NeworderReduser = (state=initialState, action)=>{

    switch(action.type){
        case SET_EMPLOYER:{
            let newState = {...state};
            newState.orderOption.employer = action.data;
            return newState;
        }
        case SET_CUSTOMER_STATE:{
            let newState = {...state};
            newState.customer.allCustomers = action.data;
            return newState;
        }
        case SET_ORDER_STATE:{
            //console.log(action.data)
            let newState = {...state}
            newState.isNewOrder = false
            newState.title = 'Изменение заказа № ' + action.data.order.number
            newState.number = action.data.order.number
            newState.orderOption.termin = action.data.order.termin.date_finish
            newState.orderOption.orderId = action.data.order.id
            newState.customer.findingCustomer = {...action.data.customer}
            newState.customer.customerIsOK = true
            newState.newOrder.complects = [...action.data.order.complects]
            newState.newOrder.handling = {...action.data.order.handling}
            newState.newOrder.montaz = {...action.data.order.montaz}
            newState.newOrder.cardsList = [...action.data.order.cards]
            newState.orderOption.notice = action.data.order.notice
            newState.orderOption.UTM = action.data.order.utm
            newState.newOrder.calculation.id = action.data.order.calculation.id
            newState.newOrder.calculation.new_total_cost = action.data.order.calculation.total_cost
            newState.newOrder.calculation.discount = action.data.order.calculation.discount
            newState.newOrder.calculation.payments = [...action.data.order.calculation.payments]

            return newState
        }
        case SET_FINDING_CUSTOMER:{
            let newState = {...state}
            newState.customer.findingCustomer = action.data;
            newState.customer.customerIsOK = true
            return newState;
        }
        case SET_ACTIVE_DETAIL:{
            let newState = {...state};
            newState.activeBetDetail = {...action.data}

            return newState;
        }
        case IS_DETAIL_ACTIVE:{
            let newState = {...state}
            newState.isDetailActive = action.data
            return newState;
        }
        case SET_COMPLECT:{
            let newState = {...state};
            //newState.orderBase.addToComplects(action.complect)  //экземпляр класса появляется только при обновлении страницы
            newState.newOrder.complects = [...state.newOrder.complects,action.complect];
            return newState;
        }
        case SET_ARTICUL_LIST:{
            let newState = {...state}
            newState.articulList = [...action.data]
            return newState
        }
        case CORRECT_APPLY:{
            let newState = {...state};
            newState.newOrder.complects.forEach((item)=>{
                if(item.id === action.data.num){
                    item = {...correctPrice(item,action.data.correct)}
                }
            })
            return newState;
        }
        case DELETE_COMPLECT:{
            let newState = {...state};
            let result = [];
            state.newOrder.complects.forEach((item)=>{
                if(item.id!==action.data){
                    result.push(item);
                }
            })
            newState.newOrder.complects=result;
            return newState;
        }
        case SET_MONTAZ:{
            let newState = {...state};
            newState.newOrder.montaz.montaz_items = [...state.newOrder.montaz.montaz_items,action.montaz];
            return newState;
        }
        case DELETE_MONTAZ:{
            let newState = {...state};
            newState.newOrder.montaz.montaz_items =
                newState.newOrder.montaz.montaz_items.filter(item=>item.id!==action.data);
            return newState;
        }
        case SET_SIZE_MONTAZ:{
            //console.log(action.data)
            let newState = {...state};
            switch (action.data.type){
                case 'width':{
                    newState.newOrder.montaz.width = action.data.size
                    break
                }
                case 'weight':{
                    newState.newOrder.montaz.weight = action.data.size
                    break
                }
                case 'height':{
                    newState.newOrder.montaz.height = action.data.size
                    break
                }

            }
            //newState.newOrder.montaz.size = action.data;
            return newState;
        }
        case SET_DELIVERI:{
            //console.log(action.data)
            let newState = {...state};
            newState.newOrder.montaz.delivery = action.data;
            return newState;
        }
        case SET_DELIVERI_POINT:{
            let newState = {...state};
            newState.newOrder.montaz.delivery_point = action.data;
            return newState;
        }
        case SET_GUARANTIES:{
            let newState = {...state};
            newState.newOrder.montaz.guaranties = action.data;
            return newState;
        }
        case SET_DETAIL:{
            let newState = {...state};
            newState.newOrder.complects = [...state.newOrder.complects];
            newState.newOrder.complects.forEach((item)=>{
                if(item.id==action.detail.complectId){
                    //console.log('reduse:',action.detail.price);
                    item.summComplect += ((action.detail.price)*(action.detail.amount));
                    item.complect_items.push(action.detail);
                }
            })
            return newState;
        }
        case DELETE_DETAIL:{
            let newState = {...state};
            let complects = [...state.newOrder.complects];
            complects.forEach((item)=>{
                if(item.id==action.data.complectId){
                    item.complect_items = item.complect_items.filter(detail=>detail.id!==action.data.id);
                    item.summComplect = 0
                    item.complect_items.forEach((detal)=>{
                        item.summComplect += ((detal.price) * (detal.amount))
                    })
                }
            })
            newState.newOrder.complects=[...complects];
            return newState;
        }
        case SET_HANDEL:{
            let newState = {...state};
            newState.newOrder.handling.handling_items = [...state.newOrder.handling.handling_items,action.handel];
            return newState;
        }
        case DELETE_HANDEL:{
            let newState = {...state};
            newState.newOrder.handling.handling_items =
                newState.newOrder.handling.handling_items.filter(hand=>hand.id!==action.data);
            return newState;
        }
        case SET_TOTAL_COST:{
            let newState = {...state};
            newState.newOrder.calculation.new_total_cost = action.data.totalCost;
            newState.newOrder.calculation.rate = action.data.calculationRate;
            return newState;
        }
        case SET_TEXT_GRAVI:{
            let newState = {...state};
            //newState.orderBase.handling.setText(action.data)  иногда не срабатывает, возможно не создается класс
            newState.newOrder.handling.text_grav = action.data;
            return newState;
        }
        case CHANGE_HYDRO:{
            let newState = {...state};
            newState.newOrder.handling.hydrophob = action.data;
            return newState;
        }
        case SET_TERMIN:{
            let newState = {...state};
            newState.orderOption.today = setToday();
            newState.orderOption.termin = action.data;
            return newState;
        }
        case SET_PAYMENT:{
            let newState = {...state};
            newState.newOrder.calculation.payments.push(action.data);
            return newState;
        }
        case ADD_PAYMENT:{
            let newState = {...state}
            newState.newOrder.calculation.payments = [...action.data]
            return newState
        }
        case SET_DISCOUNT:{
            let newState = {...state};
            newState.newOrder.calculation.discount = Number(action.data);
            return newState;
        }
        case CHANGE_MAKER:{
            let newState = {...state};
            newState.orderOption.maker = action.data;
            return newState;
        }
        case SET_UTM:{
            let newState = {...state};
            newState.orderOption.UTM = action.data;
            return newState;
        }
        case SET_STATUS_OK:{
            let newState = {...state};
            newState.status_OK = action.bool;
            return newState;
        }
        case SET_NUMBER:{
            let newState = {...state};
            newState.number = action.number;
            return newState;
        }
        case GET_MATERIALS:{
            let newState = {...state};
            newState.materials = action.data;
            return newState;
        }
        case SET_SKETCH_PATH:{
            let newState = {...state};
            newState.newOrder.handling.sketchPath.push(action.data);
            return newState;
        }
        case SET_CARDS_LIST:{
            let newState = {...state};
            const card = new Card();
            if(!newState.isNewOrder){
                card.setOrderId(newState.orderOption.orderId)
            }
            card.setType('new')
            card.setLink(action.data)
            newState.newOrder.cardsList.push(card)
            //console.log(newState.newOrder.cardsList)
            return newState;
        }
        case DELETE_CARD:{
            let newState = {...state}
            newState.newOrder.cardsList = newState.newOrder.cardsList.filter(item=>item.link!==action.data)
            return newState
        }
        case SET_NOTICE:{
            let newState = {...state};
            newState.orderOption.notice = action.data;
            return newState;
        }
        case SET_PRINT_STATUS:{
            let newState = {...state}
            newState.printStatus = action.data
            return newState
        }
        case SET_EDIT_FALSE:{
            let newState = {...state}
            newState.editFalse = action.data
            return newState
        }
        case SET_AGREE_STATUS:{
            let newState = {...state}
            newState.agreeStatus = action.data
            return newState
        }

        case CLEAR_STATE:{
            let newState = {
                isNewOrder:true,
                title:'Создание нового заказа',
                customer:{
                    findingCustomer:{},
                    allCustomers:[],
                    customerIsOK:false
                },
                newOrder:{
                    complects:[],
                    handling:{
                        id:0,
                        hydrophob:false,
                        text_grav:'',
                        sketchPath:[],
                        handling_items:[]
                    },
                    montaz:{
                        id:0,
                        size:'',
                        delivery:0,
                        delivery_point:'Бобруйск',
                        guaranties:0,
                        montaz_items:[],
                        height:0,
                        width:0,
                        weight:0
                    },
                    calculation:{
                        new_total_cost:0,
                        discount:0,
                        payments:[],
                        rate:0
                    },
                    cardsList:[]
                },
                orderOption:{
                    orderId:0,
                    today:'',
                    termin:'',
                    maker:'megalit',
                    UTM:0,
                    employer:{
                        id:2,
                        name:'света'
                    },
                    status:'принят',
                    notice:''
                },
                isDetailActive:false,
                activeBetDetail:{},
                status_OK:true,
                number:null,
                materials:[],
                articulList:[],
                printStatus:false,
                agreeStatus:false,
                editFalse:true
            };
            return newState;
        }
        default:return state
    }

}

export const setCustomerState = (data)=>({type:SET_CUSTOMER_STATE,data});
export const setOrderState = (data)=>({type:SET_ORDER_STATE,data})
export const setFindingCustomer = (data)=>({type:SET_FINDING_CUSTOMER,data});
export const setActiveDetail = (data)=>({type:SET_ACTIVE_DETAIL,data});
export const isDetailActive = (data)=>({type:IS_DETAIL_ACTIVE,data})
export const setEmployer = (data)=>({type:SET_EMPLOYER,data});
export const setComplect = (complect)=>({type:SET_COMPLECT,complect});
export const setArticulList = (data)=>({type:SET_ARTICUL_LIST,data})
export const correctApply = (data)=>({type:CORRECT_APPLY,data});
export const setMontaz = (montaz)=>({type:SET_MONTAZ,montaz});
export const setDetail = (detail)=>({type:SET_DETAIL,detail});
export const setNewTotalCost = (data)=>({type:SET_TOTAL_COST,data});
export const setTextGravi = (data)=>({type:SET_TEXT_GRAVI,data});
export const changeHydro = (data)=>({type:CHANGE_HYDRO,data});
export const setHandel = (handel)=>({type:SET_HANDEL,handel});
export const deleteDetail = (data)=>({type:DELETE_DETAIL,data});
export const deleteComplect = (data)=>({type:DELETE_COMPLECT,data});
export const deleteHandel = (data)=>({type:DELETE_HANDEL,data});
export const deleteMontaz = (data)=>({type:DELETE_MONTAZ,data});
export const setSizeMontaz = (data)=>({type:SET_SIZE_MONTAZ,data});
export const setDelivery = (data)=>({type:SET_DELIVERI,data});
export const setDeliveryPoint = (data)=>({type:SET_DELIVERI_POINT,data});
export const setGuaranties = (data)=>({type:SET_GUARANTIES,data});
export const setTermin = (data)=>({type:SET_TERMIN,data});
export const setPayment = (data)=>({type:SET_PAYMENT,data});
export const addPayment = (data)=>({type:ADD_PAYMENT,data})
export const setDiscount = (data)=>({type:SET_DISCOUNT,data});
export const changeMaker = (data)=>({type:CHANGE_MAKER,data});
export const setUTM = (data)=>({type:SET_UTM,data});
export const setStatusOK = (bool)=>({type:SET_STATUS_OK,bool});
export const setNumber = (number)=>({type:SET_NUMBER,number});
export const getMaterials = (data)=>({type:GET_MATERIALS,data});
export const setCardsList = (data)=>({type:SET_CARDS_LIST,data});
export const deleteCard = (data)=>({type:DELETE_CARD,data})
export const setSketchPath = (data)=>({type:SET_SKETCH_PATH,data});
export const setNotice = (data)=>({type:SET_NOTICE,data});
export const setPrintStatus = (data)=>({type:SET_PRINT_STATUS,data})
export const setAgreeStatus = (data)=>({type:SET_AGREE_STATUS,data})
export const setEditFalse = (data)=>({type:SET_EDIT_FALSE,data})
export const clear = ()=>({type:CLEAR_STATE});

export const getAllCustomersThunkCreator = ()=>{
    return(dispatch)=>{
        ordersAPI.getOnlyCustomers().then(data=>{
            dispatch(setCustomerState(data));
        })
    }
}
export const getOrderEditStateThunkCreator = (body)=>{
    return(dispatch)=>{
        ordersAPI.getEditable(body).then(data=>{
            if(data.status){
                dispatch(setOrderState(data))
            }

        })
    }
}
export const getMatThunkCreator = ()=>{
    return(dispatch)=>{
        supportAPI.getMaterials().then(data=>{
            dispatch(getMaterials(data));
        })
    }
}
export const findCustomerByIdThunkCreator = (id)=>{
    return(dispatch)=>{
        ordersAPI.getCustomerById(id).then(data=>{
            dispatch(setFindingCustomer(data));
        })
    }
}

export const createTotalCostThunkCreator = (order)=>{
    return(dispatch)=>{
        calculationAPI.createTotalCost(order).then(data=>{
            dispatch(setNewTotalCost(data));
        })
    }
}
export const addPaymentThunkCreator = (body)=>{
    return(dispatch)=>{
        calculationAPI.setPayment(body).then(data=>{
            console.log(data)
            dispatch(addPayment(data.order.calculation.payments))
        })
    }
}
export const createOrderThunkCreator = (state)=>{
    return(dispatch)=>{
        if(state.isNewOrder){
            ordersAPI.orderCreate(state).then(resp=>{
                console.log(resp)
                if(resp.status=='NOK'){
                    dispatch(setStatusOK(false));
                }else if(resp.status<400){
                    dispatch(setStatusOK(true));
                    dispatch(setPrintStatus(true));
                    dispatch(setNumber(resp.data.id));
                }
            })
        }else {
            //console.log('is not new order')
            ordersAPI.updateOrder(state).then(resp=>{
                if(resp.data){
                    dispatch(setAgreeStatus(true))
                }else{
                    dispatch(setEditFalse(false))
                }
                console.log(resp.data)
            })
        }

    }
}
export const standartComplectThunkCreator = (body)=>{
    return(dispatch)=>{
        supportAPI.getStandartKit(body).then(data=>{
            dispatch(setComplect(data))
            console.log(data)
        })
    }
}
export const addFileFromPC = (body) => {
    console.log(body.fd.get('recipe'))
    return(dispatch)=>{
        mainAPI.addFile(body.fd).then(data=>{
            dispatch(setCardsList(data.Location))
        })
    }
}


export default NeworderReduser;
