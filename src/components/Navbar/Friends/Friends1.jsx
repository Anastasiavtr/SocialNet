import s from './Friends.module.css'
import Friend from './Friend/Friend'

const Friends = (props) => {
    return (

        <section className={s.friends}>
        <h2>Friends online</h2>
        <div  className={s.friendsItems}>

        {props.friends.friends.map(u => {
        return <Friend key={u.id} name={u.name} id={u.id}/>
    })} 
 </div>
</section>
    )
}

export default Friends;