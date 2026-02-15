import React from 'react';
import c from './salary.module.css'

const SalaryPage = () => {
    return (
        <div className={c.content_box}>
            <div className={c.header}>
                <div className={c.header_title}><p>Зарплата</p></div>
                <div className={c.header_button_box}></div>
            </div>
            <div className={c.content}>

            </div>

        </div>
    );
};

export default SalaryPage;