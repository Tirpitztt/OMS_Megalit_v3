import {useEffect, useState} from "react";
import {usersAPI} from "../Api/api";


export const useUsers = ()=>{
    let [users,setUsers] = useState([]);
    useEffect(()=>{
        usersAPI.getAllUsers().then(data=>{
            setUsers(data);
        })
    },[])
    //console.log('hook users:',users);
    return {users};
}
