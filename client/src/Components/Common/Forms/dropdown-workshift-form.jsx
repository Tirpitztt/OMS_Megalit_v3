import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import c from './form.module.css'


const DropDownWorkShiftForm = (props) => {
    console.log('form', props)
    let {register,handleSubmit,reset } = useForm()
    const [timeStart, setTimeStart] = useState(0)
    const [timeFinish, setTimeFinish] = useState(0)
    //const [hooky,setHooky] = useState(false)
    //const [outlet,setOutlet] = useState(false)
    //const [absence,setAbsence] = useState(false)
    //const [sick,setSick] = useState(false)
    //const [full,setFull] = useState(false)
    let hooky = false
    let outlet = false
    let absence = false
    let sick = false
    let full = false

    let formData = {}
    if (props.data) {
        formData = { ...props.data }
        hooky = props.data.data.hooky
        outlet = props.data.data.outlet
        absence = props.data.data.absence
        sick = props.data.data.sick
        full = props.data.data.full

    }
    const selectSick = (e) => {
        hooky = false
        outlet = false
        absence = false
        sick = true
        full = false

    }
    const selectHook = (e) => {
        hooky = true
        outlet = false
        absence = false
        sick = false
        full = false
    }
    const selectAbsence = (e) => {
        hooky = false
        outlet = false
        absence = true
        sick = false
        full = false
    }
    const selectFull = (e) => {
        hooky = false
        outlet = false
        absence = false
        sick = false
        full = true
    }
    const selectOutlet = (e) => {
        hooky = false
        outlet = true
        absence = false
        sick = false
        full = false
    }
    const timeStartCheck = (e) => {
        setTimeStart(e.target.value)
        //console.log(e.target.value)
    }
    const timeFinishCheck = (e) => {
        setTimeFinish(e.target.value)
        //console.log(e.target.value)
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
        <div className={c.form_wrap }>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={c.form_content}>
                    <div className={c.select_wrap}>
                        <div className={c.select_box }>
                            <label>нач.смены</label>
                            <select {...register('timeStart', { onChange: (e) => timeStartCheck(e), defaultValue:{ timeStart } })}  >
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
                        </div>
                        
                        <div className={c.select_box}>
                            <label>оконч.смены</label>
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
                        </div>
                        
                    </div>
                    <div className={c.check_wrap}>
                        <div className={c.check_box}>
                            <label>прогул</label>
                            <input type='checkbox' {...register('hooky', { onChange: (e) => selectHook(e) })} checked={hooky} />
                        </div>
                        <div className={c.check_box}>
                            <label>больн</label>
                            <input type='checkbox' {...register('sick', { onChange: (e) => selectSick(e) })} checked={sick} />
                        </div>
                        <div className={c.check_box}>
                            <label>выходной</label>
                            <input type='checkbox' {...register('outlet', { onChange: (e) => selectOutlet(e) })} checked={outlet} />
                        </div>
                        <div className={c.check_box}>
                            <label>по уваж</label>
                            <input type='checkbox' {...register('absence', { onChange: (e) => selectAbsence(e) })} checked={absence} />
                        </div>
                        <div className={c.check_box}>
                            <label>полн.смена</label>
                            <input type='checkbox' {...register('full', { onChange: (e) => selectFull(e) })} checked={full} />
                        </div>
                    </div>
                </div>
                <button type='submit'>apply</button>
            </form>
            
            
            <div>{JSON.stringify(props.data)}</div>
        </div>
    )
}

export default DropDownWorkShiftForm;