const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
    dialogs: [
        {id: 2,  name: 'Anton' }, {  id: 3, name: 'Sasha' },
         { id: 4, name: 'Anna'}, {  id: 5,name: 'Max' }, 
         { id: 6, name: 'Olga' }, {id: 7, name: 'Sasha'}
    ],
    
    messages: [
        { id: 1, message: 'How are you?' }, { id: 2, message: 'Heeey'}, 
        { id: 3, message: 'Good night'}, {  id: 4, message: 'Ok'}, 
        { id: 5, message: 'Bye'}, { id: 6, message: 'No' }
    ],
}

const dialogsReducer = (state = initialState, action) => {

   
    switch (action.type) {
    case ADD_MESSAGE: {

    let body = action.newMessageBody

         return {
        ...state,
        messages: [...state.messages, {id: state.messages.length + 1, message:body}]
    } 
    }

        
    default:
        return state;
   }
}

export const sendMessage = (newMessageBody) => ( {type: ADD_MESSAGE, newMessageBody})

export default dialogsReducer
