import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import Friends from './Friends/Friends'
import { FriendsType } from '../State/sidebarReducer'
import { useAppSelector } from '../../Types/hooks'
import React from 'react'

const activeLink = (link: { isActive: any }) =>
  link.isActive ? styles.active : styles.item

export const Navbar = React.memo((props: { friends: FriendsType }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  return (
    <aside className={styles.aside}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.item}>
            <li>
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>{' '}
            </li>
            <li>
              <NavLink to="/dialogs" className={activeLink}>
                Messages
              </NavLink>{' '}
            </li>
            <li>
              <NavLink to="/users" className={activeLink}>
                Users
              </NavLink>{' '}
            </li>
            <li>
              <NavLink to="/chat" className={activeLink}>
                Chat
              </NavLink>{' '}
            </li>
            <li>
              <NavLink to="/music" className={activeLink}>
                Music
              </NavLink>{' '}
            </li>
          </ul>
        </nav>

        {isAuth && <Friends friends={props.friends} />}
      </div>
    </aside>
  )
})
