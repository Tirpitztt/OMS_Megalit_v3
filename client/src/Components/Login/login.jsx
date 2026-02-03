import React, {useContext, useState} from "react";
import {useHttp} from "../../Hooks/auth.hook";
import {AuthContext} from "../../Context/auth.context";
import c from './login.module.css';

export const LoginPage = ()=>{
    const auth = useContext(AuthContext);
    const {loading,error,request} = useHttp();
    const [form,setForm] = useState({
       login:'',password:''
    });
    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value});
    }
    const registerHandler = async ()=>{
        try{
            const data = await request('/auth/login','POST',{...form})
            auth.login(data.token,data.userId,data.userRole,data.userName,data.userSettings);
        }catch (e) {

        }
    }
    return(
        <div>
            <div className={c.container}>
                <div className='klaks'></div>
                <div className='logincard'>
                    <div className={c.title}>
                        <p>Войти в программу</p>
                    </div>
                    <div className={c.input_box}>
                        <input type="text" placeholder="login" name="login" onChange={changeHandler}/>
                    </div>
                    {/*<div className={c.input_box}>*/}
                    {/*    <input type="text" placeholder="name" name="name" onChange={changeHandler}/>*/}
                    {/*</div>*/}
                    <div className={c.input_box}>
                        <input type="password" placeholder="password"  name="password" onChange={changeHandler}/>
                    </div>
                    <div className={c.button_wrap}>
                        <button onClick={registerHandler} disabled={loading}>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
