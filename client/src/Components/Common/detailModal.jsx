import c from './modal.module.css'
import {useForm} from "react-hook-form";

const DetailModal = (props)=>{
    let matArr=[];
    for (const key in props.material) {
        matArr.push(props.material[key]);
    }
    let matOptions = matArr.map((item,i)=>{
        return <option value={item.name} key={i}>{item.name}</option>
    })
    let isActive = props.active;
    const { register,
            handleSubmit,
            formState:{errors,submitCount},
            watch,
            reset
    }=useForm();

    const material=watch('material');
    const height = watch('height');
    const width = watch('width');
    const weight = watch('weight');

    const closeModal = ()=>{
        reset();
        getPrice(true);
        props.setActive(false);
    }
    const getPrice = (bool)=>{
        if(bool){
            props.getPrice({},true);
        }else{
            if(width&&height){
                let body = {
                    material:material,
                    height:height,
                    width:width,
                    weight:weight
                }
                props.getPrice(body,false);
            }
        }
    }

    const onSubmit = (body)=>{
        body.type = 'detail';
        body.compl = props.complID;
        body.price = props.price;
        props.saveChange(body);
        props.getState(props.number);
        closeModal();
    }

    return(
        <div className={isActive?c.active:c.modalwr}>
            <div className={c.content_det}>
                <div className={c.close} onClick={closeModal}>X</div>
                <p>Создать деталь</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={c.form_wrap}>
                        <div className={c.detail_box}>
                            <select {...register('name',{required:true})} >
                                <option value="стела" selected >стела</option>
                                <option value="подставка">подставка</option>
                                <option value="цветник">цветник</option>
                                <option value="надгр пл">надгр.плита</option>
                                <option value="капля">капля</option>
                                <option value="крест">крест</option>
                                <option value="столбик">столбик</option>
                                <option value="перемычка">перемычка</option>
                                <option value="доп дет">доп.дет</option>
                            </select>
                            <select {...register('type')} >
                                <option value="памятник" selected>памятник</option>
                                <option value="ограда">ограда</option>
                                <option value="маф">МАФ</option>
                                <option value="бетон">бетон</option>
                                <option value="забор">забор</option>
                                <option value="аксессуары">акссесуары</option>
                            </select>
                            <select {...register('sort')} >
                                <option value="A">A</option>
                                <option value="B" selected>B</option>
                                <option value="С">без сорта</option>
                            </select>
                            <select {...register('material',
                                {required:true,onChange:()=>getPrice(false)})}>
                                {matOptions}
                            </select>

                        </div>

                        <input placeholder='article' {...register('article')} />
                        <div className={c.gabarit_box}>
                            <select {...register('weight',
                                {required:true,onChange:()=>getPrice(false)})}>
                                <option value="t_2">T2</option>
                                <option value="t_3">T3</option>
                                <option value="t_5" selected>T5</option>
                                <option value="t_8">T8</option>
                                <option value="t_10">T10</option>
                                <option value="t_12">T12</option>
                                <option value="t_15">T15</option>
                                <option value="t_20">T20</option>
                                <option value="t_25">T25</option>
                                <option value="t_30">T30</option>
                            </select>
                            {errors.weight &&<i style={{color:"red"}}>заполни</i>}
                            <input placeholder='высота' {...register('height',
                                {required:true,min:1,onBlur:()=>getPrice(false)})} />
                            {errors.height &&<i style={{color:"red"}}>заполни</i>}
                            <input placeholder='ширина' {...register('width',
                                {required:true,min:1,onBlur:()=>getPrice(false)})}/>
                            {errors.width &&<i style={{color:"red"}}>заполни</i>}
                        </div>
                        <input readOnly value={props.price} {...register('price',{required:true,min:1})} />
                        <input defaultValue='1' {...register('amount',{required:true,min:1})} />
                        <div className={c.local_box}>
                            <input readOnly defaultValue='true' {...register('status')} />
                            <input readOnly defaultValue='sklad' {...register('local')} />
                        </div>

                        <input type="submit" value='Добавить деталь' disabled={props.price==0}/>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default DetailModal;