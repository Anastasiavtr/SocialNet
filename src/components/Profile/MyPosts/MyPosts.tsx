import React, { FC } from 'react'
import { actions } from '../../State/profileReducer'
import { connect } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../Types/hooks'
import { PostType, ProfileType } from '../../../Types/types'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Formik, Field, Form } from 'formik'
import { PostsSchema } from '../../../Validators/ValidationDialogs'

type PropsType = {
  posts: Array<PostType>
}

const MyPosts: FC<PropsType> = (props) => {
  const posts = useAppSelector((state) => state.profilePage.posts)
  const dispatch = useAppDispatch()
  const addNewPost = (newPostText: string) => {
    dispatch(actions.addPost(newPostText))
  }
  const deletePosts = (id: number) => {
    dispatch(actions.deletePost(id))
  }
  return (
    <section>
      <h3> My posts</h3>
      <NewPost addPost={addNewPost} />
      <div className={s.postsItems}>
        {posts.map((post) => {
          return (
            <Post
              message={post.message}
              key={post.id}
              id={post.id}
              deletePost={deletePosts}
            />
          )
        })}
      </div>
    </section>
  )
}

export default React.memo(MyPosts)

type MyFormValues = {
  addPost: (newPostText: string) => void
}
const NewPost: React.FC<MyFormValues> = (props) => {
  let onAddPost = (values: string) => {
    props.addPost(values)
  }
  return (
    <Formik
      initialValues={{
        newPostText: '',
      }}
      onSubmit={(values, { resetForm }) => {
        onAddPost(values.newPostText)
        resetForm()
      }}
      validationSchema={PostsSchema}
    >
      {({ errors, touched, dirty, handleBlur, handleChange }) => (
        <Form className={s.form}>
          <div>
            <Field
              as={'textarea'}
              name={'newPostText'}
              placeholder="Enter your message"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.newPostText && touched.newPostText ? (
              <div className={s.error}>{errors.newPostText}</div>
            ) : null}
          </div>
          <div>
            <button type={'submit'} disabled={!dirty}>
              Add post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

// class MyPostsContainer extends React.Component {

// render() {
//      return <MyPosts addPost={this.props.addPost}
//     posts={this.props.profile.posts}
//      />
// }
// }

//     let mapStateToProps = (state) => {
//     return {
//     profile: state.profilePage
// }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPostText) => {
//             dispatch(addPost(newPostText))
//         }
//     }
// }

// export default connect(mapStateToProps, {addPost})(MyPostsContainer)
