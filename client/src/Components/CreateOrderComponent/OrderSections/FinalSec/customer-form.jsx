import React, {useState} from 'react';
import c from "../sections.module.css";
import {useForm} from "react-hook-form";
import {nameSort} from "../../../../Utils/nameSort";

const CustomerForm = (props) => {
    console.log(props)
    let customerTrue = false

    let [findingList,setFindingList] = useState([]);
    let {register,watch} = useForm();
    let [lastName,setLastName] = useState('');
    let [name,setName] = useState('');
    let [fatherName,setFatherName] = useState('');
    let [address,setAddress] = useState('');
    let [phone,setPhone] = useState('');
    let [isSelected,setSelected] = useState(props.state.customer.customerIsOK);

    let fields = watch('fields');

    const selectCustomer = (id)=>{
        props.state.customer.allCustomers.forEach(item=>{
            if(item.id===id){
               props.setFindCust(item);
            }
        })
        setFindingList([]);
        setSelected(true);
    }
    const setFindList = (e)=>{
        setSelected(false);
        setFindingList([]);
        let substr = e.target.value;
        let res = nameSort(props.state.customer.allCustomers,substr,'last_name');
        let resMap = res.map(item=>{
            return <div key={item.id}
                        value={item.id}
                        className={c.customer_list_item}
                        onClick={()=>selectCustomer(item.id)}>
                <p>{item.full_name}</p>
            </div>
        });
        setFindingList(resMap);
        setLastName(e.target.value);
    }
    const changeInput = (e,func)=>{
        func(e.target.value);
        setSelected(false);
    }

    return (
        <form className={c.form_main}>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>Фамилия</label>
                    <input {...register('fields.0.last_name',{onChange:setFindList,
                        onBlur:()=>props.checkOK()})}
                    value={isSelected?props.state.customer.findingCustomer.last_name:lastName}/>
                </div>
                <div className={c.form_section}>
                    <label>Имя</label>
                    <input {...register('fields.1.name',{onChange:(e)=>changeInput(e,setName),
                    onBlur:()=>props.bild(fields)})}
                           value={isSelected?props.state.customer.findingCustomer.name:name}/>
                </div>
                <div className={c.form_section}>
                    <label>Отчество</label>
                    <input {...register('fields.2.father_name',{onChange:(e)=>changeInput(e,setFatherName),
                        onBlur:()=>props.bild(fields)})}
                           value={isSelected?props.state.customer.findingCustomer.father_name:fatherName}/>
                </div>
            </div>
            <div className={c.form_body}>
                <div className={c.form_section}>
                    <label>Адрес</label>
                    <input {...register('fields.3.address',{onChange:(e)=>changeInput(e,setAddress),
                        onBlur:()=>props.bild(fields)})}
                           value={isSelected?props.state.customer.findingCustomer.address:address}/>
                </div>
                <div className={c.form_section}>
                    <label>Телефон</label>
                    <input {...register('fields.4.phone',{onChange:(e)=>changeInput(e,setPhone),
                        onBlur:()=>props.bild(fields)})}
                           value={isSelected?props.state.customer.findingCustomer.phone:phone}/>
                </div>
                <div className={c.form_section}>
                    <label>Рейтинг</label>
                    <select {...register('fields.5.rank',{onBlur:()=>props.bild(fields)})}>
                        <option value="1">1</option>
                        <option value={isSelected?props.state.customer.findingCustomer.rank:'5'}
                                selected>{isSelected?props.state.customer.findingCustomer.rank:'5'}</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            <div className={findingList.length?c.list_block:c.hidden}>
                {findingList}
            </div>

        </form>

    );
};

export default CustomerForm;
