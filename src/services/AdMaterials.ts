import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { AdMaterial } from '../types'

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

type GetListResponse = {
    baseUrl: string
    data: Array<AdMaterial>
}

type GetItemResponse = {
    baseUrl: string
    data: AdMaterial
}

type CreateParams = {
    name: string
}

type CreateResponse = {
    baseUrl: string
    data: AdMaterial
}

type UpdateParams = {
    name?: string
}

type UpdateResponse = {
    baseUrl: string
    data: AdMaterial
}

type UploadPhotoResponse = {
    baseUrl: string
    data: AdMaterial
}

export class AdMaterials {
    static async getList(params: GetListParams = {}) {
        const { search, offset = 0, limit = 30 } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (search) {
            queries.push(`search=${search}`)
        }

        const endpoint = endpoints.getAdMaterials + '?' + queries.join('&')

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data.map((adMaterial) =>
            AdMaterials._prepareAdMaterial(adMaterial, response.data.baseUrl)
        )
    }

    static async getItem(id: number): Promise<AdMaterial> {
        const response = await api.get<GetItemResponse>(
            route(endpoints.getAdMaterial, { id })
        )

        return AdMaterials._prepareAdMaterial(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async create(params: CreateParams): Promise<AdMaterial> {
        const response = await api.post<CreateResponse>(
            endpoints.createAdMaterial,
            params
        )

        return AdMaterials._prepareAdMaterial(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async update(id: number, params: UpdateParams): Promise<AdMaterial> {
        const response = await api.post<UpdateResponse>(
            route(endpoints.updateAdMaterial, { id }),
            params
        )

        return AdMaterials._prepareAdMaterial(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async uploadPhoto(id: number, photo: File): Promise<AdMaterial> {
        const data = new FormData()
        data.set('photo', photo)

        const response = await api.post<UploadPhotoResponse>(
            route(endpoints.uploadAdMaterialPhoto, { id }),
            data
        )

        return AdMaterials._prepareAdMaterial(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteAdMaterial, { id }))
    }

    static _prepareAdMaterial(
        adMaterial: AdMaterial,
        baseUrl: string
    ): AdMaterial {
        return {
            ...adMaterial,
            photoPath: adMaterial.photoPath
                ? baseUrl + adMaterial.photoPath
                : null,
        }
    }
}
