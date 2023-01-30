import axios from "axios"
import { ContactsType, PhotosType, ProfileType, UserType } from "../Types/types"

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "7c406fdb-383a-44cf-a7e7-c447e212602a",
  },
})
export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}
export type GetUsersType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
