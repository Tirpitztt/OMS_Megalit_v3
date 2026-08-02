import {buildFloat} from "./buildNum";
import {useBetonDetails} from "../Hooks/material.hook";
import React from "react";
import c from "../Components/PrintOrder/AdditionalAgreement/agree.module.css";
import Detail from "./Classes/detail";
import {
    DETAIL_NAMES,
    FENCE_NAMES,
    MONUMENT_NAMES,
    SHOP_NAMES,
    SIZE_TYPE_FACE,
    SIZE_TYPE_FACET_AROUND,
    SIZE_TYPE_FACET_UP,
    SIZE_TYPE_FACE_AROUND,
    FORM_POLISH,
    PROCESS_TYPE_FACE,
    PROCESS_TYPE_TWO_FACES,
    PROCESS_TYPE_FACE_AROUND,
    PROCESS_TYPE_FACET_UP,
    PROCESS_TYPE_FACET_AROUND,
    PROCESS_TYPE_SIDE_AROUND,
    PROCESS_TYPE_DETAIL_AROUND,
    SIZE_TYPE_SIDE_AROUND,
    OPERATION_POLISH_FACE,
    OPERATION_POLISH_FACET,
    OPERATION_POLISH_SIDE, STELA, OTHER, TUMBA
} from "./variables-const";
import SalaryCalculateBody from "./Classes/salaryCalaculateBody";



export const setStonePrice = (data,stone,func,name,betPrice) => {
    if(data!==undefined && data.length){
        let height = 0;
        if(data[1].height !== undefined){
            height = data[1].height
        }
        let width = 0;
        if(data[2].width !== undefined){
            width = data[2].width
        }
        let weight = data[3].weight;
        let stoneID = data[0].material;
        let squarePrice = 0;
        stone.forEach((item,i)=>{
            if(item.id == stoneID){
                item.slabs.forEach((slab)=>{
                    if(slab.weight == weight){
                        squarePrice = slab.price;
                    }
                })
            }
        })
        let result = ((height*width) * squarePrice)/10000
        if(betPrice>0){
            let p = betPrice.toFixed(2)
            func(name,p);
        }else{
            let p = result.toFixed(2)
            func(name,p);
        }
    }
}
export const setWeightOptions = (stoneArr,stoneID,setVal,setName) => {
    let optionRes = <option value="">data-ta</option>
    stoneArr.forEach((item)=>{
        if(item.id == stoneID){
            setName(item.name)
            optionRes = item.slabs.map((slab,i)=>{
                return <option key={i} value={slab.weight}>{slab.weight}</option>
            })
        }
    })
    setVal(optionRes)
}

export const setNameDetailList = (type,func)=>{
    let nameList;
    switch (type){
        case 'памятник':{
            nameList = MONUMENT_NAMES.map((item,i)=>{
                return <option key={i} value={item.value}>{item.text}</option>
            })
            break;
        }
        case 'ограда':{
            nameList = FENCE_NAMES.map((item,i)=>{
                return <option key={i} value={item.value}>{item.text}</option>
            })
            break;
        }
        case 'магазин':{
            nameList = SHOP_NAMES.map((item,i)=>{
                return <option key={i} value={item.value}>{item.text}</option>
            })
            break;
        }
        case 'тип дет':{
            nameList = DETAIL_NAMES.map((item,i)=>{
                return <option value={item.value} key={i}>{item.text}</option>
            })
            break;
        }
        default:{
            nameList = [<option>non variable</option>]
        }
    }
    func(nameList);
}

// export const exchangeBlr = (blr,currency)=>{
//     if(currency===0){
//         throw new Error('error: currency = 0');
//         return 1;
//     }
//     return (blr/currency).toFixed(2);
// }

export const getBetonMixPrice = (mix,mat,rate) => {

    mix.forEach(function(item){
        item.price = 0;
        for(let i = 0; i < item.beton_ingredients.length;i++){
            for(let j = 0; j<mat.length; j++){
                if(item.beton_ingredients[i].materialId === mat[j].id){
                    item.price += item.beton_ingredients[i].amount * mat[j].BLR;
                }
            }
        }
    })

    //console.log(mix)
    return mix;
}

