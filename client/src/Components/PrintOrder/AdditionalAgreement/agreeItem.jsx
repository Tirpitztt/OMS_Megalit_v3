import React from 'react';
import HeaderAgree from "./headerAgree";
import FooterAgree from "./footerAgree";
import {getAdditionalAgreeBody} from "../../../Utils/support";
import ContentAgree from "./contentAgree";
import c from './agree.module.css'

const AgreeItem = ({agree,order,customer,number}) => {
console.log(JSON.parse(agree.data))
    // const oldOrder = JSON.parse(agree.before)
    // const newOrder = JSON.parse(agree.after)
    // const additionalBody = getAdditionalAgreeBody(newOrder,oldOrder)



    return (
        <div className={c.item_wrap}>
            <HeaderAgree order={order}
                         customer={customer}
                         number={number} date={agree.createdAt} />
            {/*<div>{JSON.stringify(agree)}</div>*/}
            <ContentAgree body={JSON.parse(agree.data)} />
            <FooterAgree customer={customer} />

        </div>
    );
};

export default AgreeItem;
