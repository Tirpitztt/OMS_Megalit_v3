import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const InfoHandleModal = (props)=>{

    let isActive = props.modal;

    const closeModal = ()=>{
        props.close(false);
        isActive = false;
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content_info}>
                <div className={c.close} ><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}><p>Как добавить обработку</p></div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel1_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>
                               ШАГ 1.
                            </p>
                            <p>
                                Данная секция нужна для того что бы добавить к заказу свойства связанные с обработкой заказа. Например
                                гравировка портретов и надписей, распил и полировка формы памятника, оград и проч, вклейка медальонов,
                                букв и лепнины, нарезание фасок и укладка золота. В общем все что связано с работой по заказу не включая монтаж
                                и собственно детали комплектов.
                            </p>
                            <p>
                                Для этого необходимо указать наименование работ. Затем выбрать <strong>категорию</strong> исполнения. Например:
                                портрет может быть выполнен методом гравировки либо триплексом. Или фигурная фаска нарезается и полируется,
                                а в поле <strong>размер</strong>  указывается профиль фаски например - Н20К.

                            </p>
                            <p>
                                Поле <strong>размер</strong> необходимо заполнять если имеются точно оговоренные размеры тех или иных работ и предметов.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel2_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>
                                ШАГ 2
                            </p>
                            <p>
                                Цена за каждый вид работ указывается вручную согласно прейскуранта.
                            </p>
                            <p>
                                При добавлении работы к заказу каждая позиция появляется в таблице в правой части экрана. По аналогии с
                                добавлением деталей, каждый вид работ можно удалить и добавить новый. Различие только в том, что это будет
                                один комплект работ на весь заказ.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel3_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>
                                ШАГ 3.
                            </p>
                            <p>
                                Если поставить галочку в поле <strong>гидрофоб</strong> к общей стоимости заказа добавиться цена за гидрофоб.
                            </p>
                            <p>
                                В поле <strong>Текст для гравировки</strong> соответсвенно записываются данные для нанесения на памятнике.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel4_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 4.</p>
                            <p>
                                Чтобы выбрать эскиз заказа, нужно в правом верхнем углу экрана нажать кнопку <strong>выбрать эскиз</strong>.
                                Откроется простой файловый менеджер в котором можно найти нужный эскиз и кликнув по рисунку добавить его в заказ.
                            </p>

                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel5_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}><p></p></div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel6_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 6.</p>
                            <p>
                                После выбора эскиза возле кнопки появится информация с <strong>названием файла</strong>, что свидетельствует об успешном
                                добавлении эскиза к заказу.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={c.info_block}>
                    <div className={c.info_item}>
                        <div className={c.handel7_img}></div>
                    </div>
                    <div className={c.info_item}>
                        <div className={c.notation}>
                            <p>ШАГ 7.</p>
                            <p>
                                Убедившись что все работы добавлены верно, можно переходить на следующую страницу.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default InfoHandleModal;
