import User from "../../Utils/Classes/User";
import {SET_USER_EDIT,
    SET_USER_LOGIN,
    SET_USER_NAME,
    SET_USER_FATHERNAME,
    CLEAR_USER_STATE,
    SET_USER_LASTNAME,
    SET_NEW_USER,
    SET_USER_PASSWORD,
    SET_USER_AVATARS_LIST,
    SET_USER_AVATAR
} from "../../Utils/variables-const"
import {supportAPI} from "../../Api/api";


let initialState = {
    user: new User(),
    isNewUser:false,
    avatarsList:[]
}

const UserReduser = (state = initialState,action)=>{
    switch (action.type) {
        case SET_USER_EDIT:{
            let newState = {...state}
            newState.user.setUser(action.data)
            return newState
        }
        case SET_USER_LOGIN:{
            let newState = {...state}
            newState.user.login = action.data
            return newState
        }
        case SET_USER_LASTNAME:{
            let newState = {...state}
            newState.user.lastName = action.data
            return newState
        }
        case SET_USER_NAME:{
            let newState = {...state}
            newState.user.name = action.data
            return newState
        }
        case SET_USER_FATHERNAME:{
            let newState = {...state}
            newState.user.fatherName = action.data
            return newState
        }
        case CLEAR_USER_STATE:{
            let newState = {...state}
            newState.user = new User()
            newState.isNewUser = false
            return newState
        }
        case SET_NEW_USER:{
            let newState = {...state}
            newState.isNewUser = action.bool
            return newState
        }
        case SET_USER_PASSWORD:{
            let newState = {...state}
            newState.user.password = action.data
            return newState
        }
        case SET_USER_AVATARS_LIST:{
            let newState = {...state}
            action.data.Contents.forEach((item,i)=>{
                if(i>0){
                    newState.avatarsList.push(item.Key)
                }
            })
            return newState

        }
        case SET_USER_AVATAR:{
            let newState = {...state}
            newState.user.settings.avatar = action.data
            return newState
        }
        default: return state
    }
}

export const setUserEdit = (data)=>({type:SET_USER_EDIT,data})
export const setUserLogin = (data)=>({type:SET_USER_LOGIN,data})
export const setUserLastName = (data)=>({type:SET_USER_LASTNAME,data})
export const setUserName = (data)=>({type:SET_USER_NAME,data})
export const setUserFatherName = (data)=>({type:SET_USER_FATHERNAME,data})
export const clearUserState = ()=>({type:CLEAR_USER_STATE})
export const setNewUser = (bool)=>({type:SET_NEW_USER,bool})
export const setUserPassword = (data)=>({type:SET_USER_PASSWORD,data})
export const setUserAvatarList = (data)=>({type:SET_USER_AVATARS_LIST,data})
export const setUserAvatar = (data)=>({type:SET_USER_AVATAR,data})

export const getAvatarsThunkCreator = () => {
    return(dispatch)=>{
        supportAPI.getAvatars().then(data=>{
            dispatch(setUserAvatarList(data))
        })
    }
}

export default UserReduser;
