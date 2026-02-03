import c from './navbar.module.css'
import React, {useContext, useState} from "react";
import {AuthContext} from "../../Context/auth.context";
import NavbarButton from "../UI/Buttons/navbarButton";
import UserModalSettings from "../Common/user-modal-settings";

const Navbar = ()=>{
    let {userId,userRole,userName,userSettings} = useContext(AuthContext);
    let avatar = '/'
    if(userSettings){
        avatar = userSettings.avatar
    }
    const [activeModal,setActiveModal] = useState(false)

    const buttonData = new Map()
    buttonData.set('home',{path:'/home',text:'Дом'})
    buttonData.set('db',{path:'/db',text:'База'})
    buttonData.set('create',{path:'/ordernew/'+ 0,text:'Новый'})
    buttonData.set('admin',{path:'/admin',text:'Админка'})
    buttonData.set('concrete',{path:'/admin/beton',text:'Бетон'})

    let adminButton = null
    let concreteButton = null

    if(userRole === 'konung'){
        adminButton = <NavbarButton text={buttonData.get('admin').text} path={buttonData.get('admin').path} />
        // concreteButton = <NavbarButton text={buttonData.get('concrete').text} path={buttonData.get('concrete').path} />
    }

    return(
        <div className='nav'>
            <div className={c.user_box}>
                <div className={c.user_avatar_box}>
                    <img src={avatar} alt=""/>
                </div>
                <div className={c.user_name_box} onClick={()=>setActiveModal(true)}>
                    <p>{userName}</p>
                </div>
            </div>
            <div className={c.butt_container}>
                {adminButton}
                {concreteButton}
                <NavbarButton text={buttonData.get('home').text} path={buttonData.get('home').path} />
                <NavbarButton text={buttonData.get('db').text} path={buttonData.get('db').path} />
                <NavbarButton text={buttonData.get('create').text} path={buttonData.get('create').path} />
            </div>
            <div className={c.version_box}>
                <p>v 3.2.0</p>
            </div>
            <UserModalSettings active={activeModal} close={setActiveModal}/>
        </div>
    )
}

export  default Navbar;
