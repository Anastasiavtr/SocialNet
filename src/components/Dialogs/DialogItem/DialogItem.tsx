import styles from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
  id: number
  name: string
}
const DialogItem: React.FC<PropsType> = (props) => {
  let path = '/profile/' + props.id
  return (
    <div>
      <NavLink to={path} className={styles.dialog}>
        <div>
          <img
            className={styles.AvatarImg}
            src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg"
          />
        </div>
        {props.name}
      </NavLink>
    </div>
  )
}

export default DialogItem
