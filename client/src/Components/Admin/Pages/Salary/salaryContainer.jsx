import * as React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import SalaryPage from "./salary-page";

class SalaryContainer extends React.Component{
    componentDidMount() {

    }
    render() {
        return(
            <SalaryPage state={this.props.state.salaryPage}

            />
        )
    }
}
let mapStateToProps = (state) => {
    return {state}
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(SalaryContainer)