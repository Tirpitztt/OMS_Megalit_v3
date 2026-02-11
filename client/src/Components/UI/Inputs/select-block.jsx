import React, {useState} from 'react';
import c from './inp.module.css';

const SelectBlock = ({label,options,defaultValue,selectFunction}) => {
    const [selectedOption,setSelectedOption] = useState(defaultValue)
    const optionsResult = options.map((item,i)=>{
        return <option key={i} value={item.value}>{item.text}</option>
    })
    const selectValue = (value)=>{
        setSelectedOption(value)
        selectFunction(value)
    }
    return (
        <div className={c.wrap}>
            <div className={c.items}><label>{label}</label></div>
            <div className={c.items}><select value={selectedOption}
                                             onChange={(e)=>selectValue(e.target.value)}>
                {optionsResult}
            </select></div>
        </div>
    );
};

export default SelectBlock;