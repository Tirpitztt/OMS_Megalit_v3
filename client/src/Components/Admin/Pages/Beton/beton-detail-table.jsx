import React from 'react';
import c from './../pages.module.css';

const BetonDetailTable = ({row}) => {


    return (
        <div className={c.table}>
            <div className={c.thead_det}>
                <div className={c.table_row}>

                    <div className={c.table_item_head_bd}>артикул</div>
                    <div className={c.table_item_head_bd}>
                        <div className={c.head_up}>габариты</div>
                        <div className={c.head_down}>
                            <div className={c.table_size}>высота</div>
                            <div className={c.table_size}>ширина</div>
                            <div className={c.table_size}>толщина</div>
                        </div>
                    </div>
                    <div className={c.table_item_head_bd}>объем,м3</div>
                    <div className={c.table_item_head_bd}>площадь,м2</div>
                    <div className={c.table_item_head_bd}>бет смесь</div>
                    <div className={c.table_item_head_bd}>наценка,%</div>
                    <div className={c.table_item_head_bd}>доб стоимость</div>
                    <div className={c.table_item_head_bd}>себестоимость</div>
                    <div className={c.table_item_head_bd}>стоимость работ</div>
                    <div className={c.table_item_head_bd}>цена</div>
                    <div className={c.table_item_head_bd}>кол-во</div>
                    <div className={c.table_item_head_bd}>..</div>
                    <div className={c.table_item_head_bd}>..</div>
                </div>
            </div>
            <div className={c.tbody}>
                {row}
            </div>
        </div>
    );
};

export default BetonDetailTable;
