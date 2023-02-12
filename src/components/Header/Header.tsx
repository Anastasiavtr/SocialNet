import React from 'react'
import { logout } from '../State/authReducer'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { useAppDispatch, useAppSelector } from '../../Types/hooks'
import Diversity1Icon from '@mui/icons-material/Diversity1'

type PropsType = {
  isAuth: boolean
  loginName: string | null
}

const Header: React.FC<PropsType> = (props) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const loginName = useAppSelector((state) => state.auth.login)
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Diversity1Icon sx={{ fontSize: 56 }} />

        {isAuth ? (
          <div className={styles.loginBlock}>
            <span>{loginName}</span>{' '}
            <button className={styles.logoutButton} onClick={logOut}>
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.loginButton}>
            <NavLink to="/login/">Login</NavLink>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
