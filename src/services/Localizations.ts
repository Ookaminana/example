import api from '../utils/api'
import { endpoints, DOMAIN } from '../constants'
import {
    LangKeys as LangKeysType,
    LanguageList as LanguageListType,
    Translations as TranslationsType,
} from '../types'

/**
 * Ответ при запросе локализации.
 */
type GetLanguagesListResponse = {
    data: Array<LanguageListType>
}

/**
 * Параметры запроса локализации.
 */
type GetListParams = {
    search?: string
    offset?: number
    noTranslateLang?: number
    limit?: number
}

/**
 * Ответ при запросе списка локализаций.
 */
type GetListResponse = {
    data: Array<LangKeysType>
}

/**
 * Ответ при обновлении локализации.
 */
type UpdateLangKeysResponse = {
    data: LangKeysType
}

/**
 * Параметры при запросе создания локализации.
 */
type CreateLangKeyParams = {
    name: string
    translations: Array<TranslationsType>
}

/**
 * Параметры при импорте файла с локализаций.
 */
type ImportLangKeyParams = {
    file: File
}

/**
 * Ответ при импорте файла с локализаций.
 */
type ImportLangKeyResponse = {
    data: LangKeysType
}

/**
 * Ответ при создании локализации.
 */
type CreateLangKeysResponse = {
    data: LangKeysType
}

export class Localizations {
    static async getList(
        params: GetListParams = {}
    ): Promise<Array<LangKeysType>> {
        const {
            search = '',
            offset = 0,
            noTranslateLang = 0,
            limit = 30,
        } = params

        const queries = []
        if (search) {
            queries.push(`search=${search}`)
        }
        if (offset) {
            queries.push(`offset=${offset}`)
        }
        if (noTranslateLang) {
            queries.push(`noTranslateLang=${noTranslateLang}`)
        }
        if (limit) {
            queries.push(`limit=${limit}`)
        }

        let endpoint = endpoints.getLangKeys
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    static async getLanguages(): Promise<Array<LanguageListType>> {
        const response = await api.get<GetLanguagesListResponse>(
            endpoints.getLanguageList
        )
        return response.data.data
    }

    static async create(params: CreateLangKeyParams): Promise<LangKeysType> {
        const { name, translations } = params

        const data = new FormData()

        data.append('name', name)

        if (translations) {
            data.append('translations', JSON.stringify(translations))
        }

        const response = await api.post<CreateLangKeysResponse>(
            endpoints.createLangKeys,
            data
        )

        return response.data.data
    }

    static async import(params: ImportLangKeyParams): Promise<LangKeysType> {
        const { file } = params

        const data = new FormData()

        data.append('file', file)

        const response = await api.post<ImportLangKeyResponse>(
            endpoints.importLangKeys,
            data
        )

        return response.data.data
    }

    static async update(params: LangKeysType): Promise<LangKeysType> {
        const { id, name, translations } = params

        const data = new FormData()
        if (translations) {
            data.append('translations', JSON.stringify(translations))
        }
        if (name) {
            data.append('name', name)
        }

        const response = await api.post<UpdateLangKeysResponse>(
            `${endpoints.updateLangKeys}${id}`,
            data
        )

        return response.data.data
    }

    static async delete(id: number): Promise<void> {
        await api.delete(endpoints.deleteLangKeys + `${id}`)
    }
}
