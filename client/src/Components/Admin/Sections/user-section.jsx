import React,{useState} from 'react';
import AddUserForm from "./add-user-form";
import c from './sections.module.css';
import OpenButton from "../../UI/Buttons/open-button";
import HideButton from "../../UI/Buttons/hide-button";

const UserSection = (props) => {

    const [activeForm, setActiveForm] = useState(false);

    return (
        <div className={c.user_box}>
            <div className={c.title_row}>
                <div className={c.title}>
                    Добавление нового сотрудника
                </div>
                <HideButton func={setActiveForm} number={false}/>
                <OpenButton func={setActiveForm} number={true}/>
            </div>
           <AddUserForm addUser={props.addUser} active={activeForm}/>
        </div>
    );
};

export default UserSection;
