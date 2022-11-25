import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'


const User = ({u, followingInProgress, follow, unfollow}) => {
      
    return <div> 
        <span>
        <div>
        <NavLink to={'/profile/' + u.id}>
        <img className={s.userPhoto}
        src={u.photos.small != null ? u.photos.small : userPhoto}/>
        </NavLink>
        </div>
        </span>
        {u.followed

        ? <button disabled={followingInProgress.includes(u.id)} onClick={() => {
        unfollow(u.id)}}>Unfollow</button>
         :<button disabled={followingInProgress.includes(u.id)} onClick={() => {
        follow(u.id) 
           }}>Follow</button>
          }
     
        <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
        </span>
        <span>
        <div>{'u.location.country'}</div>
        <div>{'u.location.city'}</div>
        </span>
        </div>
 }     
 

export default User
