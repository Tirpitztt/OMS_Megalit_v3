import {betonAPI, stoneAPI, supportAPI, usersAPI} from "../../Api/api";
import {getWeightStone} from "../../Utils/adminSupport";

const SET_STATE = 'SET_STATE';
const SET_SELECT = 'SET_SELECT';
const CHANGE_FIELD = 'CHANGE_FIELD';

let initialState = {
    rate:[],
    stone:[],
    stoneUI:'',
    materials:[],
    worksOperations:[],
    gds:[],
    details:[],
    selectEl:0,
    adminButtons:{
        employees:{path:'/admin/employees',text:'Сотрудники'},
        beton:{path:'/admin/beton',text:'Бетон'},
        tokar:{path:'/admin/tokar',text:'Токарка'},
        salary:{path:'/admin/salary',text:'Зарплата'},
    }

}

const AdminReduser = (state=initialState,action)=>{
    switch (action.type){
        case SET_STATE:{
            let newState = {...state};
            newState.rate = [...action.data.rate];
            newState.stone = [...action.data.mat];
            newState.stoneUI = newState.stone.map((item,i)=>{
                return {
                    id:item.id,
                    name:item.name,
                    country:item.country,
                    color:item.color,
                    ratio:item.ratio,
                    t2:getWeightStone(item.slabs,2),
                    t3:getWeightStone(item.slabs,3),
                    t5:getWeightStone(item.slabs,5),
                    t8:getWeightStone(item.slabs,8),
                    t10:getWeightStone(item.slabs,10),
                    t12:getWeightStone(item.slabs,12),
                    t15:getWeightStone(item.slabs,15),
                    t20:getWeightStone(item.slabs,20),
                    t25:getWeightStone(item.slabs,25),
                    t30:getWeightStone(item.slabs,30)
                }
            })
            newState.materials = [...action.data.materials_build];
            newState.worksOperations = [...action.data.workOperations];
            newState.gds = [...action.data.gds]
            newState.details = [...action.data.betonDetails, ...action.data.gds]
            return newState
        }
        case SET_SELECT:{
            let newState = {...state};
            newState.selectEl = action.data;
            return newState;
        }
        case CHANGE_FIELD:{
            let newState = {...state};
            newState.rate.forEach((item)=>{
                if(item.id===action.data.id){
                    item[action.data.field] = action.data.value;
                }
            })
            return newState;
        }
        default:return state
    }
}

export const setState = (data)=>({type:SET_STATE,data});
export const setSelect = (data)=>({type:SET_SELECT,data});
export const changeField = (data)=>({type:CHANGE_FIELD,data});

export const setStateThunkCreator = ()=>{
    return(dispatch)=>{
        betonAPI.getBetonState().then(data=>{
            dispatch(setState(data))
        })
    }
}
export const addRatesThunkCreator = ()=>{
    let body = {
        name:'name',
        USD:0.0,
        EUR:0.0,
        RUR:0.0,
        BLR:0.0
    }
    return(dispatch)=>{
        supportAPI.addRates(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}

export const saveRateThunkCreator = (body)=>{
    return(dispatch)=>{
        supportAPI.updateRates(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const updateMaterialThunkCreator = (body) => {
    return(dispatch)=>{
        supportAPI.updateMaterial(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const addMaterialThunkCreator = (body) => {
    return (dispatch) => {
        supportAPI.addMaterial(body).then(data => {
            if (data) {
                betonAPI.getBetonState().then(data => {
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const addWorkOperationThunkCreator = (body) => {
    return(dispatch) => {
        supportAPI.addWorkOperation(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data => {
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const updateWorkOperationThunkCreator = (body) => {
    return(dispatch)=>{
        supportAPI.updateWorkOperation(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const addStoneThunkCreator = (body) => {
    return(dispatch)=>{
        stoneAPI.addStone(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const editStoneThunkCreator = (body) => {
    return(dispatch)=>{
        stoneAPI.editStone(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const addGdsThunkCreator = (body) => {
    return(dispatch)=>{
        supportAPI.addGds(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const editGdsThunkCreator = (body) => {
    return(dispatch)=>{
        supportAPI.editGds(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setState(data))
                })
            }
        })
    }
}
export const addUserThunkCreator = (body)=>{
    return(dispatch)=>{
        usersAPI.registrationUser(body).then(data=>{

        })
    }
}



export default AdminReduser;
