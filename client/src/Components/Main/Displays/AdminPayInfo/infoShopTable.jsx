import React from 'react';
import c from "./payInfo.module.css";
import InfoYearShop from "./infoYearShop";

const InfoShopTable = (props) => {
    let shopData = []
    if(props.state.length){
        shopData = props.state.map((yearState,i) => {
            return <InfoYearShop key={i} state={yearState} />
        })
    }
    return (
        <div className={c.display_wrap}>
            <div className={c.display_title}>
                <p>{props.title}</p>
            </div>
            <div className={c.display_content_wrap}>
                {shopData}
            </div>

        </div>
    );
};

export default InfoShopTable;
