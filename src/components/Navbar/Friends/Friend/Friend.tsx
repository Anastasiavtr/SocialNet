import styles from './../Friends.module.css'
import { NavLink } from 'react-router-dom'
import user from '../../../../assets/images/user.png'
type PropsType = {
  id: number
  name: string
}
const Friend: React.FC<PropsType> = ({ id, name }) => {
  return (
    <div className={styles.items}>
      <NavLink to={'/profile/' + id}>
        <div className={styles.image}>
          <img className={styles.img} src={user} alt="avatar" />
        </div>
        <div className={styles.descriptionBlock}>{name}</div>
      </NavLink>
    </div>
  )
}
export default Friend
