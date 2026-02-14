import React, {useState} from 'react';
import c from './employees.module.css'
import InputBlock from "../../../UI/Inputs/input-block";
import StandardButton7 from "../../../UI/Buttons/standard-button-7";
import UsersAvatarsModal from "../../../Common/users-avatars-modal";
import SelectBlock from "../../../UI/Inputs/select-block";
import {ADMIN_NAMES, DEPARTMENT_NAMES, ROLES_NAMES, WORKERS_NAMES} from "../../../../Utils/variables-const";
import ConfirmModal from '../../../Common/confirmModal';
import PasswordChangeModal from "../../../Common/passwordChange-modal";

const UserItem = (props) => {
    //console.log(props.user)
    const tempDate = new Date()
    const tempVaric = 'Temporal Data'
    const [error,setError] = useState(false)
    const [passRepeat,setPassRepeat] = useState('') //повтор пароля нового пользователя
    const [active, setActive] = useState(false)
    const [activeConfirm, setActiveConfirm] = useState(false)
    const [activePassModal,setActivePassModal] = useState(false)
    // const [userPassRepeat,setUserPassRepeat] = useState('') //повтор нового пароля
    // const [adminPass,setAdminPass] =useState('') // админ пароль
    const backToList = () => {
        props.setUser(null)
        props.clearUserState()
    }
    // const updateUserPass = () => {
    //     props.updatePass()
    // }
    let buttonSaveText = 'Изменить'
    let errorText = null
    let passwordBlock = null
    let buttonDelete = <StandardButton7 text='Удалить' f={() => setActiveConfirm(true)} />
    let changePassButton = <StandardButton7 text='Поменять пароль' f={() => setActivePassModal(true)} />
    // let passBlock = <div className={c.user_card_info}>
    //     <InputBlock label='Новый пароль' value={userPass} changeF={setUserPass} type='password' />
    //     <InputBlock label='Повторить новый пароль' value={userPassRepeat} changeF={setUserPassRepeat} type='password' />
    //     <InputBlock label='Админ пароль' value={adminPass} changeF={setAdminPass} type='password' />
    //     <StandardButton7 text='Отправить' f={updateUserPass} />
    // </div>

    if(props.state.isNewUser){
        buttonSaveText = 'Сохранить'
        // пароль для нового пользователя
        passwordBlock = <div>
            <InputBlock label='Пароль'
                        value={props.state.user.password}
                        changeF={props.setUserPassword}
                        type='password' />
            <InputBlock label='Повторите пароль'
                        value={passRepeat}
                        changeF={setPassRepeat}
                        type='password' />
            </div>
        buttonDelete = null
        changePassButton = null
        // passBlock = <div className={c.user_card_info}></div>
        if(error){
            errorText = <div className={c.error_password}><p>Пароль не совпадает</p></div>
        }
    }
    const clickFunction = ()=>{
        if(props.state.isNewUser){
            if(props.state.user.password === passRepeat){
                //console.log('saveNewUser')
                props.saveUser(props.state.user)
                props.setUser(null)
                props.clearUserState()
                
            }else {
                setError(true)
            }

        }else {
            //console.log('changeUser')
            props.updateUser(props.state.user)
            props.setUser(null)
            props.clearUserState()
        }

    }
    const changeImgClick = () => {
        setActive(true)
        //console.log('avatarClick')
    }
    const selectAvatar = (path)=>{
        //console.log(path)
        props.setUserAvatar(path)
        setActive(false)
    }
    let positionNames = ADMIN_NAMES
    if(props.state.user.department === 'рабочие'){
        positionNames = WORKERS_NAMES
    }
    const deleteUser = () => {
        props.deleteUser(props.state.user)
        props.setUser(null)
        props.clearUserState()
    }
    const tempFunc = () => {
         console.log('foo')
        // props.setUserLogin(val)
    }
    return (
        <div className={c.user_content}>
            <div className={c.user_title_box}>
                <div className={c.user_back_box} onClick={backToList}>&#8617;</div>
                <div className={c.user_title}><p>Карточка сотрудника: </p></div>
                <div className={c.user_title}><p>{props.user.fullName}</p></div>
                <div className={c.user_title}>
                    {changePassButton}
                    <StandardButton7 text={buttonSaveText} f={clickFunction} />
                    {buttonDelete}
                </div>
            </div>
            <div className={c.user_card_box}>
                <div className={c.user_card_block}>
                    <div className={c.user_card_info}>
                        <div className={c.user_avatar_box}>
                            <div className={c.user_avatar_items}>
                                <img src={props.state.user.settings.avatar} alt=""/>
                            </div>
                            <div className={c.user_avatar_items}>
                                <StandardButton7 text='Изменить' f={changeImgClick} />
                            </div>
                        </div>
                    </div>
                    <div className={c.user_card_info}>
                        <InputBlock label='Логин' value={props.state.user.login} changeF={props.setUserLogin} type='text' />
                        <InputBlock label='Фамилия' value={props.state.user.lastName} changeF={props.setUserLastName} type='text' />
                        <InputBlock label='Имя' value={props.state.user.name} changeF={props.setUserName} type='text' />
                        <InputBlock label='Отчество' value={props.state.user.fatherName} changeF={props.setUserFatherName} type='text' />
                        {passwordBlock}
                        {errorText}
                    </div>
                </div>
                <div className={c.user_card_block}>
                    <div className={c.user_card_info}>
                        <InputBlock label='Адрес' value={props.state.user.settings.adress} changeF={props.setUserAdress} type='text' />
                        <InputBlock label='Телефон' value={props.state.user.settings.phone} changeF={props.setUserPhone} type='text' />
                        <InputBlock label='раб Телефон' value={props.state.user.settings.workPhone} changeF={props.setUserWorkPhone} type='text' />
                        <InputBlock label='e-mail' value={props.state.user.email} changeF={props.setUserMail} type='text' />
                    </div>
                    <div className={c.user_card_info}>
                        <InputBlock label='дата приемки' value={props.state.user.dateAccept} changeF={props.setUserDateAccept} type='date' />
                        <SelectBlock label='Отдел'
                                     options={DEPARTMENT_NAMES}
                                     defaultValue={props.state.user.department}
                                     selectFunction={props.setUserDepartment} />
                        <SelectBlock label='Должность'
                            options={positionNames}
                            defaultValue={props.state.user.position}
                            selectFunction={props.setUserPosition}
                        />
                        <SelectBlock label='Роль'
                                     selectFunction={props.setUserRole}
                                     options={ROLES_NAMES}
                                     defaultValue={props.state.user.role} />
                    </div>
                </div>
                <div className={c.user_card_block}>
                    <div className={c.user_card_info}></div>
                    <div className={c.user_card_info}></div>
                </div>
            </div>
            <UsersAvatarsModal close={setActive}
                               content={props.state.avatarsList}
                               select={selectAvatar}
                               isActive={active} />
            <ConfirmModal active={activeConfirm}
                            setActive={setActiveConfirm}
                            txt='Хотите уволить этого пассажира?'
                            func={deleteUser} />
            <PasswordChangeModal active={activePassModal}
                                 close={setActivePassModal}
                                 upload={props.updatePass}
                                 userId={props.state.user.id} />

        </div>
    );
};

export default UserItem;
