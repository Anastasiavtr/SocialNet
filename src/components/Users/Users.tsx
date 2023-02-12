import React, { useEffect } from 'react'
import Preloader from '../Preloader/Preloader'
import {
  requestUsers,
  follow,
  unfollow,
  FilterType,
} from '../State/usersReducer'

import { Pagination } from '@mui/material'
import { UserType } from '../../Types/types'
import { useAppSelector, useAppDispatch } from '../../Types/hooks'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Users.module.css'

type PropsType = {
  user: UserType
}
type QueryParamsType = { term: string; page: string; friend: string }

const Users: React.FC<PropsType> = React.memo((props) => {
  const users = useAppSelector((state) => state.usersPage.users)
  const pageSize = useAppSelector((state) => state.usersPage.pageSize)
  const filter = useAppSelector((state) => state.usersPage.filter)
  const totalUsersCount = useAppSelector(
    (state) => state.usersPage.totalUsersCount
  )
  const currentPage = useAppSelector((state) => state.usersPage.currentPage)
  const isFetching = useAppSelector((state) => state.usersPage.isFetching)
  const followingInProgress = useAppSelector(
    (state) => state.usersPage.followingInProgress
  )

  const dispatch = useAppDispatch()
  const followUser = (userID: number) => {
    dispatch(follow(userID))
  }
  const unfollowUser = (userID: number) => {
    dispatch(unfollow(userID))
  }
  const getUsers = (page: number, pageSize: number, filter: FilterType) => {
    dispatch(requestUsers(page, pageSize, filter)) //filter.term
  }

  const location = useLocation()
  const [search, setSearch] = useSearchParams(location.search)

  useEffect(() => {
    const parsed = Object.fromEntries([...search]) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)

    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }

    if (parsed.friend !== null) actualFilter = { ...actualFilter, friend: '' }

    getUsers(actualPage, pageSize, actualFilter)
  }, [])

  let navigate = useNavigate()
  useEffect(() => {
    const query: QueryParamsType = {
      term: '',
      page: '',
      friend: '',
    }

    if (!!filter.term) query.term = filter.term
    if (currentPage !== 1) query.page = String(currentPage)
    if (filter.friend !== null) query.friend = String(filter.friend)

    const queryToString = new URLSearchParams(query)

    navigate('/users')
    setSearch(queryToString.toString())
  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    getUsers(pageNumber, pageSize, filter)
  }
  const onFilterChanged = (filter: FilterType) => {
    getUsers(1, pageSize, filter)
  }

  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  let pages: Array<number> = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <section className={styles.container}>
        <UsersSearchForm
          getUsers={getUsers}
          onFilterChanged={onFilterChanged}
        />
        <Pagination
          sx={{
            button: {
              color: '#ffff',
              borderColor: '#ffff',
              bgcolor: 'rgba(111, 183, 238, 0.595)',
            },
          }}
          count={pagesCount}
          variant="outlined"
          color="standard"
          size="small"
          shape="rounded"
          onChange={(e, page) => {
            onPageChanged(page)
          }}
        />

        {users.map((user) => (
          <User
            user={user}
            key={user.id}
            followingInProgress={followingInProgress}
            follow={followUser}
            unfollow={unfollowUser}
          />
        ))}
      </section>
    </>
  )
})

export default Users
