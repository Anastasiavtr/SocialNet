import axios from "axios"
import { ProfileType, UserType } from "../Types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "7c406fdb-383a-44cf-a7e7-c447e212602a",
  },
})

type usersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}
type toggleFollowResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4) {
    return instance
      .get<usersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },

  follow(userId: number) {
    return instance
      .post<toggleFollowResponseType>(`follow/${userId}`, {})
      .then((response) => {
        return response.data
      })
  },
  unfollow(userId: number) {
    return instance
      .delete<toggleFollowResponseType>(`follow/${userId}`)
      .then((response) => {
        return response.data
      })
  },
}

type getProfileResponseType = {
  data: ProfileType
}
type getStatusResponseType = {
  data: string
}
type updateStatusResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}
type savePhotoResponseType = {
  photos: { small: string; large: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type saveProfileResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<getProfileResponseType>(`profile/${userId}`)
      .then((res) => res.data)
  },
  getStatus(userId: number) {
    return instance
      .get<getStatusResponseType>(`profile/status/` + userId)
      .then((res) => res.data)
  },
  updateStatus(status: string) {
    return instance.put<updateStatusResponseType>(`profile/status`, {
      status: status,
    })
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance
      .put<savePhotoResponseType>(`/profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  },
  saveProfile(profile: ProfileType) {
    return instance.put<saveProfileResponseType>(`profile`, profile)
  },
}

type MeResponseType = {
  data: { id: number; email: string; login: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}
export type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => {
      return res.data
    })
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}

type securityResponseType = {
  url: string
}
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<securityResponseType>(`security/get-captcha-url`)
  },
}
