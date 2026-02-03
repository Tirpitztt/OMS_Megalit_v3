import React, {useEffect, useState} from 'react';
import c from "../modal.module.css";
import {supportAPI} from "../../../Api/api";
import {sortAWSFolder} from "../../../Utils/awsS3";
import SketchModalFolder from "./sketchModalFolder";
import SketchModalFiles from "./sketchModalFiles";
import AddFileForm from "./add-file-form";
import DeleteCyrcleButton from "../../UI/Buttons/delete-cyrcle-button";

const SketchModal = ({active,setActive,addFile,setPath,orderId}) => {
    let [folder,setFolder]= useState(true);
    let [dataContur,setDataContur] = useState([]);
    let folders = [];
    let [files,setFiles] = useState([]);
    let display = <div>none data</div>
    const savePath = (path)=>{
        setFolder(true);
        setPath(path);
        setActive(false);
    }
    useEffect(()=>{
        supportAPI.getContures().then(data=>{
                setDataContur(data.Contents);
            }
        )
    },[folder])
    const selectFolder = (key)=>{
        let body = {
            path:key
        }
        supportAPI.getConturesEntry(body).then(data=>{
            setFiles(data.Contents);
            if(data.Contents){
                setFolder(false);
            }
        })
    }

    const mainDisplay = ()=>{
        folders = sortAWSFolder(dataContur);
        display = <SketchModalFolder state={folders} select={selectFolder}/>
    }
    if(dataContur.length){
        mainDisplay();
    }
    if(files.length){
        display = <SketchModalFiles state={files} select={savePath} back={setFiles}/>
    }


    return (
        <div className={active?c.active:c.modalwr}>
            <div className={c.contentSketch}>
                <div className={c.sketch_title_box}>
                    <div className={c.close}><DeleteCyrcleButton func={setActive} number={false} /></div>
                    <div><p>Выбрать эскиз</p></div>
                </div>
                {display}
                <div className={c.added_box}>
                    <div>добавить с устройства</div>
                    <AddFileForm addFile={addFile} orderId={orderId}/>
                </div>
            </div>

        </div>
    );
};

export default SketchModal;
