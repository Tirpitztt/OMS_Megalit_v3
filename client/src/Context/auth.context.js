import {createContext} from 'react';

function noop(){};

export const AuthContext = createContext({
    token:null,
    userId:null,
    userRole:null,
    userName:null,
    userSettings:null,
    login:noop,
    logout:noop,
    isAuth:false
})
