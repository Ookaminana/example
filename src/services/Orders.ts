import moment from 'moment'
import api from '../utils/api'
import { Order as OrderType, OrderPriceMethods } from '../types'
import { endpoints } from '../constants'

export type SortOrderBy =
    | 'tasteName'
    | 'automatName'
    | 'totalPrice'
    | 'priceMethod'
    | 'buyAt'
    | 'promo'
export type SortOrder = 'ASC' | 'DESC'

/**
 * Параметры запроса получения списка заказов.
 */
type ResponseOrderType = OrderType & {
    buyAt: string
}

/**
 * Ответ при получении списка заказов.
 */
type GetListParams = {
    automatId?: number
    outletId?: number
    tasteId?: number
    priceMethod?: OrderPriceMethods
    start?: Date
    end?: Date
    orderBy?: SortOrderBy
    order?: SortOrder
    offset?: number
    limit?: number
}

/**
 * Параметры запроса получения списка заказов.
 */
type GetListResponse = {
    data: Array<ResponseOrderType>
}

/**
 * Сервис для работы с заказами.
 */
export class Orders {
    /**
     * Получение списка заказов.
     *
     * @param {GetListParams} params    Параметры запроса.
     * @return                          Массив заказов.
     */
    static async getList(params: GetListParams = {}) {
        const {
            automatId,
            outletId,
            tasteId,
            priceMethod,
            start,
            end,
            orderBy,
            order,
            offset = 0,
            limit = 30,
        } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (automatId) {
            queries.push(`automatId=${automatId}`)
        }
        if (outletId) {
            queries.push(`outletId=${outletId}`)
        }
        if (tasteId) {
            queries.push(`tasteId=${tasteId}`)
        }
        if (priceMethod) {
            queries.push(`priceMethod=${priceMethod}`)
        }
        if (start) {
            queries.push(`start=${moment(start).format('YYYY-MM-DD')}`)
        }
        if (end) {
            queries.push(`end=${moment(end).format('YYYY-MM-DD')}`)
        }
        if (orderBy) {
            queries.push(`orderBy=${orderBy}`)
        }
        if (order) {
            queries.push(`order=${order}`)
        }

        const endpoint = endpoints.getOrdersList + `?${queries.join('&')}`

        const result = await api.get<GetListResponse>(endpoint)

        return result.data.data
    }

    /**
     * Удаление заказа.
     *
     * @param {ResponseOrderType} order   Заказ.
     */
    static _prepareOrder(order: ResponseOrderType): OrderType {
        return {
            ...order,
            buyAt: new Date(order.buyAt),
        }
    }
}
