import React from 'react';
import c from "./button.module.css";
import {NavLink} from "react-router-dom";

const NavbarButton = ({path,text}) => {
    return (
        <div className={c.navbar_button}>
            <NavLink to={path}><p>{text}</p></NavLink>
        </div>
    );
};

export default NavbarButton;
