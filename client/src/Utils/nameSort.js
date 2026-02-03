export const nameSort = (array,substr,field)=>{
    let result = [];
    if(substr === '') return []//обнуляет все дивы в списке артикулов
    array.forEach(item=>{
        if(item[field].toLowerCase().startsWith(substr.toLowerCase())){
            result.push(item);
        }
    })
    return result;
}
export const nameOrdersSort = (array,substr,field,fieldText)=>{
    console.log(array)
    let result = []
    if(substr === '') return array
    array.forEach(item=>{
        if(item[field].toLowerCase().startsWith(substr.toLowerCase()) || item[fieldText].toLowerCase().startsWith(substr.toLowerCase())){
            result.push(item);
        }
    })
    return result
}
