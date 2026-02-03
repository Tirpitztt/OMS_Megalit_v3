import React from 'react';
import c from './main.module.css'
import {dateTimeFormat} from "../../Utils/dateTermin";
import DeleteCyrcleButton from "../UI/Buttons/delete-cyrcle-button";


const CommentCard = (props) => {
    let time = dateTimeFormat(props.comment.createdAt)
    const delComment = (id) => {
        let body = {id:id}
        props.deleteComment(body)
    }
    let endSec = <div></div>
    if(props.userRole === 'konung'){
        endSec = <DeleteCyrcleButton func={delComment} number={props.comment.id}/>
    }


    return (
        <div className={c.comment_card}>
            <div className={c.comment_author}>
                <div>{props.comment.author}</div>
                <div>{time}</div>
            </div>
            <div className={c.comment_text}>
                {props.comment.text}
            </div>
            <div>
                {endSec}
            </div>
        </div>
    );
};

export default CommentCard;
