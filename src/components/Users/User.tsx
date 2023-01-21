import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../Types/types'


type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow:(userId: number) => void
}


const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
      
    return <div> 
        <span>
        <div>
        <NavLink to={'/profile/' +  user.id}>
        <img className={s.userPhoto}
        src={ user.photos.small != null ?  user.photos.small : userPhoto}/>
        </NavLink>
        </div>
        </span>
        { user.followed

        ? <button disabled={followingInProgress.includes( user.id)} onClick={() => {
        unfollow( user.id)}}>Unfollow</button>
         :<button disabled={followingInProgress.includes( user.id)} onClick={() => {
        follow( user.id) 
           }}>Follow</button>
          }
     
        <span>
        <div>{ user.name}</div>
        <div>{ user.status}</div>
        </span>
        <span>
        <div>{'u.location.country'}</div>
        <div>{'u.location.city'}</div>
        </span>
        </div>
 }     
 

export default User
