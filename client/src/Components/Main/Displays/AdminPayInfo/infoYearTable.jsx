import React from 'react';
import c from './payInfo.module.css'
import InfoYearTableColumn from "./infoYearTableColumn";

const InfoYearTable = (props) => {
    let tableData = []
    if(props.state.length){
        tableData = props.state.map((yearState,i) => {
            return <InfoYearTableColumn key={i} state={yearState} />
        })

    }
    return (
        <div className={c.display_wrap}>
            <div className={c.display_title}>
                <p>{props.title}</p>
            </div>
            <div className={c.display_content_wrap}>
                {tableData}
            </div>
            {/*{JSON.stringify(props.state)}*/}
        </div>
    );
};

export default InfoYearTable;
