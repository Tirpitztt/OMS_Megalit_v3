import * as React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    clearOrder,

    setPaymentThunkCreator,
    addComplectThunkCreator,
    addHandelThunkCreator,
    addMontazThunkCreator,
    deleteComplectThunkCreator,
    deleteDetailThunkCreator,
    deleteHandelThunkCreator,
    deleteMontazThunkCreator,
    editMontazThunkCreator,
    editSketchPathThunkCreator,
    editTextGravThunkCreator,
    editNoticeThunkCreator,
    editStatusThunkCreator,
    editTerminThunkCreator,
    setEditableOrderThunkCreator,
    isEdited,
    clearStateThunkCreator,
    setRateThunkCreator,
    deleteOrderThunkCreator,
    deleteSketchThunkCreator,
    addSketchFromPC,
    setComplActive,
    setHandelActive, setMontazActive, getEditableOrder
} from './../../../Redux/Redusers/editable-reduser'
import EditablePage from "./editable-page";


class EditableContainer extends React.Component{

    componentDidMount() {
        this.props.setRate()
    }

    componentWillUnmount() {
        this.props.clearOrder(this.props.state.editablePage);
    }


    render(){
        return(
            <EditablePage   state={this.props.state.editablePage}
                            setEditableState={this.props.setEditableState}
                            getEditableOrder={this.props.getEditableOrder}
                            setComplectActive={this.props.setComplectActive}
                            setHandelActive={this.props.setHandelActive}
                            setMontazActive={this.props.setMontazActive}
                            addComplect={this.props.addComplect}
                            addHandel={this.props.addHandel}
                            addMontaz={this.props.addMontaz}
                            sketchPathChange={this.props.sketchPathChange}
                            textChange={this.props.textChange}
                            noticeChange={this.props.noticeChange}
                            addPayment={this.props.addPayment}
                            deleteComplect={this.props.deleteComplect}
                            deleteDetail={this.props.deleteDetail}
                            deleteHandel={this.props.deleteHandel}
                            deleteMontaz={this.props.deleteMontaz}
                            deleteSketch={this.props.deleteSketch}
                            addSketch={this.props.addSketch}
                            editMontaz={this.props.editMontaz}
                            editStatus={this.props.editStatus}
                            editTermin={this.props.editTermin}
                            deleteOrder={this.props.deleteOrder}
            />

        )
    }
}

let mapStateToProps = (state)=>{
    return{state}
}
let mapDispatchToProps =(dispatch)=>{
    return{
        setRate:()=>{
            dispatch(setRateThunkCreator())
        },
        setEditableState:(id)=>{
            dispatch(setEditableOrderThunkCreator(id))
        },

        getEditableOrder:(body)=>{
            dispatch(getEditableOrder(body))
        },
        setComplectActive:()=>{
            dispatch(setComplActive())
        },
        setHandelActive:()=>{
            dispatch(setHandelActive())
        },
        setMontazActive:()=>{
            dispatch(setMontazActive())
        },
        addComplect:(body)=>{
            dispatch(addComplectThunkCreator(body))
        },
        addHandel:(body)=>{
            dispatch(addHandelThunkCreator(body))
        },
        addMontaz:(body)=>{
            dispatch(addMontazThunkCreator(body))
        },
        sketchPathChange:(body)=>{
            dispatch(editSketchPathThunkCreator(body))
        },
        textChange:(body)=>{
            dispatch(editTextGravThunkCreator(body))
        },
        noticeChange:(body)=>{
            dispatch(editNoticeThunkCreator(body))
        },
        addPayment:(body)=>{
            dispatch(setPaymentThunkCreator(body))
        },
        clearOrder:(state)=>{
            dispatch(clearStateThunkCreator(state))
        },
        isEdited:()=>{
            dispatch(isEdited())
        },

        setPayment:(body)=>{
            dispatch(setPaymentThunkCreator(body))
        },
        deleteComplect:(body)=>{
            dispatch(deleteComplectThunkCreator(body))
        },
        deleteDetail:(body)=>{
            dispatch(deleteDetailThunkCreator(body))
        },
        deleteHandel:(body)=>{
            dispatch(deleteHandelThunkCreator(body))
        },
        deleteMontaz:(body)=>{
            dispatch(deleteMontazThunkCreator(body))
        },
        deleteSketch:(body)=>{
            dispatch(deleteSketchThunkCreator(body))
        },
        addSketch:(body)=>{
            dispatch(addSketchFromPC(body))
        },
        editMontaz:(body)=> {
            dispatch(editMontazThunkCreator(body))
        },
        editStatus:(body)=> {
            dispatch(editStatusThunkCreator(body))
        },
        editTermin:(body)=> {
            dispatch(editTerminThunkCreator(body))
        },
        deleteOrder:(body)=>{
            dispatch(deleteOrderThunkCreator(body))
        }
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(EditableContainer)
