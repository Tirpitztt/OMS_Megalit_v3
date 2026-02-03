import React, {useState} from 'react';
import c from './admincontent.module.css'
import AddArticleForm from "../../../Common/Forms/add-article-form";
import AddFileForm from "../../../Common/Forms/add-file-form";

const AdminContent = (props) => {



    return (
        <div className={c.admin_wrap}>
            <div className={c.admin_modal_wrap}>
                <div className={c.title_wrap}>
                    <div className={c.title}>Добавить новость</div>
                    <div className={c.button_wrap}>
                        <div className={c.button} onClick={()=>props.setActive(false)}>скрыть</div>
                        <div className={c.button} onClick={()=>props.setActive(true)}>показать</div>
                    </div>
                </div>
                <div className={props.isActive?c.add_article_box:c.hide}>
                    <AddArticleForm userName={props.userName}
                                    editArt={props.editArt}
                                    editArticle={props.editArticle}
                                    setEditArticle={props.setEditArticle}
                                    addArticle={props.addArticle}/>
                    <AddFileForm addFile={props.addFile}/>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;
