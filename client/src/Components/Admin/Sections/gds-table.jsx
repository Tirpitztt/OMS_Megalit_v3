import React from 'react';
import c from './../Pages/pages.module.css'

const GdsTable = ({row}) => {

    return (
        <div className={c.table}>
            <div className={c.thead_det}>
                <div className={c.table_row}>
                    <div className={c.table_gds_item_head}>наименование</div>
                    <div className={c.table_gds_item_head}>артикул</div>
                    <div className={c.table_gds_item_head}>тип</div>
                    <div className={c.table_gds_item_head}>сорт</div>
                    <div className={c.table_gds_item_head}>материал</div>
                    <div className={c.table_gds_item_head}>цвет</div>
                    <div className={c.table_gds_item_head}>статус</div>
                    <div className={c.table_gds_item_head}>склад</div>
                    <div className={c.table_gds_item_head}>высота</div>
                    <div className={c.table_gds_item_head}>ширина</div>
                    <div className={c.table_gds_item_head}>толщ</div>
                    <div className={c.table_gds_item_head}>цена</div>
                    <div className={c.table_gds_item_head}>кол-во</div>
                    <div className={c.table_gds_item_head}>..</div>
                    <div className={c.table_gds_item_head}>..</div>
                </div>
            </div>
            <div className={c.tbody}>
                {row}
            </div>

        </div>
    );
};

export default GdsTable;
