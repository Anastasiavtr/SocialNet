import React from 'react'
import { DialogType, MessageType, sendMessage } from '../State/dialogsReducer'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'
import { Form, Field, Formik } from 'formik'
import { DialogsSchema } from '../../Validators/ValidationDialogs'
import { useAppDispatch, useAppSelector } from '../../Types/hooks'
import { Navigate } from 'react-router-dom'

type PropsType = {
  dialogs: Array<DialogType>
  dialogsMessages: Array<MessageType>
}

const Dialogs: React.FC<PropsType> = (props) => {
  const dialogs = useAppSelector((state) => state.dialogsPage.dialogs)
  const dialogsMessages = useAppSelector((state) => state.dialogsPage.messages)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const sendDialogsMessage = (newMessageBody: string) => {
    dispatch(sendMessage(newMessageBody))
  }

  if (!isAuth) {
    return <Navigate to="/login/" />
  }

  return (
    <>
      <section className={styles.dialogs}>
        <div className={styles.dialogsItems}>
          <div>
            {dialogs.map((dialog) => {
              return (
                <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
              )
            })}
          </div>
        </div>

        <div className={styles.messages}>
          {dialogsMessages.map((message) => {
            return <Message message={message.message} key={message.id} />
          })}

          <AddMessageForm sendMessage={sendDialogsMessage} />
        </div>
      </section>
    </>
  )
}

type MyFormValues = {
  sendMessage: (newMessageBody: string) => void
}

const AddMessageForm: React.FC<MyFormValues> = ({ sendMessage }) => {
  const addNewMessage = (values: string) => {
    sendMessage(values)
  }

  return (
    <Formik
      initialValues={{
        newMessageBody: '',
      }}
      validationSchema={DialogsSchema}
      onSubmit={(values, { resetForm }) => {
        addNewMessage(values.newMessageBody)
        resetForm()
      }}
    >
      {({ errors, touched, dirty, handleBlur, handleChange }) => (
        <Form className={styles.form}>
          <div>
            <Field
              className={styles.formArea}
              as={'textarea'}
              name={'newMessageBody'}
              placeholder="Enter your message"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.newMessageBody && touched.newMessageBody ? (
              <div className={styles.error}>{errors.newMessageBody}</div>
            ) : null}
          </div>
          <div>
            <button
              className={styles.formButton}
              type={'submit'}
              disabled={!dirty}
            >
              Add message
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Dialogs
