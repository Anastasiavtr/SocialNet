
import React from 'react'
import Dialogs from './Dialogs'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage} from '../State/dialogsReducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
  
class DialogsContainer extends React.Component {
    // const dialogsPage = useSelector(state => state.dialogsPage)
    // const dispatch = useDispatch() 
 
render() {
   
     return (
    <Dialogs dialogsPage={this.props.dialogsPage} sendMessage={this.props.sendMessage} />
   )
}
}
 

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage, 
        
    }
}

 let mapDispatchToProps = (dispatch) => {
    return { 
        sendMessage: (newMessageBody) => {
            dispatch(sendMessage(newMessageBody))
        }
    }
 }



export default compose(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect
)
(Dialogs)