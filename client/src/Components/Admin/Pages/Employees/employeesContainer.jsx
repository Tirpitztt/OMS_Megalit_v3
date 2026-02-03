import * as React from 'react'
import EmployeesPage from "./employees-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    clearUserState, getAvatarsThunkCreator, setNewUser, setUserAvatar,
    setUserEdit,
    setUserFatherName,
    setUserLastName,
    setUserLogin,
    setUserName, setUserPassword
} from "../../../../Redux/Redusers/user-reduser";

class EmployeesContainer extends React.Component{
    componentDidMount() {
        this.props.getUserAvatarsList()
    }
    render(){
        return(
            <EmployeesPage  state={this.props.state.employeesPage}
                            setUserEdit={this.props.setUserEdit}
                            setUserLogin={this.props.setUserLogin}
                            setUserLastName={this.props.setUserLastName}
                            setUserName={this.props.setUserName}
                            setUserFatherName={this.props.setUserFatherName}
                            clearUserState={this.props.clearUserState}
                            setNewUser={this.props.setNewUser}
                            setUserPassword={this.props.setUserPassword}
                            setUserAvatar={this.props.setUserAvatar}

            />
        )
    }
}

let mapStateToProps = (state)=>{
    return {state}
}
let mapDispatchToProps = (dispatch)=>{
    return{
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
        }

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(EmployeesContainer)
