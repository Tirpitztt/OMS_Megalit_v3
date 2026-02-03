import React from 'react';
import c from "../modal.module.css";

const SketchModalFiles = ({state,select,back}) => {
    let baseURL = 'https://elasticbeanstalk-eu-central-1-512346490374.s3.eu-central-1.amazonaws.com/';
    const close = (data)=>{
        back([]);
        select(data);
    }
    let display =<div></div>;
    display = state.map((item,i)=>{
        let name = (item.Key).split('/');
        let img = <div className={c.img_row} onClick={()=>close(baseURL+item.Key)}>
            <img src={baseURL+item.Key} alt=""/>
            <p>{name[name.length-1]}</p>
        </div>
        if(i===0){
            img = <div className={c.img_row} onClick={()=>back([])}>
                ...
            </div>
        }
        return <div key={i}>{img}</div>
    })
    return (
        <div className={c.img_display}>
            {display}
        </div>
    );
};

export default SketchModalFiles;