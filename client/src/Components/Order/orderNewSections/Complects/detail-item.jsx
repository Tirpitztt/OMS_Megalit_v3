import React from 'react';

const DetailItem = (props) => {
    return (
        <tr>
            <td>{props.detail.name}</td>
            <td>{props.detail.article}</td>
            <td>{props.detail.material}</td>
            <td>{props.detail.height}x{props.detail.width}x{props.detail.weight}</td>
            <td>{props.detail.amount}</td>
            <td>{props.detail.price}</td>
            <td>{props.detail.sort}</td>
            <td><button>delete</button></td>
        </tr>
    );
};

export default DetailItem;