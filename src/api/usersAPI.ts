import { GetUsersType, instance, ApiResponseType } from './api'

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4, term = '', friend: string) {
    return instance
      .get<GetUsersType>(
        // `users?page=${currentPage}&count=${pageSize}&term=${term}`
        `users`,
        {
          params: {
            page: currentPage,
            count: pageSize,
            term: term,
            friend: friend === '' ? null : friend,
          },
        }
      )
      .then((response) => {
        return response.data
      })
  },

  follow(userId: number) {
    return instance
      .post<ApiResponseType>(`follow/${userId}`, {})
      .then((response) => {
        return response.data
      })
  },
  unfollow(userId: number) {
    return instance
      .delete<ApiResponseType>(`follow/${userId}`)
      .then((response) => {
        return response.data
      })
  },
}
