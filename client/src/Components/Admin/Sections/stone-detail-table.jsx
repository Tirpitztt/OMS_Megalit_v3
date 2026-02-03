import React from 'react';
import c from "./../Pages/pages.module.css";


const StoneDetailTable = ({row}) => {



    return (
        <div className={c.table}>
            <div className={c.thead_det}>
                <div className={c.table_row}>
                    <div className={c.table_stone_head_bd}>наименование</div>
                    <div className={c.table_stone_head_bd}>происхожд</div>
                    <div className={c.table_stone_head_bd}>цвет</div>
                    <div className={c.table_stone_head_bd}>Т2</div>
                    <div className={c.table_stone_head_bd}>Т3</div>
                    <div className={c.table_stone_head_bd}>Т5</div>
                    <div className={c.table_stone_head_bd}>Т8</div>
                    <div className={c.table_stone_head_bd}>Т10</div>
                    <div className={c.table_stone_head_bd}>Т12</div>
                    <div className={c.table_stone_head_bd}>Т15</div>
                    <div className={c.table_stone_head_bd}>Т20</div>
                    <div className={c.table_stone_head_bd}>Т25</div>
                    <div className={c.table_stone_head_bd}>Т30</div>
                    <div className={c.table_stone_head_bd}>коэф</div>
                    <div className={c.table_stone_head_bd}>..</div>
                    <div className={c.table_stone_head_bd}>..</div>
                </div>
            </div>
            <div className={c.tbody}>
                {row}
            </div>
        </div>
    );
};

export default StoneDetailTable;
