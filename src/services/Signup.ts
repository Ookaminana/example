import api, { ResponseType } from '../utils/api'
import { endpoints } from '../constants'
import { User as UserType } from '../types'
import { route } from '../utils/route'

export interface SignupParams {
    name: string
    email: string
    password: string
    token?: string
}

/**
 * Параметры запроса получения регистрации.
 */
export type SignupResponse = ResponseType & {
    data: {
        user: UserType
    }
}

/**
 * Ответ при получении списка торговых точек.
 */
export type SignupConfirmResponse = ResponseType & {
    data: {
        user: UserType
        access_token: {
            value: string
            expired: number
        }
        refresh_token: {
            value: string
            expired: number
        }
    }
}

export class Signup {
    static async confirm(token: string): Promise<SignupConfirmResponse> {
        const response = await api.get<SignupConfirmResponse>(
            route(endpoints.signupConfirm, { token })
        )
        return response.data
    }

    static async execute(params: SignupParams) {
        const response = await api.post<SignupResponse>(
            endpoints.signup,
            params
        )
        return response.data
    }
}
