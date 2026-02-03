import React from 'react';
import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const UsersAvatarsModal = ({isActive,close,content,select}) => {
    let baseURL = 'https://elasticbeanstalk-eu-central-1-512346490374.s3.eu-central-1.amazonaws.com/';
    const display = content.map((item,i)=>{
        return <div key={i} className={c.avatars_card} onClick={()=>select(baseURL + item)}>
            <img src={baseURL + item} alt=""/>
        </div>
    })
    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close} ><DeleteCyrcleButton func={close} num={false} /></div>
                <div className={c.avatars_box}>
                    {display}
                </div>
            </div>

        </div>
    );
};

export default UsersAvatarsModal;
