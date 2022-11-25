import * as Yup from 'yup';
 import { string } from 'yup';
 
 export const DialogsSchema = Yup.object().shape({
    newMessageBody: Yup.string()  
     .max(70, 'The message is too long!')   
 });
 export const PostsSchema = Yup.object().shape({
    newPostText: Yup.string() 
     .max(50, 'The post is too long!')   
 });

 export const LoginSchema = Yup.object().shape({
  email: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      captcha: Yup.string()
 })

  
  export const ProfileSchema = Yup.object().shape({
    fullName: string().required('Required'),
    lookingForAJobDescription: string().required('Required'),
    aboutMe: string().required('Required')
    })
  