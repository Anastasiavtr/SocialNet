// import profileReducer from './profileReducer'
// import dialogsReducer from './dialogsReducer'
// import sidebarReducer from './sidebarReducer'

// let store = {

// _state: {

//   sidebar: {
//     friends: [
//       {id: 1,  name: 'Alena' },  
//        { id: 5, name: 'Oleg' }, 
//        {id: 6, name: 'Sasha'}
//   ]},

//   profilePage: {
//     posts: [
//     {id:1, message: 'Hi, how are you', likesCount: 2 },
//     {id:2, message:'It`s my first post', likesCount: 12 },
//   ],
//   newPostText: '', 
//   },
  
//   dialogsPage: {
  
//       dialogs: [
//       {id: 1,  name: 'Anton' }, {  id: 2, name: 'Sasha' },
//        { id: 3, name: 'Anna'}, {  id: 4,name: 'Max' }, 
//        { id: 5, name: 'Olga' }, {id: 6, name: 'Sasha'}
//   ],
  
//      messages: [
//       { id: 1, message: 'How are you?' }, { id: 2, message: 'Heeey'}, 
//       { id: 3, message: 'Good night'}, {  id: 4, message: 'Ok'}, 
//       { id: 5, message: 'Bye'}, { id: 6, message: 'No' }
//   ],
//   newMessageBody: '',
//   },
//   },
 
//   getState() {
//     return this._state 
//   },
  
//   _callSubscriber() {
//     console.log('f')
//   },
//  subscribe(observer){
//     this._callSubscriber = observer;
//   },
   
//  dispatch(action) {

//     this._state.profilePage = profileReducer(this._state.profilePage, action) 
//     this._state.dialogsPage = dialogsReducer(  this._state.dialogsPage, action)
//     this._state.sidebar = sidebarReducer( this._state.sidebar,action )

//     this._callSubscriber(this._state)
// }
// }


// export default store
// window.store = store