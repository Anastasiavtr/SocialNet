import {
  instance,
  ResultCodeForCaptchaEnum,
  ApiResponseType,
  ResultCodesEnum,
} from "./api"

type MeResponseType = {
  id: number
  email: string
  login: string
}
type LoginResponseType = {
  userId: number
}

export const authAPI = {
  me() {
    return instance
      .get<ApiResponseType<MeResponseType>>(`auth/me`)
      .then((res) => {
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
      .post<
        ApiResponseType<
          LoginResponseType,
          ResultCodesEnum | ResultCodeForCaptchaEnum
        >
      >(`auth/login`, {
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
