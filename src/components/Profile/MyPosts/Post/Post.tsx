import s from "./Post.module.css"
import user from "./../../../../assets/images/user.png"

type PropsType = {
  message: string
  id: number
  deletePost: (id: number) => void
}
const Post: React.FC<PropsType> = ({ message, id, deletePost }) => {
  return (
    <div className={s.item}>
      <div>
        <img className={s.img} src={user} />
      </div>
      <div>{message}</div>
      <div className={s.button__item}>
        <button onClick={() => deletePost(id)}>Delete</button>
      </div>
    </div>
  )
}

export default Post
