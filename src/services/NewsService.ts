import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { NewsType } from '../types'

/**
 * Параметры запроса получения списка новостей.
 */
type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

/**
 * Ответ при получении списка новостей.
 */
type GetListResponse = {
    baseUrl: string
    data: Array<NewsType>
}

/**
 * Ответ при получении новости.
 */
type GetItemResponse = {
    baseUrl: string
    data: NewsType
}

/**
 * Параметры запроса создания новостей.
 */
type CreateNewsParams = {
    title: string
    content: string
}

/**
 * Ответ при создании новостей.
 */
type CreateNewsResponse = {
    baseUrl: string
    data: NewsType
}

/**
 * Параметры обновления новости.
 */
type UpdateNewsParams = {
    title?: string
    content?: string
}

/**
 * Ответ при обновлении новости.
 */
type UpdateNewsResponse = {
    baseUrl: string
    data: NewsType
}

/**
 * Сервис для работы с новостями.
 */
export class News {
    /**
     * Получение списка новостей.
     *
     * @param {GetListParams} params    Параметры запроса.
     * @return                          Массив новостей.
     */
    static async getNewsList(params: GetListParams = {}) {
        const { search = '', offset = 0, limit = 30 } = params

        const queries = []
        if (search) {
            queries.push(`search=${search}`)
        }
        if (offset) {
            queries.push(`offset=${offset}`)
        }
        if (limit) {
            queries.push(`limit=${limit}`)
        }

        let endpoint = endpoints.getNewsList

        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data.map((newsItem) =>
            News._prepareNews(newsItem, response.data.baseUrl)
        )

        // return News._prepareNews(
        //     response.data.data,
        //     response.data.baseUrl
        // )

        // return [
        //     {
        //         id: 1,
        //         title: 'Новость 1',
        //         content:
        //             'Больша́я па́нда, или бамбу́ковый медведь — вид всеядных млекопитающих из семейства медвежьих со своеобразной чёрно-белой окраской шерсти, обладающих некоторыми признаками енотов. Единственный современный вид рода Ailuropus подсемейства Ailuropodinae.',
        //         photoPath: 'pands.jpg',
        //     },
        //     {
        //         id: 2,
        //         title: 'J-Hope',
        //         content:
        //             'Чон Хосок — южнокорейский рэпер, танцор, певец, автор песен и звукозаписывающий продюсер. Является участником бойз-бэнда BTS.',
        //         photoPath:
        //             'https://shaker-v4.ruyou.ru/assets/uploads/companyImages/2/1632404818.jpg',
        //     },
        // ]
    }

    /**
     * Получение новости.
     *
     * @param {number} id    Параметры запроса.
     * @return                          Массив новостей.
     */
    static async getNewsItem(id: number): Promise<NewsType> {
        let endpoint = endpoints.getNewsItem
        const response = await api.get<GetItemResponse>(endpoint)

        return News._prepareNews(response.data.data, response.data.baseUrl)
    }

    /**
     * Создание новости.
     *
     * @param {CreateNewsParams} params    Параметры запроса.
     * @return                          Массив новостей.
     */
    static async create(params: CreateNewsParams): Promise<NewsType> {
        const { title, content } = params

        const data = {
            title,
            content,
        }

        const response = await api.post<CreateNewsResponse>(
            endpoints.createNews,
            data
        )

        return News._prepareNews(response.data.data, response.data.baseUrl)
    }

    /**
     * Обновление новости.
     *
     * @param {number} id                  Идентификатор запроса.
     * @param {UpdateNewsParams} params    Параметры запроса.
     * @return                          Массив новостей.
     */
    static async update(
        id: number,
        params: UpdateNewsParams
    ): Promise<NewsType> {
        const { title, content } = params

        const data = {
            title,
            content,
        }

        const response = await api.post<UpdateNewsResponse>(
            route(endpoints.updateNews, { id }),
            data
        )
        return News._prepareNews(response.data.data, response.data.baseUrl)
    }

    /**
     * Обновление фото новости.
     *
     * @param {number} id                  Идентификатор запроса.
     * @param {File} photo    Параметры запроса.
     * @return                          Массив новостей.
     */
    static async uploadPhoto(id: number, photo: File): Promise<NewsType> {
        const data = new FormData()
        data.set('photo', photo)

        const response = await api.post<UpdateNewsResponse>(
            route(endpoints.uploadNewsPhoto, { id }),
            data
        )
        return News._prepareNews(response.data.data, response.data.baseUrl)
    }

    /**
     * Удаление новости.
     *
     * @param {number} id                  Идентификатор запроса.
     * @return                          Массив новостей.
     */
    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteNews, { id }))
    }

    /**
     * Функция 
     *
     * @param {NewsType} news                 Новости.
     * @param {string} baseUrl    Параметры запроса.
     * @return                          Массив новостей.
     */
    static _prepareNews(news: NewsType, baseUrl: string): NewsType {
        return {
            ...news,
            photoPath: news.photoPath ? baseUrl + news.photoPath : null,
        }
    }
}
