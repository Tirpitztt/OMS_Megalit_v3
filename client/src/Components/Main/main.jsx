import React, {useContext, useState} from "react";
import c from "./main.module.css";
import {AuthContext} from "../../Context/auth.context";
import AdminContent from "./Displays/AdminContent/admin-content";
import NewsArticleCard from "./news-article-card";
import {useAllOrders} from "../../Hooks/order.hook";
import AdminInfo from "./Displays/AdminContent/admin-info";
import AdminInfoCalc from "./Displays/AdminContent/admin-info-calc";
import {NavLink} from "react-router-dom";
import AdminInfoUtm from "./Displays/AdminContent/admin-info-utm";

export const MainPage = (props)=>{

    let {userId,userRole,userName} = useContext(AuthContext);

    const user = {
        id:userId,
        role:userRole,
        name:userName
    }

    const [orders] = useAllOrders(user)
    const [isArticleFormActive,setArticleFormActive] = useState(false)
    const [isCommentsActive,setCommentsActive] = useState(false)
    const [editArt,setEditArticle] = useState([])
    let content = <div>seller content</div>;
    if(userRole==='konung' || userRole === 'yarl'){
        content = <AdminContent state={props.state}
                                editArt={editArt}
                                addFile={props.addFile}
                                isActive={isArticleFormActive}
                                setActive={setArticleFormActive}
                                addArticle={props.addArticle}
                                editArticle={props.editArticle}
                                setEditArticle={setEditArticle}
                                userName={userName}/>
    }

    let news = props.state.news.map((item,i)=>{
        return <NewsArticleCard key={i} article={item}
                                userRole={userRole}
                                userName={userName}
                                addComment={props.addComment}
                                editArticle={props.editArticle}
                                deleteArticle={props.deleteArticle}
                                deleteComment={props.deleteComment}
                                commentsActive={isCommentsActive}
                                setCommentsActive={setCommentsActive}
                                setEditArticle={setEditArticle}
                                setActive={setArticleFormActive}/>
    });



    return(
        <div className={c.wrap}>
            <div className={c.title_box}><p className={c.title}>Добро пожаловать на работу, <span>{userName}</span>, приятного дня.</p></div>
            {content}
            <div className={c.content_wrap}>
                <div className={c.news_wrap}>
                    <div className={userRole === 'konung' ? c.admin_info_box : c.hide}>
                        <div className={c.admin_info_sec}>
                            <div className={c.title_card}>заказы</div>
                            <AdminInfo state={props.state} orders={orders} />
                        </div>
                        <div className={c.admin_info_sec}>
                            <div className={c.title_card}>оплаты</div>
                            <NavLink to='/home/statistics' className={c.link_monitor}>подробнее</NavLink>
                            <AdminInfoCalc state={props.state} orders={orders} />
                        </div>
                        <div className={c.admin_info_sec}>
                            <div className={c.title_card}>прочее</div>
                            <AdminInfoUtm state={props.state} />
                        </div>
                    </div>

                    {news}
                </div>
                <div className={c.file_navbar}>
                    files
                </div>
            </div>
        </div>

    );
}

export default MainPage;
