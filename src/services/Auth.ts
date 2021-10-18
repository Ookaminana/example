import api, { ResponseType, ErrorsTypes } from '../utils/api'
import apiWithoutToken from '../utils/apiWithoutToken'
import { User, User as UserType } from '../types'
import { endpoints } from '../constants'
import { route } from '../utils/route'

/**
 * Токен.
 */
export type Token = {
    /** Строка токена. */
    value: string
    /** Время жизни токена в секундах. */
    expired: number
}

/**
 * Ответ при запросе авторизации.
 */
export type LoginResponse = ResponseType & {
    data?: {
        accessToken: string
    }
}

/**
 * Ответ при запросе авторизации.
 */
type RefreshTokenResponse = ResponseType & {
    data?: {
        /** Объект пользователя */
        user: number
        /** Токен доступа */
        access_token: Token
        /** Токен обновления */
        refresh_token: Token
    }
}

export type AuthLoginResult = {
    success: boolean
    errors?: ErrorsTypes
    data?: {
        user: UserType
    }
}

export type RegType = {
    companyName: string
    login: string
    email: string
    password: string
}

export type RegResponse = {
    data: UserType
}

type RegistrationByInvitationParams = {
    key: string
    fullName: string
    email: string
    login: string
    password: string
}

/**
 * Сервис для работы с авторизацией пользователя.
 */
export class Auth {
    /**
     * Запрос на авторизацию.
     * @param login     Логин (почта) пользователя.
     * @param password  Пароль.
     */
    static async login(
        login: string,
        password: string
    ): Promise<AuthLoginResult> {
        const result: AuthLoginResult = {
            success: false,
        }

        const fd = new FormData()
        fd.append('login', login)
        fd.append('password', password)

        try {
            const response = await apiWithoutToken.post<LoginResponse>(
                endpoints.login,
                fd
            )

            const token = response.data.data.accessToken

            // console.log(token)

            // 'sldfkjlewfjlwejfwlkefjlweflk'

            Auth.saveTokens(token)

            result.success = true
        } catch (error) {
            if (error && error.response && error.response.status === 422) {
                result.errors = error.response.data.errors
            } else {
                throw error
            }
        }

        return result
    }

    /**
     * Возвращает токен из localStorage.
     */
    static getToken() {
        return localStorage.getItem('access_token')
    }

    /**
     * Обновляет access_token с помощью refresh_token.
     */
    static async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token')

        const response = await apiWithoutToken.put<RefreshTokenResponse>(
            endpoints.refreshToken,
            {
                headers: {
                    Authorization: refreshToken,
                },
            }
        )
        Auth.saveTokens(response.data.data.token)
    }

    /**
     * Удаляет access_token и refresh_token
     */
    static async removeToken() {
        localStorage.removeItem('access_token')
    }

    /**
     * Сохранение токенов в localStorage
     * @param token
     * refreshToken
     */
    static saveTokens(token: string): void {
        localStorage.setItem('access_token', token)
    }

    /**
     * Запрос на получение ссылки для восстановления пароля.
     * @param login Логин (почта) пользователя.
     */
    static async sendPasswordRecoveryLink(login: string): Promise<void> {
        await apiWithoutToken.post<ResponseType>(
            endpoints.sendPasswordRecoveryLink,
            {
                login,
            }
        )
    }

    /**
     * Запрос на восстановления пароля.
     * @param token     Токен, который получен из письма для восстановления пароля.
     * @param password  Новый пароль.
     */
    static async recoveryPassword(
        token: string,
        password: string
    ): Promise<UserType> {
        const response = await apiWithoutToken.post<LoginResponse>(
            endpoints.recoveryPassword,
            { token, password }
        )

        Auth.saveTokens(response.data.data.token)

        return response.data.data.user
    }

    /**
     * Registaration
     */

    static async registaration(data: RegType): Promise<User> {
        const response = await apiWithoutToken.post<RegResponse>(
            endpoints.regUser,
            data
        )
        return response.data.data
    }

    static async registrationByInvitation(
        params: RegistrationByInvitationParams
    ): Promise<void> {
        await apiWithoutToken.post(endpoints.registrationByInvitation, params)
    }
}
