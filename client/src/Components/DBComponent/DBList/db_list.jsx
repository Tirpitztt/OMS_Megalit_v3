import React from 'react'
import c from './dblist.module.css'
import OrdersList from "./OrdersList/orders_list";

const Db_list = (props)=>{
    let orders = <div className={c.orders}>none</div>;
    if(props.customer.orders.length){
        orders = <OrdersList orders={props.customer.orders} click={props.click}/>
    }

    return(
        <div className={c.wrap}>
            <div className={c.order}>
                <div className={[c.num_wr,c.ourstyle].join(' ')}>{props.customer.id}</div>
                <div className={[c.customer,c.ourstyle].join(' ')}>{props.customer.full_name}</div>
                <div className={[c.phone,c.ourstyle].join(' ')}>{props.customer.phone}</div>
                <div className={[c.number_wrp,c.ourstyle].join(' ')}>{orders}</div>
                <div className={[c.rank,c.ourstyle].join(' ')}>{props.customer.rank}</div>
                <div className={c.icons}>
                    <div className={c.edit}>edit</div>
                    <div className={c.del}>del</div>
                </div>
            </div>
        </div>

    )
}

export default Db_list;