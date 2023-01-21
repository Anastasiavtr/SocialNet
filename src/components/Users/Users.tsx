import React, { useEffect } from 'react'
import Preloader from '../Preloader/Preloader'
import {  requestUsers, follow, unfollow, setCurrentPage,  toggleFollowingProgress } from '../State/usersReducer'
import User from './User'
import { Pagination } from '@mui/material'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../State/usersSelector'
import { UserType } from '../../Types/types'
import { useAppSelector, useAppDispatch } from '../../Types/hooks'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page:number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: () => void
    unfollow: () => void
}


const Users: React.FC<PropsType> = (props) => {
 
const users = useAppSelector(state => state.usersPage.users)
const pageSize = useAppSelector(state => state.usersPage.pageSize)
const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
const currentPage = useAppSelector(state => state.usersPage.currentPage)
const isFetching = useAppSelector(state => state.usersPage.isFetching) 
const followingInProgress= useAppSelector(state =>  state.usersPage.followingInProgress )
   

const dispatch = useAppDispatch()
const followUser = (userID: number) => {dispatch(follow(userID))}
const unfollowUser = (userID: number) => {dispatch(unfollow(userID))}
const getUsers = (page: number, pageSize: number)  => {dispatch(requestUsers(page, pageSize))}
// const setCurrPage = (pageNumber: number) => {dispatch(setCurrentPage(pageNumber))}
// const toggleFollowing = (isFetching: boolean, userId: number) => {dispatch(toggleFollowingProgress(isFetching, userId))}
 

useEffect(() => {
     getUsers(currentPage, pageSize)
   },[])
      
    const onPageChanged = (pageNumber: number) => {
     getUsers(pageNumber,pageSize)
        }
        
      

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
 
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }  
     return <> {isFetching ? <Preloader /> : null} 
      <section>

       <Pagination count={pagesCount} variant="outlined"size="small" shape="rounded" 
                       onChange={(e, page) => {onPageChanged(page)}} />
                        
        {users.map(u =>
         <User u={u} key={u.id} followingInProgress={followingInProgress}
         follow={followUser} unfollow={unfollowUser} /> )} 
    </section>
         
         </>
   }



  export default Users
  
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

