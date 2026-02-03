import React from 'react';
import c from './sections.module.css';

const RateTable = ({row,active}) => {

    let isActive = active;

    let rowTable = 'nodata';

    return (
        <div className={isActive?c.user_form_wrap:c.hide_box}>
            <div className={c.table_rate}>
                <div className={c.thead_rate} >
                    <div className={c.table_row_rate}>
                        <div className={c.table_item_head_rate}>id</div>
                        <div className={c.table_item_head_rate}>name</div>
                        <div className={c.table_item_head_rate}>USD</div>
                        <div className={c.table_item_head_rate}>EUR</div>
                        <div className={c.table_item_head_rate}>RUR</div>
                        <div className={c.table_item_head_rate}>BLR</div>
                    </div>
                </div>
                <div className={c.tbody_rate}>
                {row}
                    <div className={c.notation}>
                        <p>* Курсы валют можно изменить кликнув двойным щелчком по строке курсов валют. Строка покажет ячейки
                            для заполнения. Сохранить изменения можно убрав фокус из изменяемой ячейки.</p>
                        <p>Внимание! Беларуский рубль указан как единица ко всем остальным валютам. Его изменять не стоит,
                            это приведет к нарушению расчетов всех деталей.</p>
                    </div>
                </div>
                <div className={c.table_row_rate}>

                </div>
            </div>

        </div>

    );
};

export default RateTable;
