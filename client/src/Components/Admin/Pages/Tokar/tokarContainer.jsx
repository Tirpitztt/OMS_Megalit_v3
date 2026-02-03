import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import TokarPage from "./tokar-page";



class TokarContainer extends React.Component{


    render(){
        return(
            <TokarPage />
        )
    }
}

let mapStateToProps = (state)=>{
    return{state}
}

let mapDispatchToProps=(dispatch)=>{
    return{

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(TokarContainer)
