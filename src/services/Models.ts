import api from '../utils/api'
import { endpoints, DOMAIN } from '../constants'
import {
    AutomatModel as ModelType,
    AutomatModelTypes,
    AutomatContainerTypes,
    AutomatBunkerType as BunkerType,
} from '../types'

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

type GetListResponse = {
    data: Array<ModelType>
}

type CreateModelParams = {
    type: AutomatModelTypes
    name: string
    cups: number
    containers: Array<{
        type: AutomatContainerTypes
        number: number
        volume: number
    }>
}

type CreateModelResponse = {
    data: ModelType
}

type UpdateModelParams = {
    type?: number
    name?: string
    cups?: number
    containers?: Array<{
        id?: number
        type: AutomatContainerTypes
        number: number
        volume: number
    }>
}

type UpdateModelResponse = {
    data: ModelType
}

export class Models {
    static async getModels(
        params: GetListParams = {}
    ): Promise<Array<ModelType>> {
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

        let endpoint = endpoints.getModelList
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    static async create(params: CreateModelParams): Promise<ModelType> {
        const { type, name, cups, containers } = params

        const data = new FormData()
        data.append('type', type.toString())
        data.append('name', name)
        data.append('cups', cups + '')
        data.append('containers', JSON.stringify(containers))

        const response = await api.post<CreateModelResponse>(
            endpoints.createModel,
            data
        )

        return response.data.data
    }

    static async update(
        id: number,
        params: UpdateModelParams
    ): Promise<ModelType> {
        const { type, name, cups, containers } = params

        const data = new FormData()
        if (type) {
            data.append('type', type.toString())
        }
        if (name) {
            data.append('name', name)
        }
        if (cups) {
            data.append('cups', cups + '')
        }
        if (containers) {
            data.append('containers', JSON.stringify(containers))
        }

        const response = await api.post<UpdateModelResponse>(
            `${endpoints.updateModel}${id}`,
            data
        )

        return response.data.data
    }

    static async delete(id: number): Promise<void> {
        await api.delete(endpoints.deleteModel + `${id}`)
    }
}
