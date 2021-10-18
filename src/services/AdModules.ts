import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { AdModule as AdModuleType } from '../types'
import { AdMaterials as AdMaterialsService } from './AdMaterials'

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
    companyId?: number
}

type GetListResponse = {
    baseUrl: string
    data: Array<AdModuleType>
}

type GetItemResponse = {
    baseUrl: string
    data: AdModuleType
}

type CreateParams = {
    adMaterialId: number
    name: string
    automatId: number
    numberOfShowing: number
    timeOfShowing: string
}

type CreateResponse = {
    baseUrl: string
    data: AdModuleType
}

type UpdateParams = {
    adMaterialId?: number
    name?: string
    automatId?: number
    numberOfShowing?: number
    timeOfShowing?: string
}

type UpdateResponse = {
    baseUrl: string
    data: AdModuleType
}

export class AdModules {
    static async getList(
        params: GetListParams = {}
    ): Promise<Array<AdModuleType>> {
        /*return [
            {
                id: 1,
                adMaterialId: 1,
                adMaterial: {
                    id: 1,
                    name: 'Рекламный материал',
                    photoPath:
                        'http://www.ladis-tour.ru/sites/default/files/Dializ_v_Batumi/islandia_5_1.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 2,
                adMaterialId: 2,
                adMaterial: {
                    id: 2,
                    name: 'Рекламный материал ДЛинное предлинное название и Еще длиннее',
                    photoPath:
                        'https://i.pinimg.com/736x/7a/f9/da/7af9da54715dff99fab8da030618b70a--places-to-go-small-places.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 3,
                adMaterialId: 3,
                adMaterial: {
                    id: 3,
                    name: 'Рекламный материал',
                    photoPath:
                        'http://top5-top10.ru/wp-content/uploads/2018/04/%D0%98%D1%81%D0%BB%D0%B0%D0%BD%D0%B4%D0%B8%D1%8F-1148.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 4,
                adMaterialId: 4,
                adMaterial: {
                    id: 4,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://puzzleit.ru/files/puzzles/186/186468/_original.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 5,
                adMaterialId: 5,
                adMaterial: {
                    id: 5,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://travel-or-die.ru/wp-content/uploads/2016/11/rejkyavik-iz-moskvy-avia-e1477991523290.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 6,
                adMaterialId: 6,
                adMaterial: {
                    id: 6,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://cdn.fishki.net/upload/post/2020/02/24/3238452/fddb5164db10475fc14a6ef173ea3687.png',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 7,
                adMaterialId: 7,
                adMaterial: {
                    id: 7,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://avatars.mds.yandex.net/get-zen_doc/3894718/pub_60a2bcdd97f53c0af0b1d479_60a2bd4e39dbb95f731edb63/scale_1200',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 8,
                adMaterialId: 8,
                adMaterial: {
                    id: 8,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://www.putivodi.ru/upload/medialibrary/824/%D0%98%D1%81%D0%BB%D0%B0%D0%BD%D0%B4%D0%B8%D1%8F.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 9,
                adMaterialId: 9,
                adMaterial: {
                    id: 9,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://cdn.fishki.net/upload/post/2019/04/25/2958198/34d668cae23d0487aa83ea95d55cb676.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 10,
                adMaterialId: 10,
                adMaterial: {
                    id: 10,
                    name: 'Рекламный материал',
                    photoPath:
                        'http://www.ladis-tour.ru/sites/default/files/Dializ_v_Batumi/islandia_5_1.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 11,
                adMaterialId: 11,
                adMaterial: {
                    id: 11,
                    name: 'Рекламный материал',
                    photoPath:
                        'http://u20.plpstatic.ru/b51a569d1221f93c5e9fe15eb127e430/b3fb991cb55931c60d44ded26227b53e.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
            {
                id: 12,
                adMaterialId: 12,
                adMaterial: {
                    id: 12,
                    name: 'Рекламный материал',
                    photoPath:
                        'https://top10a.ru/wp-content/uploads/2020/01/iwsfp0yhi-scaled.jpg',
                },
                name: 'Рекламный модуль',
                automatId: 1,
                numberOfShowing: 10,
                timeOfShowing: '10,11',
            },
        ]*/

        const { search, limit, offset, companyId } = params

        const queries = [`offset=${offset}`, `limit=${limit}`]

        if (search) {
            queries.push(`search=${search}`)
        }

        if (companyId) {
            queries.push(`companyId=${companyId}`)
        }

        const endpoint = endpoints.getAdModules + '?' + queries.join('&')

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data.map((am) =>
            AdModules._prepareAdModule(am, response.data.baseUrl)
        )
    }

    static async getItem(id: number): Promise<AdModuleType> {
        const response = await api.get<GetItemResponse>(
            route(endpoints.getAdModule, { id })
        )

        return AdModules._prepareAdModule(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async create(params: CreateParams): Promise<AdModuleType> {
        const response = await api.post<CreateResponse>(
            endpoints.createAdModule,
            params
        )

        return AdModules._prepareAdModule(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async update(
        id: number,
        params: UpdateParams
    ): Promise<AdModuleType> {
        const response = await api.post<UpdateResponse>(
            route(endpoints.updateAdModule, { id }),
            params
        )

        return AdModules._prepareAdModule(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteAdModule, { id }))
    }

    static _prepareAdModule(
        material: AdModuleType,
        baseUrl: string
    ): AdModuleType {
        return {
            ...material,
            adMaterial: AdMaterialsService._prepareAdMaterial(
                material.adMaterial,
                baseUrl
            ),
        }
    }
}
