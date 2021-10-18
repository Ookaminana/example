import axios, { AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { Auth as AuthService } from '../services/Auth'

//https://www.npmjs.com/package/axios-auth-refresh
export type ErrorsTypes = {
    [field: string]: Array<string> | Array<{ [index: number]: Array<string> }>
}

export type ResponseType = {
    code: number
    success: boolean
    data?: any
    errors?: ErrorsTypes
}

const config: AxiosRequestConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

if (process.env.REACT_APP_API_URL) {
    config.baseURL = process.env.REACT_APP_API_URL
}

const instance = axios.create(config)

// Устанавливаем токен в заголовок при каждом запросе
instance.interceptors.request.use((request) => {
    request.headers['Authorization'] = `Bearer ${AuthService.getToken()}`
    return request
})

// Подключаем плагин для обновления токена
// createAuthRefreshInterceptor(instance, AuthService.refreshToken)

// type AddData = {
//     [field: string]: any
// }
//
// export type UploadFileResponse<DataType, MetaType> = ResponseType & {
//     data: DataType
//     meta: MetaType
// }
//
// export type UploadFileResult<DataType, MetaType> = {
//     data: DataType
//     meta: MetaType
// }
//
// export const uploadFile = async <DataType, MetaType>(
//     file: File,
//     endpoint: string,
//     field: string = 'file',
//     onUploadProgress: (percent: number) => void,
//     addData?: AddData
// ): Promise<UploadFileResult<DataType, MetaType>> => {
//     const config: AxiosRequestConfig = {
//         onUploadProgress: function (progressEvent) {
//             const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total
//             )
//
//             if (onUploadProgress) {
//                 onUploadProgress(percentCompleted)
//             }
//         },
//     }
//
//     let data = new FormData()
//     data.append(field, file)
//
//     if (addData) {
//         for (let field in addData) {
//             data.append(field, addData[field])
//         }
//     }
//
//     const response = await instance.post<
//         UploadFileResponse<DataType, MetaType>
//     >(endpoint, data, config)
//
//     return {
//         data: response.data.data,
//         meta: response.data.meta,
//     }
// }

export default instance
