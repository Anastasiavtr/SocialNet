export type InitialStateType = {
  friends: Array<FriendsType>
}

export type FriendsType = {
  id: number
  name: string
}

let initialState: InitialStateType = {
  friends: [
    { id: 2, name: 'Dima' },
    { id: 3, name: 'Alex' },
    { id: 4, name: 'Marina' },
  ],
}

const sidebarReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  return state
}

export default sidebarReducer
