const SET_ACTIVE = 'SET_ACTIVE';

let initialState = {
    active:false
}

const ModalReduser = (state=initialState,action)=>{

    switch (action.type){
        case SET_ACTIVE: {
            let newState = {...state};
            newState.active = action.bool;
            return newState;
        }
        default:return state;
    }
}

export const setActiveModal = (bool)=>({type:SET_ACTIVE,bool})


export default ModalReduser;