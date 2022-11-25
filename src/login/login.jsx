import { Field, Form, Formik } from "formik";
import { login } from "../components/State/authReducer";
import { LoginSchema } from "../Validators/ValidationDialogs";
import styles from './login.module.css'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
const Login = (props) => {

  if (props.isAuth) {
    return  <Navigate to="/profile/" />
  }

return(
    <section>
    <h1>Login</h1>
    <LoginForm login={props.login} captchaUrl={props.captchaUrl}/>
    </section>
)
}


const LoginForm = (props) => {
return( 
   <Formik 
  
      initialValues = {{
        email: '',
        password: '',
        rememberMe: false,
      }}
      onSubmit = {(values, onSubmitProps) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha,
        onSubmitProps.setStatus, onSubmitProps.setSubmitting);
      }}
      validationSchema = {LoginSchema}
    >
 
        {({ errors, touched, dirty, isValid, handleBlur, handleChange, status, isSubmitting }) => (
    <Form>


      <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
     {props.captchaUrl && <img src={props.captchaUrl}/>}
      {props.captchaUrl && 
     <div> <Field placeholder={"Symbols from image"} type={"text"} name={"captcha"}  onChange={handleChange} /></div>}
     {errors.captcha ?(<p>{errors.captcha}</p>) : null}
</div>
      <div className={styles.inputContainer}>
        <Field placeholder={"email"}  name={"email"} type={"email"}   onBlur={handleBlur}
        onChange={handleChange} />
        {errors.login && touched.login ? (<p>{errors.email}</p> ) : null}
      </div>

        <div className={styles.inputContainer}>
        <Field placeholder={"password"} name={"password"} type={"password"}  onBlur={handleBlur}
        onChange={handleChange}/> 
          {errors.password && touched.password ? ( <p>{errors.password}</p> ) : null}
       </div>
      
       <div className={styles.inputContainer}>  
        <Field id={"rememberMe"} name={"rememberMe"} type={"checkbox"}  onBlur={handleBlur}
        onChange={handleChange}/>
        <label htmlFor={'rememberMe'}>Remember me</label>
       </div>

       <div className={styles.inputContainer}>
        <div ><p>{status}</p></div>
        <button type="submit" disabled={!isValid ||isSubmitting}>Submit</button>
        </div>
        
        </div>
        </Form>
        )}
        </Formik>
        )
    }
    
    const mapStateToProps = (state) => {
      return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
      }
     
    }

    export default connect(mapStateToProps, {login})(Login)



    
   