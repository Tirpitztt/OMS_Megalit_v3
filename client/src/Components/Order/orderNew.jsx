import c from './ordernew.module.css'
import CustomerNew from "./orderNewSections/Customer/customerNew";
import CalculationNew from "./orderNewSections/Calculation/calculationNew";
import ComplectsNew from "./orderNewSections/Complects/complectsNew";
import HandlingsNew from "./orderNewSections/Handlings/handlingsNew";
import MontazNew from "./orderNewSections/Montaz/montazNew";
import {useState} from "react";

const OrderNew = (props)=>{

    let [isOffer,setOffer] = useState(false);
    const changeCrux = ()=>{
        props.setTotalCost(props.state.newOrder);
    }

    return(
        <div className={c.wrap}>
            <div className={c.title_section}>
                <div className={c.title_info_section}>
                    <div className={c.info_item}><p className={c.title}>Создание нового заказа</p></div>
                    <div className={c.info_item}><button onClick={()=>setOffer(true)}>Оформить</button></div>
                    <div className={c.info_item}>
                        <p className={c.cost_box}>Стоимость: <span>{props.state.calculation.new_total_cost}</span></p></div>
                </div>
                <div className={isOffer?c.title_info_section:c.hide} >
                    <CustomerNew props={props.state.customer} findCustomer={props.findCustomer}/>
                    <CalculationNew />
                </div>
            </div>
            <div className={c.upper_section}>
                <ComplectsNew state={props.state.newOrder.complects}
                              setDetail={props.setDetail}
                              setComplect={props.setComplect}
                              changeCrux={changeCrux}/>
                <HandlingsNew state={props.state.newOrder.handlings}
                              setTextGravi={props.setTextGravi}
                              changeHydro={props.changeHydro}
                              setHandel={props.setHandel}
                              setHandling={props.setHandling}/>
            </div>
            <div className={c.down_section}>
                <MontazNew state={props.state} setMontaz={props.setMontaz}/>
            </div>
        </div>
    )
}

export default OrderNew;