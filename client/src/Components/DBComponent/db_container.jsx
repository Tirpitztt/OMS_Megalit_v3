import * as React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import DbPageMain from "./db_page_main";



class DBContainer extends React.Component{

    render(){
        return(
            <DbPageMain />

        )
    }
}

let mapStateToProps = (state)=>{
    return{state}
}
let mapDispatchToProps =(dispatch)=>{
    return{

    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(DBContainer)
