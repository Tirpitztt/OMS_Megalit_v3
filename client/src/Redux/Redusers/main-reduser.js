import { mainAPI} from "../../Api/api";


const SET_MAIN_STATE = 'SET_MAIN_STATE';
const GET_ALL = 'GET_ALL';
const GET_ORDER_ID = 'GET_ORDER_ID';
const FIND_ORDER_OF_NAME = 'FIND_ORDER_OF_NAME';


let initialState = {
    user:{},
    adminInfo:{
        orderStatistic:{
            allOrders:0,
            orangeOrders:[],
            redOrders:[],
            inReady:[],
            inVol:[],
            inGrav:[],
            inPolyr:[],
            inCut:[],
            inNew:[],
            inPour:[],
            inLoad:[],
            utmPoint:[0,0,0,0,0,0,0,0]
        },
        balance:{
            totalCost:0,
            avanses:0,
            balance:0,
            paymentCash:0,
            paymentBank:0,
        },
        versionInfo:{
            edited:[],
            added:[]
        },
        calcInfo:{
            allTime:{},
            currentMonth:{},
            currentYear:{}
        }

    },
    news:[]
}

const MainReduser = (state=initialState,action)=>{
    switch(action.type){
        case SET_MAIN_STATE:{
            let newState = {...state}
            newState.adminInfo.balance = {...action.data.adminInfo.balance}
            newState.adminInfo.calcInfo.allTime = {...action.data.adminInfo.balance}
            newState.adminInfo.orderStatistic = {...action.data.adminInfo.orderStatistic}

            //console.log(action.data.adminInfo.orderStatistic)
            newState.news = [...action.data.news].reverse()
            newState.news.forEach(function(item){
                if(item.comments){

                }else{
                    item.comments = [] // костыль чтобы создать массив в случае отсутствия комментов
                }
            })

            return newState
        }
        case GET_ALL: {
            return state;
        }
        case GET_ORDER_ID:{
            return state;
        }
        case FIND_ORDER_OF_NAME:{
            return state;
        }

        default:return state;
    }
}


export const setMainState = (data)=>({type:SET_MAIN_STATE,data})

export const setMainStateThunkCreator = ()=>{
    return(dispatch)=>{
        mainAPI.getMainState().then(data=>{
            dispatch(setMainState(data))
        })
    }
}
export const addArticleThunkCreator = (body)=>{
    return(dispatch)=>{
        mainAPI.addArticle(body).then(data=>{
            if(data){
                mainAPI.getMainState().then(data=>{
                    dispatch(setMainState(data))
                })
            }
        })
    }
}
export const editArticleThunkCreator = (body) => {
    return(dispatch)=>{
        mainAPI.editArticle(body).then(data=>{
            if(data){
                mainAPI.getMainState().then(data=>{
                    dispatch(setMainState(data))
                })
            }
        })
    }
}
export const deleteArticleThunkCreator = (body) => {
    return(dispatch)=>{
        mainAPI.deleteArticle(body).then(data=>{
            if(data){
                mainAPI.getMainState().then(data=>{
                    dispatch(setMainState(data))
                })
            }
        })
    }
}
export const addCommentThunkCreator = (body)=>{
    return(dispatch)=>{
        mainAPI.addComment(body).then(data=>{
            if(data){
                mainAPI.getMainState().then(data=>{
                    dispatch(setMainState(data))
                })
            }

        })
    }
}
export const deleteCommentThunkCreator = (body) => {
    return(dispatch)=>{
        mainAPI.deleteComment(body).then(data=>{
            if(data){
                mainAPI.getMainState().then(data=>{
                    dispatch(setMainState(data))
                })
            }
        })
    }
}

export const addFile = (body) => {
    return()=>{
        console.log(body)
        mainAPI.addFile(body).then(data=>{
            console.log('reduser',data)
        })
    }
}

export default MainReduser;

