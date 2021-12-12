import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../../redux/authActionCreators';

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}


const Logout = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.logOut()
    });
    return (
        <div>
            <Redirect to="/login" />
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Logout)
