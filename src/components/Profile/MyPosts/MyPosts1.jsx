import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Formik, Field, Form } from 'formik'
import { PostsSchema } from '../../../Validators/ValidationDialogs'

const MyPosts = (props) => {

    return (
        <section>
        <h3> My posts</h3>
        <NewPost addPost={props.addPost}/>
        <div className={s.postsItems}>

        {props.posts.map((post) => {
        return <Post message={post.message} 
         key={post.id} />
        })}  

        </div>
        </section>
    )
}


const NewPost = (props) => {

    let onAddPost = (values) => {
        props.addPost(values);  
     }

    return (
        <Formik 
        initialValues = {{
        newPostText: '',
      }}
        onSubmit = {(values, {resetForm}) => {
        onAddPost( values.newPostText)
        resetForm({values: ''})
      }}
      validationSchema = {PostsSchema}
    >
        {({ errors, touched, dirty, handleBlur, handleChange }) => (
        <Form className={s.form}>
        <div>
        <Field
        as={"textarea"}
        name={"newPostText"}
        placeholder="Enter your message" 
        onBlur={handleBlur}
        onChange={handleChange}
        /> 
         {errors.newPostText && touched.newPostText ? (
          <div className={s.error}>{errors.newPostText}</div>
        ) : null}</div>
       <div><button type={"submit"} disabled={!dirty}>Add post</button></div>
        </Form>
         )}
        </Formik>
        )
   } 



export default MyPosts;