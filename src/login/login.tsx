import { Field, Form, Formik } from 'formik'
import { login } from '../components/State/authReducer'
import { LoginSchema } from '../Validators/ValidationDialogs'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useScrollTrigger } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../Types/hooks'
import { getUserProfile } from '../components/State/profileReducer'

export const Login: React.FC<{}> = (props) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  if (isAuth) {
    return <Navigate to="/profile/" />
  }

  return (
    <section>
      <h1>Login</h1>
      <LoginForm />
    </section>
  )
}

// export default Login

const LoginForm: React.FC<{}> = (props) => {
  const captchaUrl = useAppSelector((state) => state.auth.captchaUrl)

  const dispatch = useAppDispatch()
  const toLogin = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
    setStatus: any,
    setSubmitting: any
  ) => {
    dispatch(
      login(email, password, rememberMe, captcha, setStatus, setSubmitting)
    )
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
      }}
      onSubmit={(values, onSubmitProps) => {
        toLogin(
          values.email,
          values.password,
          values.rememberMe,
          values.captcha,
          onSubmitProps.setStatus,
          onSubmitProps.setSubmitting
        )
      }}
      validationSchema={LoginSchema}
    >
      {({
        errors,
        touched,
        dirty,
        isValid,
        handleBlur,
        handleChange,
        status,
        isSubmitting,
      }) => (
        <Form>
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              {captchaUrl && <img src={captchaUrl} />}
              {captchaUrl && (
                <div>
                  {' '}
                  <Field
                    placeholder={'Symbols from image'}
                    type={'text'}
                    name={'captcha'}
                    onChange={handleChange}
                  />
                </div>
              )}
              {errors.captcha ? <p>{errors.captcha}</p> : null}
            </div>
            <div className={styles.inputContainer}>
              <Field
                placeholder={'email'}
                name={'email'}
                type={'email'}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>

            <div className={styles.inputContainer}>
              <Field
                placeholder={'password'}
                name={'password'}
                type={'password'}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
            </div>

            <div className={styles.inputContainer}>
              <Field
                id={'rememberMe'}
                name={'rememberMe'}
                type={'checkbox'}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <label htmlFor={'rememberMe'}>Remember me</label>
            </div>

            <div className={styles.inputContainer}>
              <div>
                <p>{status}</p>
              </div>
              <button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