export const setSumDet = (data,materials,mixes,operations)=>{
    let detV,detS,matSum=0,workSum=0,addSum=0,price,addCost=0,markup=0;

    if(data.dataNumbers!==undefined&&data.dataNumbers.length){
        let h = buildFloat(data.dataNumbers[0].height/100)||0;
        let w = buildFloat(data.dataNumbers[1].width/100)||0;
        let ww = buildFloat(data.dataNumbers[2].weight/100);
        detV = (h*w*ww).toFixed(4);
        detS = buildFloat(((h*w)*2)+((h*ww)*2)+(w*ww)).toFixed(4);
        if(data.dataNumbers[3].mixID){
            mixes.forEach(function(item){
                if(data.dataNumbers[3].mixID==item.id){
                    //console.log('ip',item.price*detV)
                    matSum += buildFloat((item.price*1)*detV)
                }
            })
        }
        addCost = data.dataNumbers[5].added_cost||0;
        if(data.dataNumbers[4].markup>0){
            markup = (data.dataNumbers[4].markup/100)
        }
    }

    if(data.dataArr[0].complectList.length) {
        let detMat = [...data.dataArr[0].complectList]
        for (let i = 0; i < detMat.length; i++) {
            for (let j = 0; j < materials.length; j++) {
                if (detMat[i].elementID == materials[j].id) {
                    let amount = buildFloat(detMat[i].amount)
                    matSum += materials[j].BLR * amount
                }
            }
        }
    }
    if(data.dataArr[1].complectList.length){
        let detOp = [...data.dataArr[1].complectList]
        for(let i=0;i<detOp.length;i++){
            for(let j=0;j<operations.length;j++){
                if(detOp[i].elementID == operations[j].id){
                    workSum += operations[j].BLR * detOp[i].amount;
                }
            }
        }
    }
    if(data.dataNumbers!==undefined&&data.dataNumbers.length){
        if(markup){
            addSum = (markup*(matSum+workSum))+buildFloat(addCost);
        }else{
            addSum += buildFloat(addCost);
        }

    }

    let res = {
        Vdet:detV,
        Sdet:detS,
        sumWork:workSum.toFixed(2),
        sumMat:matSum.toFixed(2),
        sumMarkup:addSum.toFixed(2),
        priceDet:(workSum+matSum+addSum).toFixed(2)
    };
    return res;
}
export const setDetailPrice = (det,mixes,mats,works) => {
    let data = {
        cost:0,
        work:0,
        price:0
    };
    if(mixes){
        for(const item of mixes){
            if(item.id===det.betmixID){
                data.cost += item.price * det.V
            }
        }
        for(const item of det.additional_mats){
            for(const mat of mats){
                if(item.materialId === mat.id){
                    data.cost += item.matAmount * mat.BLR
                }
            }
            for(const work of works){
                if(item.workOperationId === work.id){
                    data.work += item.workAmount * work.BLR
                }
            }
        }
    }
    data.price = (data.work + data.cost) + ((data.work + data.cost) * (det.markup/100)) + det.added_cost

    return data;
}

export const setEditDetailState = (det) => {
    let editDetail = {
        S:det.S,
        V:det.V,
        added_cost:det.added_cost,
        articul:det.articul,
        betMixID:det.betmixID,
        id:det.id,
        height:det.height,
        width:det.width,
        weight:det.weight,
        name:det.name,
        markup:det.markup,
        additive_mat:[],
        operations_work:[]
    };
    if(det.additional_mats.length){
        det.additional_mats.forEach(function(item){
            let element = {
                id:0,
                elementID:0,
                amount:0
            }
            if(item.materialId){
                element.id = item.id;
                element.elementID = item.materialId;
                element.amount = item.matAmount;
                editDetail.additive_mat.push(element)
            }
            if(item.workOperationId){
                element.id = item.id;
                element.elementID = item.workOperationId;
                element.amount = item.workAmount;
                editDetail.operations_work.push(element)
            }
        })
    }



    return editDetail;
}
export const detailSort = (data) => {
    //console.log(data)
    let sortArr = [];
    switch (data.category){
        case 'all':{
             sortArr = [...data.details]
            return sortArr
        }
        case 'стела':{
            data.details.forEach(function(item){
                if(item.name=='стела'){
                    sortArr.push(item)
                }
            })
            return sortArr
        }
        case 'подставка':{
            data.details.forEach(function(item){
                if(item.name=='подставка'){
                    sortArr.push(item)
                }
            })
            return sortArr
        }
        case 'цветник':{
            data.details.forEach(function(item){
                if(item.name=='цветник'){
                    sortArr.push(item)
                }
            })
            return sortArr
        }
        case 'ограды':{
            data.details.forEach(function(item){
                if(item.name=='перемычка'||item.name=='столбик'){
                    sortArr.push(item)
                }
            })
            return sortArr
        }
        case 'другое': {
            data.details.forEach(item => {
                if (item.name !== 'стела' && item.name !== 'подставка') {
                    sortArr.push(item)
                }
            })
            return sortArr
        }
        default: return sortArr
    }
}

