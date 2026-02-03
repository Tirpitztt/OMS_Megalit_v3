import React from 'react';
import MaterialSection from "./Sections/material-section";
import RateSection from "./Sections/rate-section";
import c from './admin.module.css';
import UserSection from "./Sections/user-section";
import WorkOpSection from "./Sections/work-op-section";
import StoneSection from "./Sections/stone-section";
import GdsSection from "./Sections/gds-section";
import AdminPathButton from "../UI/Buttons/admin-path-button";

const AdminPage = (props) => {



    return (
        <div>
            <div className={c.admin_box}>
                <div className={c.admin_box_title}><p>Добро пожаловать в уютную админку</p></div>
                <div className={c.admin_button_box}>
                    <AdminPathButton path={props.state.adminButtons.employees.path} text={props.state.adminButtons.employees.text} />
                    <AdminPathButton path={props.state.adminButtons.beton.path} text={props.state.adminButtons.beton.text} />
                    <AdminPathButton path={props.state.adminButtons.tokar.path} text={props.state.adminButtons.tokar.text} />
                </div>
            </div>
           <div className={c.admin_content}>
               <div className={c.content}>
                   <div className={c.left}>
                       <RateSection state={props.state}
                                    addRowMat={props.addRowMat}
                                    changeField={props.changeField}
                                    saveMat={props.saveMat}
                                    selectEl={props.selectEl}/>
                   </div>
                   <div className={c.right}>
                       <UserSection addUser={props.addUser} />
                   </div>
               </div>
               <div className={c.content}>
                   <div className={c.left}>
                       <MaterialSection state={props.state} add={props.addMaterial} edit={props.editMaterial}/>
                   </div>
                   <div className={c.right}>
                        <WorkOpSection state={props.state}
                                       add={props.addOperation}
                                       edit={props.editOperation}/>
                   </div>
               </div>
               <div className={c.content}>
                   <StoneSection state={props.state}
                                 formState={props.formState}
                                 setFieldsArray={props.setFieldsArray}
                                 addFieldToArray={props.addFieldToArray}
                                 addFieldToWork={props.addFieldToWork}
                                 clearStateFields={props.clearStateFields}
                                 setEditStone={props.setEditStone}
                                 editStone={props.editStone}
                                 addStone={props.addStone}
                   />
               </div>
               <div className={c.content}>
                   <GdsSection state={props.state}
                               formState={props.formState}
                               addGDS={props.addGDS}
                               editGDS={props.editGDS}
                               clearStateFields={props.clearStateFields}
                               setEditGDS={props.setEditGDS}
                   />
               </div>
           </div>
        </div>
    );
};

export default AdminPage;
