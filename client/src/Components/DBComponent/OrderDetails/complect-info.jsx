import React from 'react';
import c from './details.module.css'
import ComplectList from "./complect-list";
import Card from "../../../Utils/Classes/card";

const ComplectInfo = (props) => {
    let sketch = null;
    if(props.order.cards.length){
        sketch = props.order.cards.map(item=>{
            const card = new Card();
            card.setCard(item)
            return <div className={c.info_sketch_box}>
                <img src={card.getLink()} alt="" />
            </div>
        })
    }
    return (
        <div className={c.main_info_box}>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>комплектация</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <ComplectList order={props.order} />
                </div>
            </div>
            <div className={c.info_side}>
                <div className={c.info_title_box}>
                    <div className={c.info_title}>
                        <div>эскиз</div>
                    </div>

                </div>
                <div className={c.info_content_box}>
                    <div className={c.info_sketch_wrap}>
                        {sketch}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ComplectInfo;
