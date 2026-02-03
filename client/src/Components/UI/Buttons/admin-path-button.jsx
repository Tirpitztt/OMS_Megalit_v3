import React from 'react';
import c from './button.module.css'
import {NavLink} from "react-router-dom";

const AdminPathButton = ({path,text}) => {
    return (
        <div className={c.admin_path_button}>
            <NavLink to={path}><p>{text}</p></NavLink>
        </div>
    );
};

export default AdminPathButton;
