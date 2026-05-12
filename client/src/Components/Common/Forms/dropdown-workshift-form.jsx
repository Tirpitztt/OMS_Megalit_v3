import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const DropDownWorkShiftForm = (props) => {
    let {register,handleSubmit } = useForm()
    const [timeStart, setTimeStart] = useState(0) 
    const [timeFinish, setTimeFinish] = useState(0)
    const timeWorkCheck = (timeFinish, timeStart) => {
        return timeFinish - timeStart
    }
    //if (props.data.shiftId) {
    //    console.log(props.data.shiftId)
    //}
    const selectCheck = (e) => {
        console.log(e.target.checked)
    }
    const selectHook = (e) => {
        console.log(e.target.checked)
    }
    const timeStartCheck = (e) => {
        setTimeStart(e.target.value)

        console.log(e.target.value)
    }
    const timeFinishCheck = (e) => {
        setTimeFinish(e.target.value)
        console.log(e.target.value)
    }
    const onSubmit = (body) => {
        console.log('form',body)
        props.saveShiftByUser(body)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit) }>
                <select {...register('timeStart', {onChange:(e) => timeStartCheck(e)})}  >
                    <option value='7'>7-00</option>
                    <option value='8'>8-00</option>

                </select>
                <select {...register('timeFinish', { onChange: (e) => timeFinishCheck(e) })} >
                    <option value='16'>16-00</option>
                    <option value='17'>17-00</option>

                </select>
                <input type='checkbox' {...register('hooky', { onChange: (e) => selectCheck(e) })} />
                <input type='checkbox' onChange={(e) => selectHook(e)} />
                <button type='submit'>apply</button>
            </form>
            
            
            <div>{JSON.stringify(props.data)}</div>
        </div>
    )
}

export default DropDownWorkShiftForm;