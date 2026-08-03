import c from './modal.module.css'
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";

const DetailsListModal = (props) => {
    const isActive = props.active
    const closeModal = () => {
        props.close(false)
    }
    
    const tempKit = [...props.kit]
    let kit = []
    if (props.workName && props.amount) {
        console.log(props)
        if (props.workName === 'Заливка дет памятника') {
            kit = tempKit.map((item, i) => {
                return <div key={i}>{item.articul} - {item.amount} шт</div>
            })
        } else {
            kit = tempKit.map((item, i) => {
                item.amount = props.amount
                return <div key={i}>{item.articul} - {item.amount} шт</div>
            })
        }
        
    }
    
    const agreeFunction = () => {
        props.agreeFunc(props.kit)
        closeModal()
    }
    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content}>
                <div className={c.close}><DeleteCyrcleButton func={closeModal} /></div>
                <div className={c.modal_title}><p>Добавить на склад следующие позиции?</p></div>
                <div>{props.workName}</div>
                {kit}
                <div className={c.button_box}>
                    <div onClick={()=>closeModal()} className={c.button}>close</div>
                    <div onClick={()=>agreeFunction()} className={c.button}>agree</div>
                </div>

            </div>
        </div>
    )
}

export default DetailsListModal;