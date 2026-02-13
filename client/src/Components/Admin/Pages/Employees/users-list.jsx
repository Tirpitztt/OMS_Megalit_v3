import React from 'react';
import c from './employees.module.css'
import StandardButton7 from "../../../UI/Buttons/standard-button-7";

const UsersList = ({users,state,setNewUser,setUserEdit,setUser}) => {
    const setUserOfId = (id)=>{
        users.forEach((user,i)=>{
            if(user.id === id){
                setUser(user)
                setUserEdit(user)
            }
        })
    }
    const addNewUser = ()=>{
        setUser(state.user)
        setNewUser(true)
    }
    const userContent =  users.map((item,i)=>{
            return <div key={i} className={c.table_row} onClick={()=>setUserOfId(item.id)} >
                <div className={c.table_item}><p>{item.id}</p></div>
                <div className={c.table_item}><p>{item.fullName}</p></div>
                <div className={c.table_item}><p>{item.position}</p></div>
                <div className={c.table_item}><p>{item.settings.phone}</p></div>
                <div className={c.table_item}><p>{item.settings.workPhone}</p></div>
            </div>
        })

    return (
        <div className={c.table_box}>
            <div className={c.table_title_box}>
                <div className={c.table_title_item}><p>Списочная ведомость сотрудников</p></div>
                <div className={c.table_title_item}>
                    <StandardButton7 text='Добавить' f={addNewUser} />
                </div>
            </div>

            <div className={c.table_row}>
                <div className={c.table_item}><p>N</p></div>
                <div className={c.table_item}><p>Фио</p></div>
                <div className={c.table_item}><p>Должность</p></div>
                <div className={c.table_item}><p>тел</p></div>
                <div className={c.table_item}><p>раб тел</p></div>
            </div>
            {userContent}
        </div>
    );
};

export default UsersList;
