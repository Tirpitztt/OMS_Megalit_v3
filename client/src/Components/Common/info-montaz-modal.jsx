import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const InfoMontazModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content_info}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}><p>Как добавить монтажные работы</p></div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.montaz1_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 1.</p>
                            <p>
                                Чтобы добавить монтажную работу или работу по благоустройству к заказу, необходимо задать:
                            </p>
                            <p>
                                <strong>НАИМЕНОВАНИЕ</strong> напр.(установка памятника, заливка стяжки,укладка плитки"цветок"
                                , исправления чего-либо)
                            </p>
                            <p>
                                <strong>КАТЕГОРИЯ</strong> - работы относятся к памятнику, благоустройству пола, каким-либо аксессуарам( лавочки,
                                столики и проч) либо прочие работы.
                            </p>
                            <p>
                                <strong>ТИП</strong> - это конретное действие (монтаж,демонтаж, дем/монтаж, заливка, укладка и проч)
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.montaz2_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 2.</p>
                            <p>Цена задается вручную согласно прейскуранта. Количество согласно необходимости.</p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.montaz3_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 3.</p>
                            <p>
                                Добаление монтажных работ происходит по аналогии с предыдущими секциями.
                            </p>
                            <p>
                                Размер участка необходимо задавать в метрах и при наличии работ учитывающих размер участка.
                            </p>
                            <p>
                                Доставка указывается в км в одну сторону.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.montaz4_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 4.</p>
                            <p></p>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default InfoMontazModal;
