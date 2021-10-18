import api, { ResponseType } from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { Promotion as PromotionType } from '../types'

/**
 * Параметры запроса получения списка рекламных акций.
 */
type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

/**
 * Ответ при получении списка рекламных акций.
 */

type GetListResponse = {
    data: Array<PromotionType>
}

/**
 * Ответ при получении рекламной акций.
 */
type GetItemResponse = {
    data: PromotionType
}

/**
 * Параметры запроса создания рекламной акций.
 */
type CreatePromotionParams = {
    productId: number
    automatId: number
    price: number
    startAt: string | Date
    endAt: string | Date
}

/**
 * Ответ при создании рекламной акции
 */
type CreatePromotionResponse = {
    data: PromotionType
}

/**
 * Параметры запроса обновления рекламной акции
 */
type UpdatePromotionParams = {
    productId?: number
    automatId?: number
    price?: number
    startAt?: string | Date
    endAt?: string | Date
}

/**
 * Отввет при обновлении рекламной акции
 */
type UpdatePromotionResponse = {
    data: PromotionType
}

/**
 * Сервис для работы с рекламными акциями.
 */
export class Promotion {
    /**
     * Получение списка рекламных акций.
     *
     * @param {GetListParams} params    Параметры запроса.
     * @return                          Массив рекламных акций.
     */
    static async getPromotions(params: GetListParams = {}) {
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

        let endpoint = endpoints.getPromotions

        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data

        // return [
        //     {
        //         id: 1,
        //         productId: 1,
        //         product: {
        //             id: 1,
        //             name: 'string',
        //         },
        //         automatId: 107,
        //         automat: {
        //             id: 107,
        //             name: 'string',
        //             address: 'string',
        //         },
        //         price: 100,
        //         startAt: new Date('2021-09-22T00:00:00+00:00'),
        //         endAt: new Date('2021-09-22T00:00:00+00:00'),
        //     },
        //     {
        //         id: 2,
        //         productId: 37,
        //         product: {
        //             id: 37,
        //             name: 'string2',
        //         },
        //         automatId: 105,
        //         automat: {
        //             id: 105,
        //             name: 'string2',
        //             address: 'string2',
        //         },
        //         price: 200,
        //         startAt: new Date('2021-09-22T00:00:00+00:00'),
        //         endAt: new Date('2021-09-22T00:00:00+00:00'),
        //     },
        // ]
    }

    /**
     * Получение рекламной акции.
     *
     * @param {number} id    Идентификатор рекламной акции.
     * @return               Выбранная рекламная акция.
     */
    static async getPromotion(id: number): Promise<PromotionType> {
        let endpoint = endpoints.getPromotion
        const response = await api.get<GetItemResponse>(endpoint)

        return Promotion._preparePromotion(response.data.data)

        // return Promotion._preparePromotion({
        //     id: 1,
        //     productId: 1,
        //     product: {
        //         id: 1,
        //         name: 'string',
        //     },
        //     automatId: 1,
        //     automat: {
        //         id: 1,
        //         name: 'string',
        //         address: 'string',
        //     },
        //     price: 100,
        //     startAt: new Date('2021-09-22T00:00:00+00:00'),
        //     endAt: new Date('2021-09-22T00:00:00+00:00'),
        // })
    }

    /**
     * Создание рекламной акции.
     *
     * @param {CreatePromotionParams} params     Параметры запроса.
     * @return                          Созданная торговая точка.
     */
    static async create(params: CreatePromotionParams): Promise<PromotionType> {
        const { productId, automatId, price, startAt, endAt } = params

        const data = {
            productId,
            automatId,
            price,
            startAt,
            endAt,
        }

        const response = await api.post<CreatePromotionResponse>(
            endpoints.createPromotion,
            data
        )

        return response.data.data
    }

    /**
     * Обновление рекламной акции.
     *
     * @param {number} id                            Идентификатор рекламной акции.
     * @param {UpdatePromotionParams} params         Параметры запроса.
     * @return                                       Обновленная торговая точка.
     */
    static async update(
        id: number,
        params: UpdatePromotionParams
    ): Promise<PromotionType> {
        const { productId, automatId, price, startAt, endAt } = params

        const data = {
            productId,
            automatId,
            price,
            startAt,
            endAt,
        }

        const response = await api.post<UpdatePromotionResponse>(
            route(endpoints.updatePromotion, { id }),
            data
        )
        return response.data.data
    }

    /**
     * Удаление рекламной акции.
     *
     * @param {number} id                            Идентификатор рекламной акции.
     */
    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deletePromotion, { id }))
    }

    /**
     * Функция для преобразования дат.
     * @param {PromotionType} promotion             Объект рекламной акции.
     *
     */
    static _preparePromotion(promotion: PromotionType): PromotionType {
        return {
            ...promotion,
            startAt: new Date(promotion.startAt),
            endAt: new Date(promotion.endAt),
        }
    }
}
