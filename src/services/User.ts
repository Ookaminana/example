import api, { ResponseType } from '../utils/api'
import { endpoints } from '../constants'
import { Profile as ProfileType, User as UserType, UserGroups } from '../types'
import { route } from '../utils/route'
import apiWithoutToken from '../utils/apiWithoutToken'

type UserResponse = UserType & {
    permissions: {
        groups: UserGroups
        automats?: string
        outlets?: string
    }
}

export type GetListParams = {
    search?: string
    companyId?: number
    group?: UserGroups
    offset?: number
    limit?: number
}

export type GetListResponse = {
    baseUrl: string
    data: Array<UserType>
}

export type GetItemResponse = {
    baseUrl: string
    data: UserResponse
}

export type InviteParams = {
    email: string
    companyId: number
    group: UserGroups
    automats?: Array<number>
    outlets?: Array<number>
}

export type InviteResponse = {
    baseUrl: string
    data: UserType & {
        permissions: {
            groups: string
        }
    }
}

export type UpdateParams = {
    fullName?: string
    contacts?: Array<{
        id?: number
        type: string
        contact: string
        confirmed: boolean
    }>
    permissions?: {
        group: string
        automats?: Array<number>
        outlets?: Array<number>
    }
}

export type UpdateResponse = {
    baseUrl: string
    data: UserType
}

export type GetProfileResponse = ResponseType & {
    baseUrl: string
    data: ProfileType
}

type RequestContact = {
    id?: number
    type: string
    contact: string
    confirmed: boolean
}

type UpdateProfileParams = {
    fullName?: string
    contacts?: Array<RequestContact>
}

type UpdateProfileResponse = {
    baseUrl: string
    data: ProfileType
}

type RecoveryPasswordResponse = {
    data: Array<string>
    errors: Array<string>
}

type RecoveryPasswordResult = RecoveryPasswordResponse

/**
 * User service.
 */
export class User {
    static async getList(params: GetListParams = {}): Promise<Array<UserType>> {
        const { search, companyId, group, offset = 0, limit = 30 } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (search) {
            queries.push(`search=${search}`)
        }
        if (companyId) {
            queries.push(`companyId=${companyId}`)
        }
        if (group) {
            queries.push(`group=${group}`)
        }

        const endpoint = endpoints.getUsersList + '?' + queries.join('&')

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data.map((user) =>
            User._prepareProfile(user, response.data.baseUrl)
        )
    }

    static async getItem(id: number): Promise<UserType> {
        const response = await api.get<GetItemResponse>(
            route(endpoints.getUserItem, { id })
        )
        return User._prepareUser(response.data.data, response.data.baseUrl)
    }

    static async invite(params: InviteParams): Promise<UserType> {
        const response = await api.post<InviteResponse>(endpoints.inviteUser, {
            ...params,
            automats: params.automats
                ? JSON.stringify(params.automats)
                : undefined,
            outlets: params.outlets
                ? JSON.stringify(params.outlets)
                : undefined,
        })

        return User._prepareProfile(response.data.data, response.data.baseUrl)
    }

    static async updateById(
        id: number,
        params: UpdateParams
    ): Promise<UserType> {
        const response = await api.post<UpdateResponse>(
            route(endpoints.updateUser, { id }),
            {
                ...params,
                contacts: params.contacts
                    ? JSON.stringify(params.contacts)
                    : undefined,
                permissions: params.permissions
                    ? JSON.stringify(params.permissions)
                    : undefined,
            }
        )

        return User._prepareProfile(response.data.data, response.data.baseUrl)
    }

    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteUser, { id }))
    }

    static async confirmEmail(key: string): Promise<void> {
        await api.get(endpoints.confirmUserEmail + `?key=${key}`)
    }

    /**
     * Get info of auth user.
     * @return {Promise<UserType>}
     */
    static async getProfile(): Promise<ProfileType> {
        const response = await api.get<GetProfileResponse>(endpoints.getProfile)

        return User._prepareProfile(response.data.data, response.data.baseUrl)
        // return response.data.data
    }

    static async update(params: UpdateProfileParams): Promise<ProfileType> {
        const { fullName, contacts } = params

        const data = new FormData()
        if (fullName) {
            data.append('fullName', fullName)
        }
        if (contacts) {
            data.append('contacts', JSON.stringify(contacts))
        }

        const response = await api.post<UpdateProfileResponse>(
            endpoints.updateProfile,
            data
        )
        return User._prepareProfile(response.data.data, response.data.baseUrl)
    }

    static async uploadPhoto(file: File): Promise<void> {
        const data = new FormData()
        data.append('photo', file)

        const response = await api.post(endpoints.uploadPhoto, data)
        return response.data.data
    }

    static async deletePhoto(): Promise<void> {
        await api.delete(endpoints.deletePhoto)
    }

    static async uploadPhotoByUserId(
        userId: number,
        file: File
    ): Promise<void> {
        const data = new FormData()
        data.append('photo', file)

        const response = await api.post(
            route(endpoints.uploadPhotoByUserId, { id: userId }),
            data
        )
        return response.data.data
    }

    static async deletePhotoByUserId(userId: number) {
        await api.delete(route(endpoints.deletePhotoByUserId, { id: userId }))
    }

    static async restorePassword(
        account: string
    ): Promise<RecoveryPasswordResult> {
        const response = await apiWithoutToken.get<RecoveryPasswordResponse>(
            endpoints.restoreUserPassword + `?account=${account}`
        )

        return {
            data: response.data.data,
            errors: response.data.errors,
        }
    }

    static async setPassword(key: string, password: string): Promise<void> {
        await apiWithoutToken.post(endpoints.setPassword, {
            key,
            password,
        })
    }

    static _prepareProfile(profile: ProfileType, baseUrl: string): ProfileType {
        return {
            ...profile,
            photoPath: profile.photoPath ? baseUrl + profile.photoPath : null,
        }
    }

    static _prepareUser(userRes: UserResponse, baseUrl: string): UserType {
        if (
            userRes.permissions.group === UserGroups.Club ||
            userRes.permissions.group === UserGroups.Service
        ) {
            return {
                ...userRes,
                photoPath: userRes.photoPath
                    ? baseUrl + userRes.photoPath
                    : null,
                permissions: {
                    group: userRes.permissions.group,
                    outlets: userRes.permissions.outlets
                        ? JSON.parse(userRes.permissions.outlets)
                        : [],
                },
            }
        } else if (userRes.permissions.group === UserGroups.Employer) {
            return {
                ...userRes,
                photoPath: userRes.photoPath
                    ? baseUrl + userRes.photoPath
                    : null,
                permissions: {
                    group: userRes.permissions.group,
                    automats: userRes.permissions.automats
                        ? JSON.parse(userRes.permissions.automats)
                        : [],
                },
            }
        }

        return {
            ...userRes,
            photoPath: userRes.photoPath ? baseUrl + userRes.photoPath : null,
            permissions: {
                group: userRes.permissions.group,
            },
        }
    }
}
