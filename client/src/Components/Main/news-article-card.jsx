import React, {useState} from 'react';
import c from './main.module.css'
import CommentCard from "./comment-card";
import {dateTimeFormat} from "../../Utils/dateTermin";

const NewsArticleCard = (props) => {

    const [comment,setComment] = useState('')
    const [isActive,setActive] = useState(false)
    let time = dateTimeFormat(props.article.createdAt)
    const editClick = () => {
        props.setActive(true)
        props.setEditArticle([props.article])
    }
    const deleteClick = () =>{
        let body = {id: props.article.id}
        props.deleteArticle(body)
    }
    let comments = <div>no comments</div>
    if(props.article.comments){
        comments = props.article.comments.map((item,i)=>{
            return <CommentCard key={i} comment={item}
                                userRole={props.userRole}
                                deleteComment={props.deleteComment}/>
        })
    }
    let buttonBox = <div></div>
    if(props.userRole === 'konung'){
        buttonBox = <div className={c.admin_button_box}>
            <div onClick={editClick}>править</div>
            <div onClick={deleteClick}>удалить</div>
        </div>
    }
    const commentBodyCreate = (e)=>{
        setComment(e.target.value)
    }
    // const autoHeight = (elem) => {
    //     //console.log(elem);
    // }

    const addComment = ()=>{
        let body = {
            articleId:props.article.id,
            text:comment,
            author:props.userName
        }
        props.addComment(body)
    }
    return (
        <div className={c.card_wrap}>
            <div className={c.title_card}>
                {props.article.title}
            </div>
            <div className={c.card_content}>
                {props.article.text}
            </div>
            <div className={c.card_footer}>
                <div className={c.footer_info_box}>
                    <div>Автор: <span>{props.article.author}</span></div>
                    <div>{time}</div>
                    <div onClick={()=>setActive(true)}>Комментарии:{props.article.comments.length}</div>
                </div>
                {buttonBox}
            </div>
            <div className={isActive?c.comment_box:c.hide}>
                <div className={c.comment_content_box}>
                    <div className={c.add_comment_box}>
                        <input onChange={(e)=>commentBodyCreate(e)}
                               placeholder='комментировать'
                        />
                        {/* сделать расширяющийся инпут!!!!-----*/}
                        {/*<textarea onChange={(e)=>commentBodyCreate(e)}*/}
                        {/*          rows='1'*/}
                        {/*          onInput={(e)=>autoHeight(e)}*/}
                        {/*          placeholder='комментировать' > </textarea>*/}
                        <button onClick={addComment}>добавить</button>
                    </div>
                    {comments}
                </div>
                <div className={c.hide_comment_button} onClick={()=>setActive(false)}>^скрыть^</div>
            </div>
        </div>
    );
};

export default NewsArticleCard;
