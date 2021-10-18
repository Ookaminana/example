import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { Outlet } from '../types'

/**
 * Параметры запроса получения списка торговых точек.
 */
type GetListParams = {
    // Поисковая строка
    search?: string
    // Идентификатор компании
    companyId?: string
    // Отступ
    offset?: number
    // Ограничение кол-ва элементов
    limit?: number
}

/**
 * Ответ при получении списка торговых точек.
 */
type GetListResponse = {
    // Массив торговых точек
    data: Array<Outlet>
}

/**
 * Параметры запроса создания торговой точки.
 */
type CreateParams = {
    // Название торговой точки
    name: string
    // Адрес торговой точки
    address: string
    // Идентификатор организации
    companyId?: number
}

/**
 * Ответ при создании торговой точки.
 */
type CreateResponse = {
    // Созданная торговая точка
    data: Outlet
}

/**
 * Параметры запроса обновления торговой точки.
 */
type UpdateParams = {
    // Название торговой точки
    name?: string
    // Адрес торговой точки
    address?: string
    // Идентификатор организации
    companyId?: number
}

/**
 * Ответ при обновлении торговой точки
 */
type UpdateResponse = {
    // Обновленная торговая точка
    data: Outlet
}

/**
 * Сервис для работы с торговыми точками.
 */
export class Outlets {
    /**
     * Получение списка торговых точке.
     *
     * @param {GetListParams} params    Параметры запроса.
     * @return                          Массив торговых точек.
     */
    static async getList(params: GetListParams = {}): Promise<Array<Outlet>> {
        const { search, companyId, offset = 0, limit = 30 } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (search) {
            queries.push(`search=${search}`)
        }
        if (companyId) {
            queries.push(`companyId=${companyId}`)
        }

        const endpoint = endpoints.getOutletsList + '?' + queries.join('&')

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    /**
     * Создание торговой точки.
     *
     * @param {CreateParams} params     Параметры запроса.
     * @return                          Созданная торговая точка.
     */
    static async create(params: CreateParams): Promise<Outlet> {
        const response = await api.post<CreateResponse>(
            endpoints.createOutlet,
            params
        )
        return response.data.data
    }

    /**
     * Обновление торговой точки.
     *
     * @param {number} id               Идентификатор торговой точки.
     * @param {UpdateParams} params     Параметры запроса.
     * @return                          Обновленная торговая точка.
     */
    static async update(id: number, params: UpdateParams): Promise<Outlet> {
        const response = await api.post<UpdateResponse>(
            route(endpoints.updateOutlet, { id }),
            params
        )
        return response.data.data
    }

    /**
     * Удаление торговой точки.
     *
     * @param {number} id   Идентификатор торговой точки.
     */
    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteOutlet, { id }))
    }
}
