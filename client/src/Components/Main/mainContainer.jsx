import * as React from "react";
import MainPage from './main';
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addArticleThunkCreator,
    addCommentThunkCreator, addFile, deleteArticleThunkCreator, deleteCommentThunkCreator, editArticleThunkCreator,
    setMainStateThunkCreator,
} from "../../Redux/Redusers/main-reduser";

class MainContainer extends React.Component{
    componentDidMount() {
        this.props.setMainState()
    }

    render(){
        return(
            <MainPage   state={this.props.state.mainPage}
                        addArticle={this.props.addArticle}
                        addFile={this.props.addFile}
                        addComment={this.props.addComment}
                        editArticle={this.props.editArticle}
                        deleteArticle={this.props.deleteArticle}
                        deleteComment={this.props.deleteComment}

            />
        )
    }
}

let mapStateToProps = (state)=>{
    return {state}
}

let mapDispatchToProps = (dispatch)=>{
    return{
        setMainState:()=>{
            dispatch(setMainStateThunkCreator())
        },
        addArticle:(body)=>{
            dispatch(addArticleThunkCreator(body))
        },
        addComment:(body)=>{
            dispatch(addCommentThunkCreator(body))
        },
        editArticle:(body)=>{
            dispatch(editArticleThunkCreator(body))
        },
        deleteArticle:(body)=>{
            dispatch(deleteArticleThunkCreator(body))
        },
        deleteComment:(body)=>{
            dispatch(deleteCommentThunkCreator(body))
        },
        addFile:(body)=>{
            dispatch(addFile(body))
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(MainContainer)
