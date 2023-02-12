import styles from './Friends.module.css'
import Friend from './Friend/Friend'
import { useAppSelector } from '../../../Types/hooks'
import { FriendsType } from '../../State/sidebarReducer'
import React from 'react'

type PropsType = {
  friends: FriendsType
}

const Friends: React.FC<PropsType> = () => {
  const friends = useAppSelector((state) => state.sidebar)

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Friends online</h3>
      <div>
        {friends.friends.map((u) => {
          return <Friend key={u.id} name={u.name} id={u.id} />
        })}
      </div>
    </section>
  )
}

export default Friends
