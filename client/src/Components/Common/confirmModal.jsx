import c from './modal.module.css'

const ConfirmModal = ({active,setActive,txt,func})=>{
    let isActive = active;
    const sendOK = ()=>{
        func()
        setActive(false)
    }
    const close = ()=>{
        setActive(false);
    }
    return (
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content+' '+c.confirm}>
                {/*<p>Вы точно хотите изменить данные заказчика?</p>*/}
                {txt}
                <div className={c.button_box}>
                    <div className={c.button} onClick={close}><p>Нет, не сейчас</p></div>
                    <div className={c.button} onClick={sendOK}><p>Да,хочу</p></div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmModal;
