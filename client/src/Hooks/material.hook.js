import {useCallback, useEffect, useState} from "react";
import {betonAPI, supportAPI} from "../Api/api";

export const useMaterial = ()=>{
    let [material,setMaterial] = useState([]);

    useEffect(()=>{
        supportAPI.getMaterial().then(data=>{
            setMaterial(data);
        })
    },[])

    return {material}
}

export const useMaterials = ()=>{
    let [materials, setMaterials] = useState([]);
    useEffect(()=>{
        supportAPI.getMaterials().then(data=>{
            setMaterials(data);
        })
    },[])
    return [materials];
}
export const useMatState = () => {
    let [materials, setMaterials] = useState([]);
    let [betonDetails,setBetonDetails] = useState([]);
    let [stone,setStone] = useState([]);
    let [workOperations,setWorkOperations] = useState([]);
    let [rate,setRate] = useState([]);
    let [betonMix,setBetonMix] = useState([])

    useEffect(()=>{
        betonAPI.getBetonState().then(data=>{
            setMaterials(data.materials_build)
            setBetonDetails(data.betonDetails)
            setStone(data.mat)
            setWorkOperations(data.workOperations)
            setRate(data.rate)
            setBetonMix(data.betonMix)
        })
    },[])
    return [materials,betonDetails,stone,workOperations,rate,betonMix]
}

export const useOwnState = () => {
    let [allState,setAllState] = useState({})
    useEffect(()=>{
        betonAPI.getBetonState().then(data=>{
            setAllState(data)
        })
    },[])
    return {allState}
}

export const useBetonDetails = () => {
    const [details,setDetails] = useState([]);
    useEffect(()=>{
        betonAPI.getBetonDetails().then(data=>{
            setDetails(data);
        })
    },[])
    return [details];
}

export const addMaterial = ()=>{
    let body = {
        name:'name',
        USD:0.0,
        EUR:0.0,
        RUR:0.0,
        BLR:0.0
    }
    supportAPI.addRates(body);
}
