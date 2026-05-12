import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const DropDownWorkShiftForm = (props) => {
    let {register,handleSubmit,reset } = useForm()
    const [timeStart, setTimeStart] = useState(0)
    const [timeFinish, setTimeFinish] = useState(0)
    const [hooky,setHooky] = useState(false)
    const [outlet,setOutlet] = useState(false)
    const [absence,setAbsence] = useState(false)
    const [sick,setSick] = useState(false)
    const [full,setFull] = useState(false)

    let formData = {}
    if (props.data) {
       formData = {...props.data}

    }
    const selectSick = (e) => {
        setSick(true)
        setHooky(false)
        setOutlet(false)
        setFull(false)
        setAbsence(false)

    }
    const selectHook = (e) => {
        setSick(false)
        setHooky(true)
        setOutlet(false)
        setFull(false)
        setAbsence(false)
    }
    const selectAbsence = (e) => {
        setSick(false)
        setHooky(false)
        setOutlet(false)
        setFull(false)
        setAbsence(true)
    }
    const selectFull = (e) => {
        setSick(false)
        setHooky(false)
        setOutlet(false)
        setFull(true)
        setAbsence(false)
    }
    const selectOutlet = (e) => {
        setSick(false)
        setHooky(false)
        setOutlet(true)
        setFull(false)
        setAbsence(false)
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
        if(full){
            setTimeFinish(17)
            setTimeStart(8)
        }
        formData.data.start = timeStart
        formData.data.end = timeFinish
        formData.data.hooky = hooky
        formData.data.sick = sick
        formData.data.absence = absence
        formData.data.outlet = outlet
        formData.data.full = full
        //console.log('form',props)
        props.saveShiftByUser(formData)
        reset()
        props.close(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit) }>
                <select {...register('timeStart', {onChange:(e) => timeStartCheck(e)})}  >
                    <option value='7'>7-00</option>
                    <option value='8'>8-00</option>
                    <option value='9'>9-00</option>
                    <option value='10'>10-00</option>
                    <option value='11'>11-00</option>
                    <option value='12'>12-00</option>
                    <option value='13'>13-00</option>
                    <option value='14'>14-00</option>
                    <option value='15'>15-00</option>


                </select>
                <select {...register('timeFinish', { onChange: (e) => timeFinishCheck(e) })} >
                    <option value='9'>9-00</option>
                    <option value='10'>10-00</option>
                    <option value='11'>11-00</option>
                    <option value='12'>12-00</option>
                    <option value='13'>13-00</option>
                    <option value='14'>14-00</option>
                    <option value='15'>15-00</option>
                    <option value='16'>16-00</option>
                    <option value='17'>17-00</option>
                    <option value='18'>18-00</option>
                    <option value='19'>19-00</option>

                </select>
                <div>
                    <label>hooky</label>
                    <input type='checkbox' {...register('hooky', { onChange: (e) => selectHook(e) })} checked={hooky} />
                </div>
                <div>
                    <label>sick</label>
                    <input type='checkbox' {...register('sick',{onChange:(e)=>selectSick(e)})} checked={sick} />
                </div>
                <div>
                    <label>outlet</label>
                    <input type='checkbox' {...register('outlet',{onChange:(e)=>selectOutlet(e)})} checked={outlet} />
                </div>
                <div>
                    <label>absence</label>
                    <input type='checkbox' {...register('absence',{onChange:(e)=>selectAbsence(e)})} checked={absence} />
                </div>
                <div>
                    <label>full</label>
                    <input type='checkbox' {...register('full',{onChange:(e)=>selectFull(e)})} checked={full} />
                </div>


                <button type='submit'>apply</button>
            </form>
            
            
            <div>{JSON.stringify(props.data)}</div>
        </div>
    )
}

export default DropDownWorkShiftForm;