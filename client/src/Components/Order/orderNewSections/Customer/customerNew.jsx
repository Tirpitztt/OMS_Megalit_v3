import React, {useEffect, useState} from 'react';
import c from './customer.module.css';
import FormInput from "../../../UI/Inputs/form-input";
import {useForm} from "react-hook-form";
import {nameSort} from "../../../../Utils/nameSort";

const CustomerNew = (props) => {
    let [isSelected,setIsSelected] = useState(false);
    let [findingList,setFindingList] = useState([]);
    let [lastName,setLastName] = useState('');
    let [name,setName] = useState('');
    let [fatherName,setFatherName] = useState('');
    let [address,setAddress] = useState('');
    let [phone,setPhone] = useState('');
    let [rank,setRank] = useState('');
    //let isDisabled=true;

    let {register,
    handleSubmit,
    reset,watch,
    formState:{errors}} = useForm();

    let fieldLastName = watch('last_name');
    let fieldPhone = watch('phone');
    let allFields = watch();

    const selectCustomer = (e)=>{
        let target = e.target.closest('div');
        props.findCustomer(target.getAttribute('value'));
        setIsSelected(true);
    }

    const setFindList =(e)=>{
        setFindingList([]);
        let substr = e.target.value;
        let res = nameSort(props.props.allCustomers,substr,'full_name');
        let resMap = res.map(item=>{
            return <div key={item.id}
                        value={item.id}
                        className={c.customer_list_item}
                        onClick={selectCustomer}><p>{item.full_name}</p></div>
        });
        setFindingList(resMap);
        setIsSelected(false);
        setLastName(e.target.value);
    }
    const changeInput = (e,func)=>{
        func(e.target.value);
        setIsSelected(false);
    }
    // if(fieldPhone&&fieldLastName){
    //     isDisabled=false;
    // }
    //console.log(allFields);
    const onSubmit =(body)=>{
        console.log('id customer',props.props.findingCustomer.id);
        console.log(body);
    }

    return (
        <div className={c.customer_box}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Введите данные заказчика</p>
                <div className={c.form_box}>
                    <label>фамилия</label>
                    <input {...register('last_name',{
                    onChange:setFindList})}
                    value={isSelected?props.props.findingCustomer.last_name:lastName}/>
                    {errors.last_name&&<i>error</i>}
                </div>
                <div className={c.form_box}>
                    <label>имя</label>
                    <input {...register('name',{onChange:(e)=>changeInput(e,setName)})}
                    value={isSelected?props.props.findingCustomer.name:name}/>
                </div>
                <div className={c.form_box}>
                    <label>отчество</label>
                    <input {...register('father_name',{onChange:(e)=>changeInput(e,setFatherName)})}
                               value={isSelected?props.props.findingCustomer.father_name:fatherName}/>
                </div>
                <div className={c.form_box}>
                    <label>адрес</label>
                    <input {...register('address',{onChange:(e)=>changeInput(e,setAddress)})}
                               value={isSelected?props.props.findingCustomer.address:address}/>
                </div>
                <div className={c.form_box}>
                    <label>телефон</label>
                    <input {...register('phone',{required:true,onChange:(e)=>changeInput(e,setPhone)})}
                               value={isSelected?props.props.findingCustomer.phone:phone}/>
                    {errors.phone&&<i>error</i>}
                </div>
                <div className={c.form_box}>
                    <label>ранг</label>
                    <input {...register('rank',{onChange:(e)=>changeInput(e,setRank),
                            value:rank})}
                               value={isSelected?props.props.findingCustomer.rank:rank}/>
                </div>
                <input  type='submit' value='Сохранить заказчика' />
            </form>
            <div className={c.varic_name}>
                {findingList}
            </div>
        </div>
    );
};

export default CustomerNew;