import s from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/user.png'

const Users = (props) => { 

    let getUsers = () => {
    if (props.users.length === 0 ) {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
     props.setUsers(response.data.items)
    })    
    }
    }

return(  
    <section>
         <button onClick={getUsers}>Get users</button>
        {props.users.map(u => {
        return <div
         className={s.test}
         key={u.id}>
    <span>
    <div>
    <img className={s.userPhoto}
    src={ u.photos.small != null ? u.photos.small : userPhoto}/>
    </div>
    </span>
    {u.followed
     ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
     : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
    <span>
    <div>{u.name}</div>
    <div>{u.status}</div>
    </span>
    <span>
     <div>{'u.location.country'}</div>
    <div>{'u.location.city'}</div>
    </span>
    </div>
 })
        }
        
    </section>
)
}
// export default Users
