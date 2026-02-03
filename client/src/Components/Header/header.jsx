import c from './header.module.css'
import {useContext} from "react";
import {AuthContext} from "../../Context/auth.context";

const Header = (props)=>{
    let {logout} = useContext(AuthContext);
    const clickEx = ()=>{
        logout();
    }
    return(
        <div className='container'>
            <p className='main_title'>Megalit<span>Gran</span> - OrderManager
                <span>Service</span></p>
            <p className={c.exit_button} onClick={clickEx}>Выйти</p>
        </div>
    )
}

export default Header;