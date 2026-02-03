import * as React from 'react'
import OrderNew from "./orderNew";
import {
    findCustomerByIdThunkCreator,
    getAllCustomersThunkCreator,
    setComplect, setMontaz, setDetail, createTotalCostThunkCreator, setTextGravi, changeHydro, setHandel
} from "../../Redux/Redusers/neworder-reduser";
import {connect} from "react-redux";
import {compose} from "redux";

class OrderNewContainer extends React.Component{

    componentDidMount() {
        this.props.getState();
    }

    render(){
        return(
            <OrderNew state={this.props.state.newOrderPage}
                      findCustomer={this.props.getCustomerById}
                      setComplect={this.props.setComplect}
                      setMontaz={this.props.setMontaz}
                      setDetail={this.props.setDetail}
                      setTotalCost={this.props.setTotalCost}
                      setTextGravi={this.props.setTextGravi}
                      changeHydro={this.props.changeHydro}
                      setHandel={this.props.setHandel}
            />
        )
    }
}

let mapStateToProps = (state)=>{
    return{
        state:state
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        getState:()=>{
            dispatch(getAllCustomersThunkCreator())
        },
        getCustomerById:(id)=>{
            dispatch(findCustomerByIdThunkCreator(id));
        },
        setComplect:(data)=>{
            dispatch(setComplect(data));
        },
        setMontaz:(data)=>{
            dispatch(setMontaz(data));
        },
        setDetail:(detail)=>{
            dispatch(setDetail(detail));
        },
        setTotalCost:(order)=>{
            dispatch(createTotalCostThunkCreator(order));
        },
        setTextGravi:(data)=>{
            dispatch(setTextGravi(data));
        },
        changeHydro:(bool)=>{
            dispatch(changeHydro(bool));
        },
        setHandel:(data)=>{
            dispatch(setHandel(data));
        }
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(OrderNewContainer);