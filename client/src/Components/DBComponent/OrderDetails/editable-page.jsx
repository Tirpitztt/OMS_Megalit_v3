import React, {useContext, useEffect, useState} from 'react';
import c from './details.module.css'
import {NavLink, useParams} from "react-router-dom";
import {AuthContext} from "../../../Context/auth.context";
import {convertToInt} from "../../../Utils/buildNum";
import DbOrderDetail from "./db_order_detail";
import ConfirmModal from "../../Common/confirmModal";


const EditablePage = (props) => {
    //console.log('editablePage:',props)
    const {userId,userRole,userName} = useContext(AuthContext);
    const user = {
        id:userId,
        role:userRole,
        name:userName,
    }
    const number = useParams()
    const editableID = convertToInt(number.orderId)
    const [activeConfirm,setActiveConfirm] = useState(false)
    const [ID,setID] = useState(null)
    const pathToEdit = '/ordernew/'+editableID
    const confirmTitle = <p>Вы уверены, что хотите удалить заказ и все его данные?</p>


    useEffect(()=>{
        props.setEditableState({
            orderId:editableID,
            userId:user.id})
    },[])
    let content = <div>Загружаю... </div>
    let printButton = null;
    let additionalAgreeButton = null;
    let deleteOrderButton = null;
    let editOrderButton = null;
    const activateDelete = (id) => {
        setActiveConfirm(true)
        setID(id)
    }


    const deleteOrder = ()=>{
        let body = {
            id:ID
        }
        props.deleteOrder(body)
    }

    if(props.state.order){
        content = <DbOrderDetail order={props.state.order}
                                 state={props.state}
                                 noticeChange={props.noticeChange}
                                 addPayment={props.addPayment}
                                 editStatus={props.editStatus}
                                 user={user}
                                 rate={props.state.rate}
        />

        printButton = <NavLink to={'/print/' + editableID}
                                   className={c.any_button} ><p>Печать</p></NavLink>
        editOrderButton = <NavLink to={pathToEdit}><div className={c.any_button}><p>Изменить</p></div></NavLink>
    }else if(!props.state.isFound){
        content = <div>заказ не найден !</div>
    }
    if(props.state.isEdited){
        additionalAgreeButton = <NavLink to={'/print-add/' + editableID}
                                         className={c.any_button} ><p>Доп соглашение</p></NavLink>
    }
    if(userRole === 'konung' && props.state.order){
        deleteOrderButton = <div onClick={()=>activateDelete(props.state.order.order.id)}
                                 className={c.any_button}><p>Удалить</p></div>
    }

    //console.log(props.state)
    return (
        <div>
            <div className={c.up_title_box}>
                <div className={c.up_title_sec}>
                    {printButton}
                    {additionalAgreeButton}
                </div>
                <div className={c.up_title_sec}>
                    <div className={c.main_title}>
                        Просмотр и редактирование заказа
                    </div>
                </div>
                <div className={c.up_title_sec}>
                    {editOrderButton}
                    {deleteOrderButton}
                </div>
            </div>
            {content}
            <ConfirmModal active={activeConfirm}
                          setActive={setActiveConfirm}
                          func={deleteOrder}
                          txt={confirmTitle}
                           />

        </div>
    );
}

export default EditablePage;
