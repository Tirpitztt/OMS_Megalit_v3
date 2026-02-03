import {buildFloat} from "./buildNum";
import {useBetonDetails} from "../Hooks/material.hook";
import React from "react";
import c from "../Components/PrintOrder/AdditionalAgreement/agree.module.css";
import Detail from "./Classes/detail";
import {DETAIL_NAMES, FENCE_NAMES, MONUMENT_NAMES, SHOP_NAMES} from "./variables-const";



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

export const exchangeBlr = (blr,currency)=>{
    if(currency===0){
        throw new Error('error: currency = 0');
        return 1;
    }
    return (blr/currency).toFixed(2);
}

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
        default: return sortArr
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
// export const getAdditionalAgreeBody = (order,oldOrder) => {
//     let body = {
//         termin:false,
//         text:false,
//         size:false,
//         delivery:false,
//         totalCost:false,
//         deleted:[],
//         added:[]
//     }
//     if(order.termin.date_finish !== oldOrder.termin.date_finish){
//         body.termin = {
//             before:oldOrder.termin.date_finish,
//             after:order.termin.date_finish}
//     }
//     if(order.handling.text_grav !== oldOrder.handling.text_grav){
//         body.text = {
//             before:oldOrder.handling.text_grav,
//             after:order.handling.text_grav}
//     }
//     if(order.calculation.total_cost !== oldOrder.calculation.total_cost){
//         body.totalCost = {
//             before:oldOrder.calculation.total_cost * oldOrder.calculation.rate,
//             after:order.calculation.total_cost * order.calculation.rate
//         }
//     }
//     if(order.montaz.height !== oldOrder.montaz.height ||
//         order.montaz.weight !== oldOrder.montaz.weight ||
//         order.montaz.width !== oldOrder.montaz.width){
//         body.size = {
//             before:`${oldOrder.montaz.weight} x ${oldOrder.montaz.width} x ${oldOrder.montaz.height},m`,
//             after:`${order.montaz.weight} x ${order.montaz.width} x ${order.montaz.height},m`
//         }
//     }
//     if(order.montaz.delivery !== oldOrder.montaz.delivery){
//         body.delivery = {
//             before:oldOrder.montaz.delivery,
//             after:order.montaz.delivery
//         }
//     }
//     let allDetails = []
//     let oldDetails = []
//     let newDetails = []
//     if(order.complects.length){
//        order.complects.forEach((item)=>{
//           item.complect_items.forEach(detail=>{
//               allDetails.push(detail)
//               newDetails.push(detail)
//           })
//        })
//     }
//     if(oldOrder.complects.length){
//         oldOrder.complects.forEach((item)=>{
//             item.complect_items.forEach(detail=>{
//                 allDetails.push(detail)
//                 oldDetails.push(detail)
//             })
//         })
//     }
//     if(order.handling.handling_items.length){
//         order.handling.handling_items.forEach(detail=>{
//             allDetails.push(detail)
//             newDetails.push(detail)
//         })
//     }
//     if(oldOrder.handling.handling_items.length){
//         oldOrder.handling.handling_items.forEach(detail=>{
//             allDetails.push(detail)
//             oldDetails.push(detail)
//         })
//     }
//     if(order.montaz.montaz_items.length){
//         order.montaz.montaz_items.forEach(detail=>{
//             allDetails.push(detail)
//             newDetails.push(detail)
//         })
//     }
//     if(oldOrder.montaz.montaz_items.length){
//         oldOrder.montaz.montaz_items.forEach(detail=>{
//             allDetails.push(detail)
//             oldDetails.push(detail)
//         })
//     }
//     let originDet = []   // позиции без пар
//     for(let i = 0; i<allDetails.length;i++){
//         let count = 0
//         for(let j = 0;j<allDetails.length;j++){
//             if(allDetails[i].id === allDetails[j].id && i !== j){ // если пара нашлась
//                 count++
//             }
//         }
//         if(count === 0){ // если нет пары
//             originDet.push(allDetails[i])
//         }
//     }
//     newDetails.forEach((item)=>{
//         originDet.forEach((origin)=>{
//             if(JSON.stringify(item) === JSON.stringify(origin)){
//                 //item.price = item.price * order.calculation.rate
//                 body.added.push(item)
//             }
//         })
//     })
//     oldDetails.forEach((item)=>{
//         originDet.forEach((origin)=>{
//             if(JSON.stringify(item) === JSON.stringify(origin)){
//                 item.price = item.price * oldOrder.calculation.rate
//                 body.deleted.push(item)
//             }
//         })
//     })
//     console.log('support:',body)
//     return body;
// }
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
