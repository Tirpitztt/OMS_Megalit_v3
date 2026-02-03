import React from 'react';
import c from './workPage.module.css';

const MiddleSec = (props) => {
    return (
        <div className={c.middle_wrap}>
            <div className={c.middle_title}><p>Текст для гравировки</p></div>
            <div><pre>{props.text}</pre></div>
        </div>
    );
};

export default MiddleSec;