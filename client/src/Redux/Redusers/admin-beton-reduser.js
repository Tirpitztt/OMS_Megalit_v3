import {supportAPI,betonAPI} from "../../Api/api";
import {detailSort, getBetonMixPrice} from "../../Utils/support";


const SET_BETON_STATE = 'SET_STATE';
const BETON_DETAILS_SORT = 'BETON_DETAILS_SORT';



let initialState = {
    rate:[],
    stone:[],
    materials:[],
    workOperations:[],
    matOptions:[],
    workOptions:[],
    mixOptions:[],
    beton:{
        beton_mixes:[],
        beton_details:[]
    }

}

const BetonReduser = (state=initialState,action)=>{
    switch (action.type){
        case SET_BETON_STATE:{
            let newBetonState = {...state};
            newBetonState.rate = [...action.data.rate];
            newBetonState.stone = [...action.data.mat];
            newBetonState.materials = [...action.data.materials_build];
            newBetonState.workOperations = [...action.data.workOperations];
            newBetonState.beton.beton_mixes = [...getBetonMixPrice([...action.data.betonMix],[...action.data.materials_build])]
            newBetonState.beton.beton_details = [...action.data.betonDetails]
            newBetonState.matOptions = action.data.materials_build.map((item,i)=>{
                return <option key={item.id} value={item.id}>{item.name}({item.measure})</option>
            })
            newBetonState.workOptions = action.data.workOperations.map((item,i)=>{
                return <option key={item.id} value={item.id}>{item.name}({item.measure})</option>
            })
            newBetonState.mixOptions = newBetonState.beton.beton_mixes.map((item,i)=>{
                return <option key={item.id} value={item.id}>{item.articul}({item.measure})</option>
            })
            return newBetonState
        }
        case BETON_DETAILS_SORT:{
            let newState = {...state};
            let sortedArr = detailSort(action.data)
            newState.beton.beton_details = [...sortedArr]
            return newState;
        }
        default:return state
    }
}

export const setBetonState = (data)=>({type:SET_BETON_STATE,data});
export const betonDetailsSort = (data)=>({type:BETON_DETAILS_SORT,data})



export const setBetonStateThunkCreator = ()=>{
    return(dispatch)=>{
        betonAPI.getBetonState().then(data=>{
            dispatch(setBetonState(data))
        })
    }
}

export const updateBetonMixThunkCreator = (body)=>{
    return(dispatch)=>{
        betonAPI.updateBetonMix(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setBetonState(data))
                })
            }

        })
    }
}

export const addBetonMixThunkCreator = (body)=>{
    return(dispatch)=>{
        betonAPI.addBetonMix(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setBetonState(data))
                })
            }
        })
    }
}
export const deleteIngredientsThunkCreator = (body)=>{
    return(dispatch)=>{
        betonAPI.deleteIngredient(body).then(data=>{

        })
    }
}
export const addBetonDetailThunkCreator = (body)=>{
    return(dispatch)=>{
        betonAPI.addBetonDetail(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setBetonState(data))
                })
            }
        })
    }
}
export const updateBetonDetailThunkCreator = (body)=>{
    return(dispatch)=>{
        betonAPI.updateBetonDetail(body).then(data=>{
            if(data){
                betonAPI.getBetonState().then(data=>{
                    dispatch(setBetonState(data))
                })
            }
        })
    }
}





export default BetonReduser;
