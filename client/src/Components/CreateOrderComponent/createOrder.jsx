import React, {useContext, useEffect, useState} from 'react';
import c from './create-order.module.css'
import ComplectSec from "./OrderSections/ComplectSec/complectSec";
import FinalSec from "./OrderSections/FinalSec/finalSec";
import HandlingsSec from "./OrderSections/HandlingsSec/handlingsSec";
import MontazSec from "./OrderSections/MontazSec/montazSec";
import {materialContext} from "../../Context/material.Context";
import {AuthContext} from "../../Context/auth.context";
import {useParams} from "react-router-dom";
import {convertToInt} from "../../Utils/buildNum";
import Card from "../../Utils/Classes/card";


const CreateOrder = (props) => {
    //console.log(props.state)
    let title = props.state.title
    const number = useParams()
    const orderID = convertToInt(number.orderID)

    let materials = props.state.materials||0;
    let usd = 0;
    if(materials!=0){
        usd = materials.rate[0].USD;
    }
    let {userId,userName} = useContext(AuthContext);
    let employer = {
        id:userId,
        name:userName
    }
    useEffect(()=>{
        props.setEmployer(employer);
        if(orderID){
            props.getOrderState({orderId:orderID})
        }
    },[orderID])

    let [active,setActive] = useState(0); //устанавливает экран

    const changeCrux = ()=>{
        props.setTotal(props.state.newOrder);
    }

    const changeDisplay = (val)=>{
        setActive(val);
    }
    const saveOrder = ()=>{
        //console.log(props.state)
        props.state.customer.allCustomers = []  // костыль обнуляет массив всех клиентов!!!! убрать
        props.orderCreate(props.state);
    }
    const deleteCard = (path)=>{
        props.deleteCard(path)
    }
    let sketchFile = <label>эскиз не выбран</label>;
    if(props.state.newOrder.cardsList.length){
        let fileNames = [];

        for(let i=0;i<props.state.newOrder.cardsList.length;i++){
            const card = new Card()
            card.setLink(props.state.newOrder.cardsList[i].link)
            let name = props.state.newOrder.cardsList[i].link.split('/')
            card.setName(name[name.length-1])
            fileNames.push(card)

        }
        sketchFile = fileNames.map(item => {
            return <div className={c.sketch_list_item}>
                <div>{item.name}</div>
                <div onClick={()=>deleteCard(item.link)}>удалить</div>
            </div>
        })
    }



    let statePage = [
        <ComplectSec state={props.state.newOrder.complects}
                     isNewOrder={props.state.isNewOrder}
                     orderId={props.state.orderOption.orderId}
                     activeDetail={props.state.activeBetDetail}
                     setActiveDetail={props.setActiveDetail}
                     setDetail={props.setDetail}
                     articulList={props.state.articulList}
                     setArticulList={props.setArticulList}
                     correctApply={props.correctApply}
                     delDetal={props.delDetal}
                     setComplect={props.setComplect}
                     getStandartKit={props.getStandartKit}
                     delCompl={props.delCompl}
                     changeDisplay={changeDisplay}
                     changeCrux={changeCrux}/>,
        <HandlingsSec state={props.state.newOrder.handling}
                      isNewOrder={props.state.isNewOrder}
                      handlingId={props.state.newOrder.handling.id}
                      cards={sketchFile}
                      setHand={props.setHand}
                      delHand={props.delHand}
                      setText={props.setText}
                      setSketchPath={props.setSketchPath}
                      setCardsList={props.setCardsList}
                      deleteCard={props.deleteCard}
                      addFile={props.addFile}
                      changeHydro={props.changeHydro}
                      changeCrux={changeCrux}
                      changeDisplay={changeDisplay}/>,
        <MontazSec state={props.state.newOrder.montaz}
                   isNewOrder={props.state.isNewOrder}
                   montazId={props.state.newOrder.montaz.id}
                   setMontaz={props.setMontaz}
                   setDelivery={props.setDelivery}
                   setDeliveryPoint={props.setDeliveryPoint}
                   setGuaranties={props.setGuaranties}
                   setSizeMontaz={props.setSizeMontaz}
                   delMontaz={props.delMontaz}
                   changeCrux={changeCrux}
                   changeDisplay={changeDisplay}/>,
        <FinalSec state={props.state}
                  cards={sketchFile}
                  setFindCust={props.setFindCust}
                  setTermin={props.setTermin}
                  setPayment={props.setPayment}
                  addPayment={props.addPayment}
                  setDiscount={props.setDiscount}
                  setUTM={props.setUTM}
                  setNotice={props.setNotice}
                  changeCrux={changeCrux}
                  saveOrder={saveOrder}
                  setCardsList={props.setCardsList}
                  deleteCard={props.deleteCard}
                  addFile={props.addFile}
                  clearState={props.clearState}
                  setEditFalse={props.setEditFalse}
                  changeDisplay={changeDisplay}/>];

    return (
        <materialContext.Provider value={materials}>
        <div className={c.content_wrapper}>
            <div className={c.header_create}>
                <div className={c.header_title}><p>{title}</p></div>
                {/*<div><button className={c.offer_but}>Оформить</button></div>*/}
                <div className={c.header_title}><p>Стоимость: USD <span> {(props.state.newOrder.calculation.new_total_cost).toFixed(2)} </span>
                BLR <span> {(props.state.newOrder.calculation.new_total_cost * usd).toFixed(2)}</span></p></div>
            </div>
            <div className={props.state.status_OK?c.error_hidden:c.error_block}>Ошибка сохранения</div>
            {statePage[active]}
        </div>
        </materialContext.Provider>
    );
};

export default CreateOrder;
