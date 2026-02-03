
export const sortAWSFolder = (data)=>{
    let result = [];
    data.forEach((item)=>{
        if(item.Size<1){
            result.push(item);
        }
    })
    return result;
}
export const sortAWSFiles = (data)=>{
    return null;
}