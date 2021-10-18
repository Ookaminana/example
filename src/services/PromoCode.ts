import api from '../utils/api'
import { endpoints, DOMAIN } from '../constants'
import { PromoCode as PromoCodeType } from '../types'
import moment from 'moment'
import { route } from '../utils/route'

/**
 * Параметры запроса получения списка промокодов.
 */
type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

/**
 * Ответ получения списка промокодов.
 */
type GetListResponse = {
    data: Array<PromoCodeType>
}

/**
 * Параметры запроса создания промокода.
 */
type CreatePromoCodeParams = {
    promoCode: string
    startAt: Date
    endAt: Date
    usageAmount: number
    discount: number // %,
    automatsIds: Array<number>
    tastes: string //"all" or "1,2,3"
}

/**
 * Ответ при создании промокодов.
 */
type CreatePromoCodeResponse = {
    data: PromoCodeType
}

/**
 * Параметры запроса обновления промокода.
 */
type UpdatePromoCodeParams = {
    promoCode?: string
    startAt?: Date
    endAt?: Date
    usageAmount?: number
    discount?: number // %,
    automatsIds?: Array<number>
    tastes?: string //"all" or "1,2,3"
}

/**
 * Ответ при обновлении промокодов.
 */
type UpdatePromoCodeResponse = {
    data: PromoCodeType
}

/**
 * Сервис для работы с промокодами.
 */
export class PromoCode {
    /**
     * Получение списка промокодов.
     *
     * @param {GetListParams} params    Параметры запроса.
     * @return                          Массив промокодов.
     */
    static async getPromoCodes(
        params: GetListParams = {}
    ): Promise<Array<PromoCodeType>> {
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

        let endpoint = endpoints.getPromoCodes
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    /**
     * Создание промокодов.
     *
     * @param {CreatePromoCodeParams} params     Параметры запроса.
     * @return                                   Созданный промокод.
     */

    static async create(params: CreatePromoCodeParams): Promise<PromoCodeType> {
        const {
            promoCode,
            startAt,
            endAt,
            usageAmount,
            discount,
            automatsIds,
            tastes,
        } = params

        const data = new FormData()
        data.append('promoCode', promoCode)
        data.append('startAt', `${moment(startAt).format('YYYY-MM-DD')}`)
        data.append('endAt', `${moment(endAt).format('YYYY-MM-DD')}`)
        data.append('usageAmount', `${usageAmount}`)
        data.append('discount', `${discount}`)
        data.append('automatsIds', JSON.stringify(automatsIds))
        data.append('tastes', tastes)

        const response = await api.post<CreatePromoCodeResponse>(
            endpoints.createPromoCode,
            data
        )

        // const a:any = response.data.data.automatsIds
        // response.data.data.automatsIds = JSON.parse(a)
        return response.data.data
    }

    /**
     * Обновление промокода.
     *
     * @param {number} id                        Идентификатор промокода.
     * @param {UpdatePromoCodeParams} params     Параметры запроса.
     * @return                                   Обновленная торговая точка.
     */
    static async update(
        id: number,
        params: UpdatePromoCodeParams
    ): Promise<PromoCodeType> {
        const {
            promoCode,
            startAt,
            endAt,
            usageAmount,
            discount,
            automatsIds,
            tastes,
        } = params

        const data = new FormData()
        if (promoCode) {
            data.append('promoCode', promoCode)
        }
        if (startAt) {
            data.append('startAt', `${moment(startAt).format('YYYY-MM-DD')}`)
        }
        if (endAt) {
            data.append('endAt', `${moment(endAt).format('YYYY-MM-DD')}`)
        }
        if (usageAmount) {
            data.append('usageAmount', usageAmount + '')
        }
        if (discount) {
            data.append('discount', discount + '')
        }
        if (automatsIds) {
            data.append('automatsIds', JSON.stringify(automatsIds))
        }
        if (tastes) {
            data.append('tastes', tastes)
        }
        const response = await api.post<UpdatePromoCodeResponse>(
            // `${endpoints.updatePromoCode}${id}`,
            // route(endpoints.updatePromoCode, { id }),
            route(endpoints.updatePromoCode, { id }),
            data
        )

        // const a:any = response.data.data.automatsIds
        // response.data.data.automatsIds = JSON.parse(a)
        return response.data.data
    }

    /**
     * Удаление промокода.
     *
     * @param {number} id   Идентификатор промокода.
     */
    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deletePromoCode, { id }))
    }
}
