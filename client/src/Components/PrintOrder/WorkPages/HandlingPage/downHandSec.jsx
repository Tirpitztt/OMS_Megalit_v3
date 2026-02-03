import React from 'react';
import c from '../workPages.module.css'

const DownHandSec = ({order}) => {
    return (
        <div className={c.down_box}>
            <pre>
                {order.notice}
            </pre>
        </div>
    );
};

export default DownHandSec;
