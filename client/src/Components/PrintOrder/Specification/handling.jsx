import React from 'react';
import HandelTable from "./handTable";

const Handling = (props) => {
    let handl = 'нет обработки';
    if(props.state){
        handl = <div>
            <p>Гидрофоб: {props.state.hydrophob?'есть':'нет'}</p>
            <HandelTable state={props.state} />
        </div>
    }
    return (
        <div>
            {handl}
        </div>
    );
};

export default Handling;