export const sortDetailParamsBuilder = (val) => {
    //используя тип параметра установить для каждого поля свой параметр

    switch (val) {
        case OTHER: {
            let result = []
            DETAIL_NAMES.forEach((item)=>{
                if(item.value !== STELA && item.value !== TUMBA){
                    result.push(item.value)
                }
            })
            return result
        }
        default: return [val]
    }
    
   
}

//export const setOperationsSum = (operations,data,amount,fieldKey,
//                                valueFunction,setNameFunction,correctCost) => {
//    let sum = 0
//    //console.log(data)
//    if (operations.length && data !== undefined && !correctCost) {
//        operations.forEach(item => {
//            if (item.id == data[0].id) {
//                valueFunction(fieldKey, item.BLR)
//                setNameFunction(item.name)
//                sum = item.BLR * amount
//            }
//        })
//    } else if (operations.length && data !== undefined && correctCost) {
//        valueFunction(fieldKey, correctCost)
//        sum = correctCost * amount
//    }
//    //console.log(data)
//    return buildFloat(sum).toFixed(2)
//}
//export const setOperationName = (id, operations) => {
//    let result = ''
//    if (operations.length) {
//        for (let op of operations) {
//            if (op.id == id) {
//                result = op.name
//            }
//        }
//    }
//    return result
//}
export const getOpAdditName = (type) => {
    switch (type) {
        case PROCESS_TYPE_FACE: { return ' +л' }
        case PROCESS_TYPE_TWO_FACES: { return ' +л +с' }
        case PROCESS_TYPE_FACE_AROUND: { return ' +л в круг' }
        case PROCESS_TYPE_FACET_UP: { return ' +ф верх' }
        case PROCESS_TYPE_FACET_AROUND: { return ' +ф в круг' }
        case PROCESS_TYPE_SIDE_AROUND: { return ' +т в круг' }
        case PROCESS_TYPE_DETAIL_AROUND: {return ' +л+т+ф' }
        default:return ''
    }
}
export const setMixName = (id,mixes) => {
    let name;
    if(mixes){
        for(const item of mixes){
            if(item.id===id){
                name = item.notation
            }
        }
    }


    return name;
}

export const dateFormat = (date) => {
    let result = date.toString();
    let strToArr = result.split('-');
    strToArr.reverse()
    return strToArr.join('-')
}

export const articulCheck = (articul,array,func,articulMatch)=>{
    if(articul === articulMatch)return

    array.forEach(function(item,i){
        if(articul === item.articul){
            func('articul',
                {type:'focus',message:'артикул уже существует'},
                {shouldFocus:true})
        }
    })

}

export const getDetailOfArticul = (state,element) => {
    let body = {
        material:'',
        price:''
    }
    if(element.category === 'beton'){
        body.material = setMixName(element.betmixID,state.betonMix)
        body.price = (setDetailPrice(element,
            getBetonMixPrice(state.betonMix,state.materials_build),
            state.materials_build,state.workOperations)).price/state.rate[0].USD

    }
    if(element.category === 'goods'){
        body.material = element.material;
        body.price = element.price;
    }

    return body;
}

