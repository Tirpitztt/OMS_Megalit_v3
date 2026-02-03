import React from 'react';
import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const UserModalSettings = ({active,close}) => {
    return (
        <div className={active?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close}><DeleteCyrcleButton func={close} num={false} /></div>
                <div className={c.modal_title}><p>Карточка сотрудника</p></div>
            </div>
        </div>
    );
};

export default UserModalSettings;
