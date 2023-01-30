import profileReducer, { actions } from './profileReducer'

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 2 },
    { id: 2, message: 'It`s my first post', likesCount: 12 },
  ],
  profile: null,
  status: '',
  isEdit: false,
}

it('length of posts should be incremented', () => {
  // test data
  let action = actions.addPost('Test')
  // action
  let newState = profileReducer(state, action)
  // expectation
  expect(newState.posts.length).toBe(3)
})

it('after deleting length of posts should be decremented', () => {
  // test data
  let action = actions.deletePost(9)
  // action
  let newState = profileReducer(state, action)
  // expectation
  expect(newState.posts.length).toBe(2)
})

it('after deleting length should not be decremented if id is incorrect', () => {
  // test data
  let action = actions.deletePost(100)
  // action
  let newState = profileReducer(state, action)
  // expectation
  expect(newState.posts.length).toBe(2)
})
