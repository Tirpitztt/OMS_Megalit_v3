import * as React from 'react'
import EmployeesPage from "./employees-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    clearUserState,
    getAvatarsThunkCreator,
    setNewUser,
    setUserAvatar,
    setUserEdit,
    setUserFatherName,
    setUserLastName,
    setUserLogin,
    setUserName,
    setUserPassword,
    setUserAdress,
    setUserPhone,
    setUserWorkPhone,
    saveUserThunkCreator,
    updateUserThunkCreator,
    setUserDateAccept,
    setUserDepartment,
    setUserPosition,
    setUserMail,
    setUserRole,
    deleteUserThunkCreator,
    setUsersListThunkCreator,
    updatePasswordThunkCreator
} from "../../../../Redux/Redusers/user-reduser";

class EmployeesContainer extends React.Component{
    componentDidMount() {
        this.props.getUserAvatarsList()
        this.props.setUsersList()
    }
    render(){
        return(
            <EmployeesPage state={this.props.state.employeesPage}
                setUserEdit={this.props.setUserEdit}
                setUserLogin={this.props.setUserLogin}
                setUserLastName={this.props.setUserLastName}
                setUserName={this.props.setUserName}
                setUserFatherName={this.props.setUserFatherName}
                           setUserMail={this.props.setUserMail}
                           setUserRole={this.props.setUserRole}
                clearUserState={this.props.clearUserState}
                setNewUser={this.props.setNewUser}
                setUserPassword={this.props.setUserPassword}
                setUserAvatar={this.props.setUserAvatar}
                setUserAdress={this.props.setUserAdress}
                setUserPhone={this.props.setUserPhone}
                setUserWorkPhone={this.props.setUserWorkPhone}
                saveUser={this.props.saveUser}
                updateUser={this.props.updateUser}
                deleteUser={this.props.deleteUser }
                setUserDateAccept={this.props.setUserDateAccept}
                           setUserDepartment={this.props.setUserDepartment}
                           setUserPosition={this.props.setUserPosition}
                           updatePass={this.props.updatePass}

            />
        )
    }
}

let mapStateToProps = (state)=>{
    return {state}
}
let mapDispatchToProps = (dispatch)=>{
    return {
        setUsersList: () => {
            dispatch(setUsersListThunkCreator())
        },
        setUserEdit:(data)=>{
            dispatch(setUserEdit(data))
        },
        setUserLogin:(data)=>{
            dispatch(setUserLogin(data))
        },
        setUserLastName:(data)=>{
            dispatch(setUserLastName(data))
        },
        setUserName:(data)=>{
            dispatch(setUserName(data))
        },
        setUserFatherName:(data)=>{
            dispatch(setUserFatherName(data))
        },
        setUserRole:(data)=>{
            dispatch(setUserRole(data))
        },
        setUserMail:(data)=>{
            dispatch(setUserMail(data))
        },
        clearUserState:()=>{
            dispatch(clearUserState())
        },
        setNewUser:(bool)=>{
            dispatch(setNewUser(bool))
        },
        setUserPassword:(data)=>{
            dispatch(setUserPassword(data))
        },
        getUserAvatarsList:()=>{
            dispatch(getAvatarsThunkCreator())
        },
        setUserAvatar:(data)=>{
            dispatch(setUserAvatar(data))
        },
        setUserAdress: (data) => {
            dispatch(setUserAdress(data))
        },
        setUserPhone: (data) => {
            dispatch(setUserPhone(data))
        },
        setUserWorkPhone: (data) => {
            dispatch(setUserWorkPhone(data))
        },
        saveUser:(data)=>{
            dispatch(saveUserThunkCreator(data))
        },
        updateUser:(user)=>{
            dispatch(updateUserThunkCreator(user))
        },
        deleteUser: (user) => {
            dispatch(deleteUserThunkCreator(user))
        },
        setUserDateAccept: (data) => {
            dispatch(setUserDateAccept(data))
        },
        setUserDepartment:(data)=>{
            dispatch(setUserDepartment(data))
        },
        setUserPosition:(data)=>{
            dispatch(setUserPosition(data))
        },
        updatePass:(body)=>{
            dispatch(updatePasswordThunkCreator(body))
        }

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(EmployeesContainer)
