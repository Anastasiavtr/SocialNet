import s from './Users.module.css'
import Paginator from './Paginator'
import User from './User'
import { Pagination } from '@mui/material'
import { UserType } from '../../Types/types'
import { boolean } from 'yup'


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

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
 
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }  
    return <section>

       {/* <Paginator {...props} /> */}
       <Pagination count={pagesCount} variant="outlined"size="small" shape="rounded" 
                       onChange={(e, page) => {onPageChanged(page)}} />
                        
        {users.map(u =>
         <User u={u} key={u.id} followingInProgress={props.followingInProgress}
         follow={props.follow} unfollow={props.unfollow} /> )} 
    </section>
    }    

export default Users
