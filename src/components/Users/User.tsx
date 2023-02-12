import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../Types/types'

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({
  user,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.usersItem}>
        <NavLink to={'/profile/' + user.id}>
          <img
            className={styles.userPhoto}
            src={user.photos.small != null ? user.photos.small : userPhoto}
          />
        </NavLink>
      </div>
      {user.followed ? (
        <div className={styles.usersItem}>
          <button
            disabled={followingInProgress.includes(user.id)}
            onClick={() => {
              unfollow(user.id)
            }}
          >
            Unfollow
          </button>
        </div>
      ) : (
        <div className={styles.item}>
          {' '}
          <button
            disabled={followingInProgress.includes(user.id)}
            onClick={() => {
              follow(user.id)
            }}
          >
            Follow
          </button>
        </div>
      )}

      <div className={styles.item}>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
    </div>
  )
}

export default User
