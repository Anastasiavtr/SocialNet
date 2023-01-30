import { ApiResponseType, ResultCodesEnum } from './../../api/api'
import { actions, follow } from './usersReducer'
import { usersAPI } from '../../api/usersAPI'

jest.mock('../../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ApiResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}

test('follow dispatch', async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

  const thunk = follow(2)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 2)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleUserFollow(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 2)
  )
})
