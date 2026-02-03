export const buildFloat = (num)=>{
    num = num.toString();
    if(num===''){
        return 0;
    }
    return parseFloat(num.replace(/,/,'.'));
}

export const convertToInt = (el)=>{
    el = el.toString();
    if(el === ''){
        return 0;
    }
    const digits = /^[0-9]+$/

    if(el.match(digits)){
        el = parseInt(el)
        return el
    }else{
        return 0;
    }
}
