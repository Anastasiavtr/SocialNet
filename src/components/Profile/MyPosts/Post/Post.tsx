import s from './Post.module.css'
import user from './../../../../assets/images/user.png'

type PropsType = {
    message:string
}
const Post:React.FC<PropsType> = (props) => {
    return(


    <div className={s.item}>
    <img className={s.img} 
    src={user}/>
    {props.message} </div>
 
    )
}

export default Post;


