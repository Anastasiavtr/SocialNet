import s from './Users.module.css'
import Paginator from './Paginator'
import User from './User'
import { Pagination } from '@mui/material'

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
 
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }  
    return <section>

       {/* <Paginator {...props} /> */}
       <Pagination count={pagesCount} variant="outlined"size="small" shape="rounded" 
                       onChange={(e, page) => {props.onPageChanged(page)}} />
                        
        {props.users.map(u =>
         <User u={u} key={u.id} {...props} />  )} 

    </section>
    }    

export default Users
