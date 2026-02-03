import * as React from "react"
import {compose} from "redux";
import {connect} from "react-redux";
import PayStatistics from "./payStatistics";
import {getCalcOfDateThunkCreator, getCalcStateThunkCreator} from "../../../../Redux/Redusers/admin-statistics-reduser";



class AdminPayContainer extends React.Component{
    componentDidMount() {
        this.props.getCalcState()
    }
    render(){
        return(
            <PayStatistics  state={this.props.state.statisticsPage}
                            getCalcOfDate={this.props.getCalcOfDate}
            />
        )
    }
}

let mapStateToProps = (state)=>{
    return {state}
}
let mapDispatchToProps = (dispatch) => {
    return{
        getCalcState:()=>{
            dispatch(getCalcStateThunkCreator())
        },
        getCalcOfDate:(body)=>{
            dispatch(getCalcOfDateThunkCreator(body))
        }
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(AdminPayContainer)
