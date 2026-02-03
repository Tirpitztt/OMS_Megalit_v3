import React from 'react';
import c from "../modal.module.css";

const SketchModalFolder = ({state,select}) => {

    //console.log(state)
    const classes = {
        granit:[c.folder_row,c.back_granit].join(' '),
        beton:[c.folder_row,c.back_beton].join(' '),
        ograda:[c.folder_row,c.back_ograd].join(' '),
        other:[c.folder_row,c.back_other].join(' ')
    }
    let defaultStyleClass = c.folder_row
    const arrayItems = state.slice(1)
     let display = <div></div>;
     display = arrayItems.map((item,i)=>{
         let name = item.Key.toString();
        if((item.Key).includes('beton')){
            name='Бетон';
            defaultStyleClass = classes.beton
        }else if((item.Key).includes('granit')){
            name='Гранит';
            defaultStyleClass = classes.granit
        }else if((item.Key).includes('ogr')){
            name='Ограда';
            defaultStyleClass = classes.ograda
        }else if((item.Key).includes('Added')){
            name = 'Добавленные'
            defaultStyleClass = classes.other
        }
        let folder = <div className={defaultStyleClass} onClick={()=>select(item.Key)}>
            <div>{name}</div>
        </div>
        // if(i===0){
        //     folder = null
        // }
        return <div key={i} className={c.folder_card}>{folder}</div>
    })
    return (
        <div className={c.folder_box}>
            {display}
        </div>
    );
};

export default SketchModalFolder;
