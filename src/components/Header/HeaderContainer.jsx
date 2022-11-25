import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from './../State/authReducer';

class HeaderContainer extends React.Component {
        
    render() {
      return(
        <Header {...this.props}/>
    )  
    }
    
}

const mapStateToProps = (state)  => {

    return {
       isAuth: state.auth.isAuth,
       loginName:state.auth.login,
    }

}


export default connect(mapStateToProps, {logout})(HeaderContainer);