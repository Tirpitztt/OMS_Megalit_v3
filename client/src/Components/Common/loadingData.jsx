import React from 'react';
import c from './modal.module.css'
import spinner from './../../Utils/img/spinner-saw.svg'


const LoadingData = () => {
    return (
        <div className={c.loading_box}>
            <div className={c.loading_img_box}>
                <img src={spinner} alt=""/>
            </div>
            <div className={c.loading_text}>Ожидайте, нарезаем данные.</div>
        </div>
    );
};

export default LoadingData;
