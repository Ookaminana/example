import api from '../utils/api'
import { endpoints } from '../constants'
import { AutomatFillinsType, FillingContainerType } from '../types'
import { route } from '../utils/route'

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}
type GetListResponse = {
    data: Array<AutomatFillinsType>
}
type CreateFillingParams = {
    name: string
    automatModelId: number
    containers: Array<FillingContainerType>
}
type UpdateFillingParams = {
    name: string
    automatModelId: number
    containers: Array<FillingContainerType>
}
type PostFillingResponse = {
    data: AutomatFillinsType
}

/**
 *
 */

export class FillingsService {
    /**
     * Метод получения списка наполнителей
     * @param params Параметры запроса
     * @returns Массив наполнителей
     */
    static async getFillings(
        params: GetListParams = {}
    ): Promise<Array<AutomatFillinsType>> {
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

        let endpoint = endpoints.fillings
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }
        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    /**
     * Метод создания наполнителя
     * @param data Наполнитель
     * @returns
     */

    static async createFiling(
        data: CreateFillingParams
    ): Promise<AutomatFillinsType> {
        const response = await api.post<PostFillingResponse>(
            endpoints.createFilling,
            { ...data, containers: JSON.stringify(data.containers) }
        )

        return response.data.data
    }
    /**
     * Метод обновления наполнителя
     * @param data Наполнитель
     * @returns
     */

    static async updateFilling(
        id: number,
        data: UpdateFillingParams
    ): Promise<AutomatFillinsType> {
        const response = await api.put<PostFillingResponse>(
            route(endpoints.editFilling, { id }),
            {
                ...data,
                containers: JSON.stringify(data.containers),
            }
        )

        return response.data.data
    }
    /**
     * Метод удаления наполнителя
     * @param id ID Наполнителя
     * @returns
     */

    static async deleteFilling(id: number): Promise<any> {
        await api.delete<PostFillingResponse>(
            route(endpoints.deleteFilling, { id })
        )
    }
}
