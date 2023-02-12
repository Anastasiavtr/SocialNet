import { chatAPI, StatusType } from './../../api/chatApi'
import { ThunkAction } from '@reduxjs/toolkit'
import { Action, Dispatch } from 'redux'
import { ResultCodeForCaptchaEnum } from '../../api/api'
import { BaseThunkType, InferActionsTypes, RootState } from './reduxStore'
import { ResultCodesEnum } from '../../api/api'
import { authAPI } from '../../api/authApi'
import { securityAPI } from '../../api/securityApi'
import { ChatMessageApiType } from '../../api/chatApi'
import { subtle } from 'crypto'
import { v1 } from 'uuid'

const MESSAGES_RECEIVED = 'network/chat/MESSAGES-RECEIVED' as const
const STATUS_CHANGED = 'network/chat/STATUS-CHANGED' as const
const CLEAN_MESSAGES = 'network/chat/CLEAN-MESSAGES' as const

type ChatMessageType = ChatMessageApiType & { id: string }

export type InitialStateType = {
  messages: ChatMessageType[]
  status: StatusType
}

let initialState: InitialStateType = {
  messages: [],
  status: 'pending',
}

const chatReducer = (
  state = initialState,
  incomingAction: Action
): InitialStateType => {
  const action = incomingAction as ActionsType

  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, i, arr) => i >= arr.length - 100),
      }
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      }
    case CLEAN_MESSAGES:
      return {
        ...state,
        messages: [],
      }
    default:
      return state
  }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
  messagesReceived: (messages: ChatMessageApiType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: { messages },
  }),
  statusChanged: (status: StatusType) => ({
    type: STATUS_CHANGED,
    payload: { status },
  }),
  cleanMessages: () => ({
    type: CLEAN_MESSAGES,
  }),
}

type ThunkType = BaseThunkType<ActionsType>

let _newMessageHandle: ((messages: ChatMessageApiType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandle === null) {
    _newMessageHandle = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandle
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
  dispatch(actions.cleanMessages())
}
export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message)
  }
export default chatReducer
function uuid(): any {
  throw new Error('Function not implemented.')
}
