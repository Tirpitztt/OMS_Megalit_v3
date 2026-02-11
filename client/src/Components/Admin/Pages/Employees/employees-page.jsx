import React, {useContext, useState} from 'react';
import c from './employees.module.css'
import {UserContext} from './../../../../Context/user.context'
import {NavLink} from "react-router-dom";
import UsersList from "./users-list";
import UserItem from "./user-item";

const EmployeesPage = (props) => {

    const users = useContext(UserContext)
    const [user,setUser] = useState(null)

    console.log(props.state)

    let display = null

    if(users.length){
        display = <UsersList users={users}
                             state={props.state}
                             setNewUser={props.setNewUser}
                             setUserEdit={props.setUserEdit}
                             setUser={setUser}/>
    }
    if(user){
        display = <UserItem user={user}
                            state={props.state}
                            setUser={setUser}
                            setUserLogin={props.setUserLogin}
                            setUserLastName={props.setUserLastName}
                            setUserName={props.setUserName}
                            setUserFatherName={props.setUserFatherName}
                            clearUserState={props.clearUserState}
                            setUserPassword={props.setUserPassword}
                            setUserAvatar={props.setUserAvatar}
                            setUserAdress={props.setUserAdress}
                            setUserPhone={props.setUserPhone}
                            setUserWorkPhone={props.setUserWorkPhone}
                            saveUser={props.saveUser}
                            updateUser={props.updateUser}
                            />
    }


    return (
        <div className={c.content_box}>
            <div className={c.header}>
                <div className={c.header_title}><p>Сотрудники</p></div>
                <div className={c.header_button_box}>

                </div>
            </div>
            <div className={c.content}>
                {display}
            </div>

        </div>
    );
};

export default EmployeesPage;
