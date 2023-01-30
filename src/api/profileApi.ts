import { PhotosType, ProfileType, UserType } from "../Types/types"
import { instance, ResultCodesEnum, ApiResponseType } from "./api"

type savePhotoResponseType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((res) => res.data)
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/` + userId)
      .then((res) => res.data)
  },
  updateStatus(status: string) {
    return instance
      .put<ApiResponseType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data)
  },
  savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance
      .put<ApiResponseType<savePhotoResponseType>>(`/profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<ApiResponseType>(`profile`, profile)
      .then((res) => res.data)
  },
}
