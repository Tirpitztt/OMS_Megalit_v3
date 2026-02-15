import c from './modal.module.css'
import React, {useState} from 'react';
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";
import InputBlock from "../UI/Inputs/input-block";
import StandardButton7 from "../UI/Buttons/standard-button-7";


const PasswordChangeModal = ({active,close,userId,upload}) => {

    let isActive = active;
    const closeModal = ()=>{
        close(false);
    }

    let errorRow = <div className={c.errors_row}><p>Пароли не совпадают</p></div>
    let errorAdminPassRow = <div className={c.errors_row}><p>Админ пароль не правильный</p></div>
    const [userPass,setUserPass] = useState('') // новый пароль
    const [userPassRepeat,setUserPassRepeat] = useState('') //повтор нового пароля
    const [adminPass,setAdminPass] =useState('')
    const [error,setError] = useState(false)
    const [errorAdmin,setErrorAdmin] = useState(false)
    const uploadPass = ()=>{
        if(userPass!==userPassRepeat){
            setError(true)
            return
        }
        const body = {
            userId:userId,
            userPassword:userPass,
            adminPassword:adminPass,
            closeModal:close,
            setError:setErrorAdmin
        }

        upload(body)

    }
    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div><p>Изменение пароля</p></div>
                <div>
                    <InputBlock label='Новый пароль' value={userPass} changeF={setUserPass} type='password' />
                    <InputBlock label='Повторить пароль' value={userPassRepeat} changeF={setUserPassRepeat} type='password' />
                    {error?errorRow:null}
                    <InputBlock label='Пароль доступа' value={adminPass} changeF={setAdminPass} type='password' />
                    {errorAdmin?errorAdminPassRow:null}
                    <StandardButton7 text='Отправить' f={uploadPass} />
                </div>

            </div>
        </div>
    );
};

export default PasswordChangeModal;