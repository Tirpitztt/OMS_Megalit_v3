import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import BetonPage from "./beton-page";
import {
    addBetonDetailThunkCreator,
    addBetonMixThunkCreator, betonDetailsSort, deleteIngredientsThunkCreator,
    setBetonStateThunkCreator, updateBetonDetailThunkCreator, updateBetonMixThunkCreator,
} from "../../../../Redux/Redusers/admin-beton-reduser";
import {
    setState,
    setEditElement,
    setFieldsArray,
    addFieldToArray,
    fieldsArrClear, addFieldToWork, addFieldToMat, setEditDetail
} from "../../../../Redux/Redusers/form-reduser";

class BetonContainer extends React.Component{
    componentDidMount() {
        this.props.setBetonState();
        //console.log('bet-cont')
    }

    render(){
        return(
            <BetonPage state={this.props.state.betonPage}
                       adminState={this.props.state.adminPage}
                       formState={this.props.state.formState}
                       setFieldsArr={this.props.setFieldsArr}
                       addFieldToArr={this.props.addFieldToArr}
                       addFieldToMat={this.props.addFieldToMat}
                       addFieldToWork={this.props.addFieldToWork}
                       updateBetMix={this.props.updateBetMix}
                       updateBetonDetail={this.props.updateBetonDetail}
                       clearFields={this.props.fieldsArrClear}
                       addBetonMix={this.props.addBetonMix}
                       addBetonDetail={this.props.addBetonDetail}
                       detailsSort={this.props.betonDetailsSort}
                       deleteIngredient={this.props.deleteIngredient}
                       setEditElement={this.props.setEdEl}
                       setEditDetail={this.props.setEdDetail}
            />
        )
    }

}

let mapStateToProps = (state)=>{
    return{state}
}
let mapDispatchToProps = (dispatch)=>{
    return {
        setBetonState:()=>{
            dispatch(setBetonStateThunkCreator());
        },
        setEdEl:(data)=>{
            dispatch(setEditElement(data));
        },
        setEdDetail:(data)=>{
          dispatch(setEditDetail(data))
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
        addFieldToMat:(data)=>{
            dispatch(addFieldToMat(data))
        },
        addFieldToWork:(data)=>{
          dispatch(addFieldToWork(data))
        },
        updateBetMix:(data)=>{
            dispatch(updateBetonMixThunkCreator(data))
        },
        updateBetonDetail:(data)=>{
            dispatch(updateBetonDetailThunkCreator(data))
        },
        fieldsArrClear:()=>{
            dispatch(fieldsArrClear())
        },
        addBetonMix:(data)=>{
            dispatch(addBetonMixThunkCreator(data))
        },
        deleteIngredient:(data)=>{
            dispatch(deleteIngredientsThunkCreator(data))
        },
        betonDetailsSort:(data)=>{
           dispatch(betonDetailsSort(data))
        },
        addBetonDetail:(data)=>{
            dispatch(addBetonDetailThunkCreator(data))
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(BetonContainer);
