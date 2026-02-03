import React from 'react';

const RowTable = (props) => {
    let csTd = <td>{props.state.height}x{props.state.width}x{props.state.weight}</td>
    if(props.state.name==='цветник'|| props.state.name==='подставка'){
        csTd = <td>{props.state.width}x{props.state.height}x{props.state.weight}</td>
    }
    return (
        <tr>
            <td>{props.state.name}</td>
            <td>{props.state.material}</td>
            {csTd}
            <td>{props.state.amount}</td>
            <td>{props.state.sort}</td>
        </tr>
    );
};

export default RowTable;