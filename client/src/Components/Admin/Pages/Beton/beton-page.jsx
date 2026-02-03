import React from 'react';
import c from './../pages.module.css';
import BetonMixSection from "./beton-mix-section";
import BetonDetailSection from "./beton-detail-section";


const BetonPage = (props) => {
    console.log('bp',props.adminState)

    return (
        <div className={c.beton_page}>
            <div className={c.header}>
                <div className={c.header_title}><p>Секция изделий из бетона</p></div>
                <div className={c.header_button_box}></div>
            </div>

            <div className={c.content_wrap}>
                <div className={c.content}>
                    <div className={c.content_box}>

                        <BetonDetailSection state={props.state}
                                            adminState={props.adminState}
                                            formState={props.formState}
                                            setFieldsArr={props.setFieldsArr}
                                            addFieldToArr={props.addFieldToArr}
                                            addFieldToMat={props.addFieldToMat}
                                            addFieldToWork={props.addFieldToWork}
                                            addBetonDetail={props.addBetonDetail}
                                            detailsSort={props.detailsSort}
                                            clearFields={props.clearFields}
                                            editDetail={props.setEditDetail}
                                            updateBetonDetail={props.updateBetonDetail}
                        />
                    </div>
                </div>
                <div className={c.content}>
                    <div className={c.content_box}>
                        <div className={c.content_left}>
                            <BetonMixSection state={props.state}
                                             formState={props.formState}
                                             setFieldsArr={props.setFieldsArr}
                                             addFieldToArr={props.addFieldToArr}
                                             updateBetMix={props.updateBetMix}
                                             clearFields={props.clearFields}
                                             addBetonMix={props.addBetonMix}
                                             deleteIngredient={props.deleteIngredient}
                                             editElement={props.setEditElement} />
                        </div>
                        <div className={c.content_right}>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BetonPage;