export const correctPrice = (complect,correct) => {
    if(correct <= 0) return complect
    let count =  0;
    let complectSumm = 0;
    let correctSum = 0;
    complect.complect_items.forEach(detail=>{
        count += buildFloat(detail.amount)
        complectSumm += (detail.price * detail.amount)
    })
    let different = correct - complectSumm;
    if(count > 0){
        correctSum = different / count;
    }
    complect.summComplect = 0;
    complect.complect_items.forEach(detail=>{
        detail.price += correctSum
        complect.summComplect += detail.price * detail.amount
    })
    //console.log('correct1')
    return complect
}
export const sortDetails = (obj) => {
    let added = []
    let deleted = []
    if(obj.complect_items.length){
        obj.complect_items.forEach(item=>{
            if(item.added.length){
                item.added.forEach(detal=>{
                    added.push(detal)
                })
            }
            if(item.deleted.length){
                item.deleted.forEach(detal=>{
                    deleted.push(detal)
                })
            }
        })
    }
    if(obj.complects.added.length){
        obj.complects.added.forEach(item=>{
            if(item.complect_items.length){
                item.complect_items.forEach(detal=>{
                    added.push(detal)
                })
            }
        })
    }
    if(obj.complects.deleted.length){
        obj.complects.deleted.forEach(item=>{
            if(item.complect_items.length){
                item.complect_items.forEach(detal=>{
                    deleted.push(detal)
                })
            }
        })
    }
    if(obj.handling_items.added.length){
        obj.handling_items.added.forEach(detal=>{
            added.push(detal)
        })
    }
    if(obj.handling_items.deleted.length){
        obj.handling_items.deleted.forEach(detal=>{
            deleted.push(detal)
        })
    }
    if(obj.montaz_items.added.length){
        obj.montaz_items.added.forEach(detal=>{
            added.push(detal)
        })
    }
    if(obj.montaz_items.deleted.length){
        obj.montaz_items.deleted.forEach(detal=>{
            deleted.push(detal)
        })
    }
    return {added,deleted}
}

export const agreeDetailsBodyCreator = (detailsArr) => {
    return detailsArr.map((item,i)=>{
        let detType = <span>{item.type} - {item.category}</span>
        if(item.height){
            detType = <span>({item.material}) - {item.height}x{item.width}x{item.weight}</span>
        }
        return <div key={i} className={c.details_item}>
            <div>{item.name} - {detType}</div>
            <div>{(item.price*item.rate).toFixed(2)}, бел.руб</div>
            <div>{item.amount}</div>
        </div>
    })

}

export const sketchGallery = (gallery,styles) => {
    let styleIndex = 0;
    if(gallery.length > 1 && gallery.length < 5){
        styleIndex = 1
    }else if(gallery.length > 4){
        styleIndex = 2
    }
     return gallery.map((item,i)=>{
        return <div key={i} className={styles[styleIndex]}>
            <img src={item.link} alt="" />
        </div>
    })

}
export const getAgreeImgArray = (array) => {
    return array.map((item,i)=>{
        return <div key={i} className={c.img_card} >
            <img src={item.link} alt=""/>
        </div>
    })
}

export const getDetailId = ()=>{
    return new Date().getTime()

}

export const getSizeSq = (type,width, height, weight) => {
    
    let w = width ? width / 100 : 0
    let h = height ? height / 100 : 0
    let l = weight ? weight / 100 : 0
    switch (type) {
        case SIZE_TYPE_FACE: { return (w * h).toFixed(2) }
        case SIZE_TYPE_FACE_AROUND: { return (((w * h) * 2) + ((h * l) * 2) + (w * l)).toFixed(2) }
        case SIZE_TYPE_FACET_UP: { return (w * 2).toFixed(2) }
        case SIZE_TYPE_FACET_AROUND: { return ((w * 2) + (h * 4) + (l * 2)).toFixed(2) }
        case SIZE_TYPE_SIDE_AROUND: { return ((h * 2) +  w).toFixed(2) }
        default:return 0
    }

    
}

export const getTempCost = (check, defaultValue, operations,typeOperation, sizeData) => {
    let result = 0
    let defaultCost = 0
    for(let op of operations){
        if(op.name.includes(typeOperation)){
            defaultCost = op.BLR
        }
    }
    if (check) {
        result = buildFloat(defaultValue + (defaultCost * (+sizeData)))
    } else if (defaultValue !== 0) {
        result = buildFloat(defaultValue - (defaultCost * (+sizeData)))
    }
    //console.log('res',result)
    return buildFloat(result)
}
export const getTempCostOfAround = (check, defaultValue, operations, sizeData) => {
    let result = 0
    let defaultCost = 0
    for (let op of operations) {
        if (op.name.includes(OPERATION_POLISH_FACE)) {
            defaultCost += op.BLR * sizeData.faces
        }
        if (op.name.includes(OPERATION_POLISH_FACET)) {
            defaultCost += op.BLR * sizeData.facet
        }
        if (op.name.includes(OPERATION_POLISH_SIDE)) {
            defaultCost += op.BLR * sizeData.side
        }
    }
    if (check) {
        result = buildFloat(defaultValue + (defaultCost))
    } else if (defaultValue !== 0) {
        result = buildFloat(defaultValue - (defaultCost))
    }
    return buildFloat(result)

}

