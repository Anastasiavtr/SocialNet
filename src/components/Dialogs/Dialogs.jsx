import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'
import React from 'react'
import { Form, Field, Formik } from 'formik'
import { DialogsSchema } from '../../Validators/ValidationDialogs'


const Dialogs = (props) => {


    return (
        <section className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialogsItems}>
                    {
                       props.dialogsPage.dialogs.map((dialog) => {
                            return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>
                        })
                    }

                </div>
            </div>

            <div className={s.messages}>
                {
                    props.dialogsPage.messages.map((message) => {
                        return <Message message={message.message} key={message.id}/>
                    })
                }

            <AddMessageForm sendMessage={props.sendMessage}/>

            </div> 
        </section>
    )
}

const AddMessageForm = (props) => {

    let addNewMessage = (values) => {
        props.sendMessage(values);  
     }

    return (

        <Formik 
        initialValues = {{
        newMessageBody: '',
      }}
       validationSchema={DialogsSchema}
        onSubmit = {(values, {resetForm}) => {
        addNewMessage( values.newMessageBody)
        resetForm({values: ''})
      }}
    >
         {({ errors, touched, dirty, handleBlur, handleChange  }) => (
        <Form>
        <div>
        <Field
        as={"textarea"}
        name={"newMessageBody"}
        placeholder="Enter your message"
        onBlur={handleBlur}
        onChange={handleChange}
        />
        {errors.newMessageBody && touched.newMessageBody ? (
            <div className={s.error}>{errors.newMessageBody}</div>
          ) : null}

        </div>
       <div><button type={"submit"} disabled={!dirty} >Add message</button></div>
        </Form>
       )}
        </Formik>
        )
   } 





export default Dialogs