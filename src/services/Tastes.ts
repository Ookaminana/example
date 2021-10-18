import api from '../utils/api'
import { endpoints } from '../constants'
import { TasteType } from '../types'
import { route } from '../utils/route'

type TasteParamType = {
    search?: string
    productId?: number
    offset?: number
    limit?: number
}

type GetTasteResponse = {
    data: Array<TasteType>
}

type CreateTasteParams = {
    name: string
    productId: number
    color: string
    componentOnAmount: number
    mediaKey: string
    components: Array<{
        name: string
        amount: number
        measurementUnit: string
    }>
    baseDosages: Array<{
        drinkVolume: number
        water: number
        product: number
        conversionFactor: number
    }>
}
type CreateTasteResponse = {
    data: TasteType
}

type UpdateTasteParams = {
    name: string
    productId: number
    color: string
    componentOnAmount: number
    mediaKey: string
    components: Array<{
        id?: number
        name: string
        amount: number
        measurementUnit: string
    }>
    baseDosages: Array<{
        id?: number
        drinkVolume: number
        water: number
        product: number
        conversionFactor: number
    }>
}

type UpdateTasteResponse = {
    data: TasteType
}

export class TasteService {
    static async getTastes(params: TasteParamType): Promise<Array<TasteType>> {
        const { search = '', offset = 0, limit = 30, productId } = params

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
        if (productId) {
            queries.push(`productId=${productId}`)
        }

        let endpoint = endpoints.getTastes
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetTasteResponse>(endpoint)

        return response.data.data
    }

    static async creteTaste(data: CreateTasteParams): Promise<TasteType> {
        const response = await api.post<CreateTasteResponse>(
            endpoints.createTaste,
            {
                ...data,
                baseDosages: JSON.stringify(data.baseDosages),
                components: JSON.stringify(data.components),
            }
        )
        return response.data.data
    }

    static async updateTaste(
        id: number,
        data: UpdateTasteParams
    ): Promise<TasteType> {
        const response = await api.post<UpdateTasteResponse>(
            route(endpoints.updateTaste, { id }),
            {
                ...data,
                baseDosages: JSON.stringify(data.baseDosages),
                components: JSON.stringify(data.components),
            }
        )
        return response.data.data
    }

    static async deleteTaste(id: number) {
        await api.delete<CreateTasteResponse>(
            route(endpoints.deleteTaste, { id })
        )
    }
}
