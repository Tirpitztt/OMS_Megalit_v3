import React from 'react';

const HandelItem = (props) => {

    return (
        <tr>
            <td>{props.props.name}</td>
            <td>{props.props.category}</td>
            <td>{props.props.size}</td>
            <td>{props.props.amount}</td>
            <td>{props.props.price}</td>
            <td><button>delete</button></td>
        </tr>
    );
};

export default HandelItem;