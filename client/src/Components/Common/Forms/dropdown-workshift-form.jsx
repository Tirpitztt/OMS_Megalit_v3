import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import c from './form.module.css'


const DropDownWorkShiftForm = (props) => {
    console.log('form', props)
    let {register,handleSubmit,reset } = useForm()
    const [timeStart, setTimeStart] = useState(0)
    const [timeFinish, setTimeFinish] = useState(0)
    const [hooky,setHooky] = useState(false)
    const [outlet,setOutlet] = useState(false)
    const [absence,setAbsence] = useState(false)
    const [sick,setSick] = useState(false)
    const [full, setFull] = useState(false)
    const [mandates, setMandates] = useState([])
    const [mandatTitle, setMandatTitle] = useState()
    const [mandatNotice,setMandatNotice] = useState()
    
    useEffect(() => {
        if (props.data) {
            setHooky(props.data.data.hooky)
            setOutlet(props.data.data.outlet)
            setAbsence(props.data.data.absence)
            setFull(props.data.data.full)
            setSick(props.data.data.sick)
            if (props.data.data.mandat.length) {
                setMandates([...props.data.data.mandat])
            }else(setMandates([]))
        }
    },[props.data])
    let formData = {}
    if (props.data) {
        formData = { ...props.data }
        

    }
    const selectSick = (e) => {
        
        setHooky(false)
        setOutlet(false)
        setAbsence(false)
        setFull(false)
        setSick(true)
    }
    const selectHook = (e) => {
        
        setHooky(true)
        setOutlet(false)
        setAbsence(false)
        setFull(false)
        setSick(false)
    }
    const selectAbsence = (e) => {
        
        setHooky(false)
        setOutlet(false)
        setAbsence(true)
        setFull(false)
        setSick(false)
    }
    const selectFull = (e) => {
        
        setHooky(false)
        setOutlet(false)
        setAbsence(false)
        setFull(true)
        setSick(false)
    }
    const selectOutlet = (e) => {
        
        setHooky(false)
        setOutlet(true)
        setAbsence(false)
        setFull(false)
        setSick(false)
    }
    const timeStartCheck = (e) => {
        setTimeStart(e.target.value)
        
    }
    const timeFinishCheck = (e) => {
        setTimeFinish(e.target.value)
        
    }
    const addMandat = () => {
        const mandatBody = {
            workShiftId: formData.shiftId,
            employerName: formData.userName,
            notice: mandatNotice,
            summa:mandatTitle
        }
        setMandates([...mandates,mandatBody])
    }
    let mandatesBlock = <div></div>
    if (mandates.length) {
        mandatesBlock = mandates.map((item, i) => {
            return <div className={c.mandates_title_wrap} key={i }>
                <div className={c.mandates_title}>{item.summa}</div>
                <div className={c.mandates_notice}>{item.notice}</div>
                <div className={c.mandates_add_butt}>{item.id}</div>
            </div>
        })
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
        formData.data.mandat = [...mandates]
        //console.log(formData)
        props.saveShiftByUser(formData)
        reset()
        setMandates([])
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
                
                <div className={c.mandates_block}>
                    <div className={c.mandates_title_wrap}>
                        <div className={c.mandates_title}><label>штраф/премия</label></div>
                        <div className={c.mandates_notice}><label>описание</label></div>
                        <div className={c.mandates_add_butt_box}><label></label></div>
                    </div>
                    <div className={c.mandates_title_wrap}>
                        <div className={c.mandates_title}><input onChange={(e) => setMandatTitle(e.target.value)} /></div>
                        <div className={c.mandates_notice}><input onChange={(e) => setMandatNotice(e.target.value)} /></div>
                        <div className={c.mandates_add_butt_box} onClick={addMandat}>
                            <div className={c.mandate_add_butt }>+</div>
                        </div>
                    </div>
                    {mandatesBlock}
                </div>
                <div className={c.button_wrap}>
                    <button type='submit' className={c.button_tabel_form}>сохранить</button>
                </div>
            </form>
            

            {/*<div>{JSON.stringify(props.data)}</div>*/}
            
        </div>
    )
}

export default DropDownWorkShiftForm;