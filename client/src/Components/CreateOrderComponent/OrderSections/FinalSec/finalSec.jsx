import React, {useContext, useState} from 'react';
import c from '../sections.module.css'
import CustomerForm from "./customer-form";
import FinalForm from "./final-form";
import {NavLink} from "react-router-dom";


const FinalSec = (props) => {

    let [disabl,setDisabl] = useState(true);

    const isOKcheck = () => {
        if(props.state.customer.customerIsOK
            && props.state.orderOption.UTM !== null
            && props.state.orderOption.UTM !== 0){
            setDisabl(false)
        }
    }
    const changeUTM = (utm) => {
        props.setUTM(utm)
        isOKcheck()
    }

    //const [isPrint, setPrint] = useState(false);


    const customerBuild = (fields)=>{
        let customer = {
            last_name:fields[0].last_name,
            name:fields[1].name,
            father_name:fields[2].father_name,
            address:fields[3].address,
            phone:fields[4].phone,
            rank:fields[5].rank
        }
        props.setFindCust(customer);
    }
    const setPayment = (data) => {
        // через проверку на новый заказ добавить метод сохранения аванса
        if(props.state.isNewOrder){
            props.setPayment(data);
        }else{
            props.addPayment(data)
        }

    }

    const saveClick = ()=>{
        props.saveOrder();
        // if(props.state.status_OK){
        //     setPrint(true);
        // }
    }
    const clickContinue = (bool) => {
        props.setEditFalse(bool)
    }
    let buttonSave = <button onClick={saveClick} disabled={disabl}>Сохранить</button>
    if(!props.state.isNewOrder){
        buttonSave = <button onClick={saveClick}>Сохранить изменения</button>
    }

    return (
        <div  className='final_wrapper'>
            <div className={c.section_content}>
                <div className='form_box'>
                    <div className={c.form_title}>
                        ДАННЫЕ ЗАКАЗЧИКА
                    </div>
                    <CustomerForm state={props.state}
                                  bild={customerBuild}
                                  checkOK={isOKcheck}
                                  setFindCust={props.setFindCust}/>
                </div>
                <div className={c.table_box}>
                    <FinalForm state={props.state}
                               cards={props.cards}
                               setPayment={setPayment}
                               changeCrux={props.changeCrux}
                               setDiscount={props.setDiscount}
                               setNotice={props.setNotice}
                               changeUTM={changeUTM}
                               setCardsList={props.setCardsList}
                               addFile={props.addFile}
                               setTermin={props.setTermin}/>
                </div>
            </div>
            <div className={props.state.printStatus?c.print_box:c.hidden}>
                <p>Сохранено успешно. Распечатать договор?</p>
                <div className={c.print_button_box}>
                    <div><NavLink to='/db'><p>Завершить</p></NavLink></div>
                    <div><NavLink to={'/print/'+props.state.number}><p>Распечатать</p></NavLink></div>
                </div>
            </div>
            <div className={props.state.agreeStatus?c.print_box:c.hidden}>
                <p>Изменения сохранены. Распечатать доп соглашение?</p>
                <div className={c.print_button_box}>
                    <div><NavLink to='/db'><p>Завершить</p></NavLink></div>
                    <div><NavLink to={'/print/'+props.state.orderOption.orderId}><p>Распечатать</p></NavLink></div>
                </div>
            </div>
            <div className={props.state.editFalse?c.hidden:c.print_box}>
                <p>Изменения не зафиксированы</p>
                <div className={c.print_button_box}>
                    <div><NavLink to='/db'><p>Завершить</p></NavLink></div>
                    <div onClick={()=>clickContinue(true)}><p>Продолжить</p></div>
                </div>
            </div>
            <div className={c.button_box}>
                <button onClick={()=>props.changeDisplay(2)}>назад </button>
                {buttonSave}
                {/*<button onClick={saveClick} disabled={disabl}>Сохранить</button>*/}
            </div>
        </div>
    );
};

export default FinalSec;
