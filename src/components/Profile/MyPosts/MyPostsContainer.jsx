import React from 'react'
import { addPost} from '../../State/profileReducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'



class MyPostsContainer extends React.Component {

render() {
     return <MyPosts addPost={this.props.addPost}
    posts={this.props.profile.posts}
     />
}    
}

    let mapStateToProps = (state) => {
    return {
    profile: state.profilePage
}
}  


const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText))
        }
    }
}

export default connect(mapStateToProps, {addPost})(MyPostsContainer)

 

   

