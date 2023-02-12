import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ChatMessageApiType } from '../../api/chatApi'

import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../components/State/chatReducer'
import { useAppDispatch, useAppSelector } from '../../Types/hooks'
import styles from './chatPage.module.css'

const ChatPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  if (!isAuth) {
    return <Navigate to="/login/" />
  }

  return <Chat />
}
export default ChatPage

export const Chat: React.FC = () => {
  const status = useAppSelector((state) => state.chat.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <section>
      {status === 'error' && <div>Error.Please refresh the page</div>}
      <Messages />
      <AddMessageForm />
    </section>
  )
}

export const Messages: React.FC = () => {
  const messages = useAppSelector((state) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget
    if (Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    messagesAnchorRef.current?.scrollIntoView(true)
  }, [messages])

  return (
    <div className={styles.wrapper} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo(
  ({ message }) => {
    return (
      <div className={styles.container}>
        <div className={styles.messageItems}>
          <img className={styles.messageImg} src={message.photo} />
          {message.userName}
        </div>
        <span>{message.message}</span>
      </div>
    )
  }
)

export const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('')
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) return

    dispatch(sendMessage(message))
    setMessage('')
  }
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
        Send
      </button>
    </div>
  )
}
