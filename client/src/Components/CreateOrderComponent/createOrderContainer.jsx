import * as React from 'react'
import CreateOrder from './createOrder'
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addFileFromPC, addPaymentThunkCreator,
    changeHydro,
    changeMaker,
    clear, correctApply,
    createOrderThunkCreator,
    createTotalCostThunkCreator, deleteCard,
    deleteComplect,
    deleteDetail,
    deleteHandel,
    deleteMontaz,
    getAllCustomersThunkCreator,
    getMatThunkCreator, getOrderEditStateThunkCreator, setActiveDetail, setArticulList, setCardsList,
    setComplect,
    setDelivery,
    setDeliveryPoint,
    setDetail,
    setDiscount, setEditFalse,
    setEmployer,
    setFindingCustomer, setGuaranties,
    setHandel,
    setMontaz, setNotice,
    setPayment,
    setSizeMontaz, setSketchPath,
    setTermin,
    setTextGravi, setUTM, standartComplectThunkCreator
} from "../../Redux/Redusers/neworder-reduser";
import {setDateTermin} from "../../Utils/dateTermin";

class CreateOrderContainer extends React.Component{
    componentDidMount() {
        this.props.getCustomers();
        this.props.setTermin(setDateTermin());
        this.props.getMaterials();
    }
    componentWillUnmount() {
        this.props.clearState();
    }

    render(){
        return(
            <CreateOrder state={this.props.state.newOrderPage}
                         setEmployer={this.props.setEmployer}
                         getOrderState={this.props.getOrderState}
                         setFindCust={this.props.setFindCust}
                         setActiveDetail={this.props.setActiveDetail}
                         setComplect={this.props.setComplect}
                         setArticulList={this.props.setArticulList}
                         correctApply={this.props.correctApply}
                         delCompl={this.props.delComplect}
                         setDetail={this.props.setDetail}
                         delDetal={this.props.delDetal}
                         setHand={this.props.setHandel}
                         delHand={this.props.delHand}
                         setText={this.props.setText}
                         changeHydro={this.props.changeHydro}
                         setMontaz={this.props.setMontaz}
                         setDelivery={this.props.setDelivery}
                         setDeliveryPoint={this.props.setDeliveryPoint}
                         setGuaranties={this.props.setGuaranties}
                         setSizeMontaz={this.props.setSizeMontaz}
                         setTermin={this.props.setTermin}
                         delMontaz={this.props.deleteMontaz}
                         setTotal={this.props.setTotalCost}
                         setDiscount={this.props.setDiscount}
                         setUTM={this.props.setUTM}
                         orderCreate={this.props.createNewOrder}
                         setPayment={this.props.setPayment}
                         addPayment={this.props.addPaymentOfCalculationId}
                         setSketchPath={this.props.setSketchPath}
                         setCardsList={this.props.setCardsList}
                         deleteCard={this.props.deleteCard}
                         getStandartKit={this.props.getStandartKit}
                         addFile={this.props.addFile}
                         setNotice={this.props.setNotice}
                         setEditFalse={this.props.setEditFalse}
                         clearState={this.props.clearState}
                                />
        )
    }

}


let mapStateToProps = (state)=>{
    return{state}
}
let mapDispatchToProps=(dispatch)=>{
    return{
        setEmployer:(data)=>{
           dispatch(setEmployer(data));
        },
        getCustomers:()=>{
          dispatch(getAllCustomersThunkCreator());
        },
        getOrderState:(body)=>{
          dispatch(getOrderEditStateThunkCreator(body))
        },
        setFindCust:(data)=>{
          dispatch(setFindingCustomer(data));
        },
        setActiveDetail:(data)=>{
          dispatch(setActiveDetail(data))
        },
        setComplect:(data)=>{
            dispatch(setComplect(data));
        },
        setArticulList:(data)=>{
            dispatch(setArticulList(data))
        },
        correctApply:(data)=>{
          dispatch(correctApply(data));
        },
        setDetail:(detail)=>{
            dispatch(setDetail(detail));
        },
        delDetal:(data)=>{
          dispatch(deleteDetail(data));
        },
        delComplect:(data)=>{
            dispatch(deleteComplect(data));
        },
        setHandel:(handel)=>{
          dispatch(setHandel(handel));
        },
        delHand:(data)=>{
          dispatch(deleteHandel(data));
        },
        changeHydro:(data)=>{
          dispatch(changeHydro(data));
        },
        setText:(data)=>{
            dispatch(setTextGravi(data));
        },
        setMontaz:(montaz)=>{
            dispatch(setMontaz(montaz));
        },
        setSizeMontaz:(data)=>{
          dispatch(setSizeMontaz(data));
        },
        setDelivery:(data)=>{
          dispatch(setDelivery(data));
        },
        setDeliveryPoint:(data)=>{
            dispatch(setDeliveryPoint(data));
        },
        setGuaranties:(data)=>{
            dispatch(setGuaranties(data))
        },
        deleteMontaz:(id)=>{
          dispatch(deleteMontaz(id));
        },
        setTotalCost:(order)=>{
            dispatch(createTotalCostThunkCreator(order));
        },
        setTermin:(data)=>{
            dispatch(setTermin(data));
        },
        setPayment:(data)=>{
            dispatch(setPayment(data));
        },
        addPaymentOfCalculationId:(body)=>{
            dispatch(addPaymentThunkCreator(body))
        },
        setDiscount:(data)=>{
            dispatch(setDiscount(data));
        },
        setUTM:(data)=>{
            dispatch(setUTM(data))
        },
        createNewOrder:(body)=>{
            dispatch(createOrderThunkCreator(body));
        },
        getMaterials:()=>{
          dispatch(getMatThunkCreator())
        },
        setSketchPath:(body)=>{
            dispatch(setSketchPath(body)); //убрать
        },
        setCardsList:(body)=>{
            dispatch(setCardsList(body))
        },
        deleteCard:(data)=>{
            dispatch(deleteCard(data))
        },
        getStandartKit:(body)=>{
            dispatch(standartComplectThunkCreator(body))
        },
        addFile:(body)=>{
            dispatch(addFileFromPC(body))
        },
        setNotice:(data)=>{
            dispatch(setNotice(data))
        },
        setEditFalse:(data)=>{
            dispatch(setEditFalse(data))
        },
        clearState:()=>{
            dispatch(clear());
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(CreateOrderContainer);
