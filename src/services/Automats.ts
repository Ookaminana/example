import _ from 'lodash'
import { endpoints } from '../constants'
import { AutomatLog, AutomatLogLevels, AutomatType } from '../types'
import api from '../utils/api'
import { route } from '../utils/route'

type GetListParams = {
    search?: string
    outletId?: number
    companyId?: number
    offset?: number
    limit?: number
}
type GetListResponse = {
    data: Array<AutomatType>
}

type GetItemResponse = {
    data: AutomatType
}

type CreateParams = {
    name: string
    serialNumber: string
    automatModelId: number
    outletId: number
    address: string
    longitude: number
    latitude: number
    containers: Array<{
        automatModelContainerId: number
        tasteId: number
        isActive: boolean
        hasSmallDrink: boolean
    }>
    dosages: Array<{
        drinkVolume: number
        water: number
        product: number
        conversionFactor: number
        price: number
    }>
}

type CreateResponse = {
    data: AutomatType
}

type UpdateParams = {
    name: string
    serialNumber: string
    automatModelId: number
    outletId: number
    address: string
    longitude: number
    latitude: number
    containers: Array<{
        id?: number
        automatModelContainerId: number
        tasteId: number
        isActive: boolean
        hasSmallDrink: boolean
    }>
    dosages: Array<{
        id?: number
        drinkVolume: number
        water: number
        product: number
        conversionFactor: number
        price: number
    }>
}

type UpdateResponse = {
    data: AutomatType
}

type GetLogsParams = {
    automatId?: number
    level?: AutomatLogLevels
    offset?: number
    limit?: number
}

type GetLogsResponse = {
    data: Array<AutomatLog>
}

export class Automats {
    /**
     * Метод получения списка автоматов
     * @param params
     * @returns
     */
    static async getLists(
        params: GetListParams = {}
    ): Promise<Array<AutomatType>> {
        const {
            search = '',
            outletId,
            companyId,
            offset = 0,
            limit = 30,
        } = params

        const queries = []
        if (search) {
            queries.push(`search=${search}`)
        }
        if (outletId) {
            queries.push(`outletId=${outletId}`)
        }
        if (companyId) {
            queries.push(`companyId=${companyId}`)
        }
        if (offset) {
            queries.push(`offset=${offset}`)
        }
        if (limit) {
            queries.push(`limit=${limit}`)
        }

        let endpoint = endpoints.getAutomatsList
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    static async getItem(id: number): Promise<AutomatType> {
        let endpoint = endpoints.getAutomatsList + '?automatId=' + id

        const response = await api.get<GetItemResponse>(endpoint)

        return response.data.data
    }

    /**
     * Метод создания автомата
     */

    static async create(data: CreateParams): Promise<AutomatType> {
        const response = await api.post<CreateResponse>(
            endpoints.createAutomat,
            {
                ...data,
                containers: JSON.stringify(data.containers),
                dosages: JSON.stringify(data.dosages),
            }
        )

        return response.data.data
    }

    /**
     * Метод обновления автомата
     */
    static async update(id: number, data: UpdateParams): Promise<AutomatType> {
        const response = await api.post<CreateResponse>(
            route(endpoints.updateAutomat, { id }),
            {
                ...data,
                containers: JSON.stringify(data.containers),
                dosages: JSON.stringify(data.dosages),
            }
        )

        return response.data.data
    }

    /**
     * Метод удаления автомата
     */

    static async deleteAutomat(id: number) {
        const response = await api.delete(
            route(endpoints.deleteAutomat, { id })
        )
        return response.data.data
    }

    static async getLogs(
        params: GetLogsParams = {}
    ): Promise<Array<AutomatLog>> {
        const { offset = 0, limit = 30, automatId, level } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (automatId) {
            queries.push(`automatId=${automatId}`)
        }

        if (level) {
            queries.push(`level=${level}`)
        }

        const endpoint = endpoints.getAutomatsLogs + '?' + queries.join('&')

        const response = await api.get<GetLogsResponse>(endpoint)

        return response.data.data
    }

    static async sendCommand(id: number, command: string): Promise<void> {
        await api.post(route(endpoints.sendCommandToAutomat, { id }), {
            command,
        })
    }

    static async sendRefillApp(
        automatId: number,
        containers: 'all' | Array<number>
    ): Promise<void> {
        await api.post(endpoints.sendRefillAppToAutomat, {
            automatId,
            containers: _.isArray(containers)
                ? containers.join(',')
                : containers,
        })
    }
}
