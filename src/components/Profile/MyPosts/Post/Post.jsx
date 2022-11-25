import s from './Post.module.css'
import user from './../../../../assets/images/user.png'

const Post = (props) => {
    return(


    <div className={s.item}>
    <img className={s.img} 
    src={user}/>
    {props.message} </div>
 
    )
}

export default Post;


