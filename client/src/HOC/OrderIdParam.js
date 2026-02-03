import {useParams} from "react-router-dom";
import * as React from 'react'
import * as axios from "axios";
import {useCallback} from "react";

export const useOrderIdParam = ()=>{
    let param = useParams();
    const request = useCallback(async (url)=>{
        try{
            const response = await fetch(url+param.orderId);
            const data = await response;
            console.log(data);
            return data;

        }catch (e) {
            throw e;
        }
    },[])
    return {request};
}