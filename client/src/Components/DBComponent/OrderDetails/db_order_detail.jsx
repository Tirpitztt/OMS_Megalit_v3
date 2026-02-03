import React, {useEffect, useState} from 'react';
import c from './details.module.css'
import MainInfo from "./main-info";
import CalculationInfo from "./calculation-info";
import ComplectInfo from "./complect-info";
import HandlingsInfo from "./handlings-info";
import MontazInfo from "./montaz-info";

const DbOrderDetail = (props) => {
    //console.log('details',props)
    const [isModalActive,setModalActive] = useState(false)
    const [typeModal,setTypeModal] = useState('')



    const showModal = (type)=>{
        setModalActive(true)
        setTypeModal(type)
    }
    const modalOptions = {
        active:isModalActive,
        type:typeModal,
        show:showModal,
        close:setModalActive,
        order:props.order.order
    }

    return (
        <div className={c.order_detail_wrap}>
            <MainInfo   customer={props.order.customer}
                        order={props.order.order}
                        role={props.user.role}
                        editStatus={props.editStatus}
            />
            <CalculationInfo order={props.order.order}
                             addPayment={props.addPayment}
                             noticeChange={props.noticeChange}
                             rate={props.rate}
                             user={props.user}/>

            <ComplectInfo order={props.order.order} />
            <HandlingsInfo order={props.order.order} />
            <MontazInfo order={props.order.order} />
            <div>
                {/*{JSON.stringify(props.order.customer)}*/}
            </div>
            <div>
                {/*{JSON.stringify(props.order.order)}*/}
            </div>

        </div>
    );
};

export default DbOrderDetail;
