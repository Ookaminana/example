import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { Brand as BrandType } from '../types'

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

type GetListResponse = {
    data: Array<BrandType>
}

type CreateBrandParams = {
    mediaKey: string
    name: string
}

type CreateBrandResponse = {
    data: BrandType
}

type UpdateBrandParams = {
    mediaKey?: string
    name?: string
}

type UpdateBrandResponse = {
    data: BrandType
}

export class Brands {
    static async getList(
        params: GetListParams = {}
    ): Promise<Array<BrandType>> {
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

        let endpoint = endpoints.getBrandList
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data

        // return [
        //     {
        //         id: 1,
        //         name: 'Название бренда 1',
        //         mediaKey: 'Brand1',
        //     },
        //     {
        //         id: 2,
        //         name: 'Название бренда 2',
        //         mediaKey: 'Brand2',
        //     },
        //     {
        //         id: 3,
        //         name: 'Название бренда 3',
        //         mediaKey: 'Brand3',
        //     },
        //     {
        //         id: 4,
        //         name: 'Название бренда 4',
        //         mediaKey: 'Brand4',
        //     },
        // ]
    }

    static async create(params: CreateBrandParams): Promise<BrandType> {
        const { mediaKey, name } = params

        const data = {
            mediaKey,
            name,
        }

        const response = await api.post<CreateBrandResponse>(
            endpoints.createBrand,
            data
        )

        return response.data.data
    }

    static async update(
        id: number,
        params: UpdateBrandParams
    ): Promise<BrandType> {
        const { mediaKey, name } = params

        const data = {
            mediaKey,
            name,
        }

        const response = await api.post<UpdateBrandResponse>(
            route(endpoints.updateBrand, { id }),
            data
        )
        return response.data.data
    }

    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteBrand, { id }))
    }
}
