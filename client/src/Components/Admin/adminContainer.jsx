import * as React from 'react'
import AdminPage from "./admin-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addRatesThunkCreator,
    addUserThunkCreator,
    changeField,
    saveRateThunkCreator,
    setSelect,
    setStateThunkCreator,
    addMaterialThunkCreator,
    updateMaterialThunkCreator,
    addWorkOperationThunkCreator,
    updateWorkOperationThunkCreator,
    addStoneThunkCreator,
    editStoneThunkCreator, addGdsThunkCreator, editGdsThunkCreator,
} from "../../Redux/Redusers/admin-reduser";
import {
    addFieldToArray,
    addFieldToWork,
    fieldsArrClear, setEditGds, setEditStone,
    setFieldsArray,
    setState
} from "../../Redux/Redusers/form-reduser";


class AdminContainer extends React.Component{
    componentDidMount() {
        this.props.setState();
    }

    render(){
        return(
            <AdminPage state={this.props.state.adminPage}
                       formState={this.props.state.formState}
                       setFieldsArray={this.props.setFieldsArr}
                       addFieldToArray={this.props.addFieldToArr}
                       addFieldToWork={this.props.addFieldToWork}
                       clearStateFields={this.props.clearStateFields}
                       addRowMat={this.props.addRowMat}
                       changeField={this.props.changeField}
                       saveMat={this.props.saveMat}
                       addUser={this.props.addUser}
                       addMaterial={this.props.addMaterial}
                       editMaterial={this.props.editMaterial}
                       addOperation={this.props.addWorkOperation}
                       editOperation={this.props.updateWorkOperation}
                       addStone={this.props.addStone}
                       editStone={this.props.editStone}
                       setEditStone={this.props.setEditStone}
                       addGDS={this.props.addGDS}
                       editGDS={this.props.editGDS}
                       setEditGDS={this.props.setEditGDS}
                       selectEl={this.props.selectEl}/>
        )
    }

}

let mapStateToProps = (state)=>{
    return{state}
}
let mapDispatchToProps = (dispatch)=>{
    return {
        setState:()=>{
            dispatch(setStateThunkCreator());
        },
        addRowMat:()=>{
            dispatch(addRatesThunkCreator());
        },
        selectEl:(num)=>{
            dispatch(setSelect(num));
        },
        changeField:(body)=>{
            dispatch(changeField(body));
        },
        clearStateFields:()=>{
            dispatch(fieldsArrClear())
        },
        saveMat:(body)=>{
            dispatch(saveRateThunkCreator(body));
        },
        addUser:(body)=>{
            dispatch(addUserThunkCreator(body));
        },
        addMaterial:(body)=>{
            dispatch(addMaterialThunkCreator(body))
        },
        editMaterial:(body)=>{
            dispatch(updateMaterialThunkCreator(body))
        },
        addWorkOperation:(body)=>{
            dispatch(addWorkOperationThunkCreator(body))
        },
        updateWorkOperation:(body)=>{
            dispatch(updateWorkOperationThunkCreator(body))
        },
        setFormState:(data)=>{
            dispatch(setState(data))
        },
        setFieldsArr:(data)=>{
            dispatch(setFieldsArray(data))
        },
        addFieldToArr:(data)=>{
            dispatch(addFieldToArray(data))
        },
        addFieldToWork:(data)=>{
            dispatch(addFieldToWork(data))
        },
        addStone:(data)=>{
            dispatch(addStoneThunkCreator(data))
        },
        setEditStone:(data)=>{
            dispatch(setEditStone(data))
        },
        editStone:(data)=>{
            dispatch(editStoneThunkCreator(data))
        },
        addGDS:(data)=>{
            dispatch(addGdsThunkCreator(data))
        },
        editGDS:(data)=>{
           dispatch(editGdsThunkCreator(data))
        },
        setEditGDS:(data)=>{
            dispatch(setEditGds(data))
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(AdminContainer);
