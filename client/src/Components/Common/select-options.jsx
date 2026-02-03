import React, {useState} from 'react';
import {convertToInt} from "../../Utils/buildNum";

const SelectOptions = (props) => {

    const [selectedOption,setSelectedOption] = useState(props.defaultValue)
    const options = props.options.map((item,i)=>{
        return <option key={i} value={item.value}>{item.text}</option>
    })
    const changeOption = (value)=>{
        setSelectedOption(value)
        const intValue = convertToInt(value)
        props.onChange(intValue)
    }
    return (
        <select value={selectedOption}
                onChange={(e)=>changeOption(e.target.value)}>
            {options}
        </select>
    );
};

export default SelectOptions;
