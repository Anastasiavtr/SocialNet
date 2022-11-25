import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Preloader from '../Preloader/Preloader'
import {  requestUsers, follow, unfollow, setCurrentPage,  toggleFollowingProgress } from '../State/usersReducer'
import Users from './Users'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../State/usersSelector'
import { useDispatch, useSelector } from 'react-redux'

// class UsersContainer extends React.Component {
//    componentDidMount() {
//     this.props.getUsers(this.props.currentPage, this.props.pageSize)
//      } 

//    onPageChanged = (pageNumber) => {
//   this.props.getUsers(pageNumber,this.props.pageSize)
//      }
 
//      render() {
//       return <> {this.props.isFetching ? <Preloader /> : null} 
//       <Users totalUsersCount={this.props.totalUsersCount}
//                     pageSize={this.props.pageSize}
//                     currentPage={this.props.currentPage}
//                     onPageChanged={this.onPageChanged}
//                     users={this.props.users}
//                     follow={this.props.follow}
//                     unfollow={this.props.unfollow}
//                     followingInProgress={this.props.followingInProgress}    

//       />
//       </>
//   }
// }


// let mapStateToProps = (state) => {
//    return {
//        users: getUsers(state),
//        pageSize:getPageSize(state),
//        totalUsersCount:getTotalUsersCount(state) ,
//        currentPage:getCurrentPage(state) ,
//        isFetching:getIsFetching(state) ,
//        followingInProgress:getFollowingInProgress(state),
//    }
// }


//  export default compose(
//    connect(mapStateToProps, 
//       {follow, unfollow, 
//          setCurrentPage,
//           toggleFollowingProgress, getUsers: requestUsers}),
// // withAuthRedirect
// )(UsersContainer)




// const users = useSelector(getUsers(state))
// const pageSize = useSelector(getPageSize(state))
// const totalUsersCount = useSelector(getTotalUsersCount(state)) 
// const currentPage =useSelector(getCurrentPage(state))
// const isFetching = useSelector(getIsFetching(state)) 
// const followingInProgress= useSelector(getFollowingInProgress(state))


const UsersContainer = (props) => {

const users = useSelector(state => state.usersPage.users)
const pageSize = useSelector(state => state.usersPage.pageSize)
const totalUsersCount = useSelector(state => state.usersPage.totalUsersCount)
const currentPage = useSelector(state => state.usersPage.currentPage)
const isFetching = useSelector(state => state.usersPage.isFetching) 
const followingInProgress= useSelector(state =>  state.usersPage.followingInProgress )
   

const dispatch = useDispatch()

const followUser = (userID) => {dispatch(follow(userID))}
const unfollowUser = (userID) => {dispatch(unfollow(userID))}
const getUsers = (page, pageSize)  => {dispatch(requestUsers(page, pageSize))}
const setCurrPage = (pageNumber) => {dispatch(setCurrentPage(pageNumber))}
const toggleFollowing = (isFetching, userId) => {dispatch(toggleFollowingProgress(isFetching, userId))}

useEffect(() => {
     getUsers(props.currentPage, props.pageSize)
   },[])
      
    const onPageChanged = (pageNumber) => {
     getUsers(pageNumber,props.pageSize)
        }
        
         return <> {isFetching ? <Preloader /> : null} 
         <Users totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       getUsers={getUsers}
                     follow={followUser}
                     unfollow={unfollowUser}
                       users={users}
                       setCurrentPage={setCurrPage}
                       followingInProgress={followingInProgress}    
                       toggleFollowing={toggleFollowing}
         />
         </>
   }


  export default UsersContainer