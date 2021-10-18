import api from '../utils/api'
import { endpoints, DOMAIN } from '../constants'
import { ConditionType, ProductType } from '../types'
import { route } from '../utils/route'

/**
 * Параметры запроса получения списка продуктов.
 */
type GetListParams = {
    id?: number
    search?: string
    offset?: number
    limit?: number
}

/**
 * Ответ при создании списка продуктов.
 */
type GetListResponse = {
    data: Array<ProductType>
}

/**
 * Параметры запроса создания списка продуктов.
 */
type CreateProductParams = {
    brandId: number
    name: string
    cupId?: number
    condition?: ConditionType
}

/**
 * Ответ при создании продукта.
 */
type CreateProductResponse = {
    data: ProductType
}

/**
 * Параметры запроса редактирования списка продуктов.
 */
type UpdateProductParams = {
    id: number
    logo?: File
    brand_id?: number
    name?: string
    feature?: string
    compound?: string
}

/**
 * Ответ при обновления продуктов.
 */
type UpdateProductResponse = {
    data: ProductType
}

/**
 * Сервис для работы с продуктами.
 */
export class ProductsService {
    /**
     *
     * @param params Параметры поиска
     * @returns Массив продуктов
     */
    static async getProductList(
        params: GetListParams = {}
    ): Promise<Array<ProductType>> {
        const { search = '', offset = 0, limit = 30, id } = params

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
        if (id) {
            queries.push(`id=${id}`)
        }

        let endpoint = endpoints.getProductList
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data
    }

    /**
     *
     * @param {number} id  Идентификатор проодукта
     * @returns            Массив продуктов
     */
    static async getProductItem(id: number): Promise<ProductType> {
        const endpoint = endpoints.getProductList + `?id=` + id

        const response = await api.get<GetListResponse>(endpoint)

        const products = response.data.data

        if (products.length === 0) {
            throw new Error('Product not found')
        }

        return products[0]
    }

    /**
     * Создание продукта.
     *
     * @param {ProductType} params Параметры запроса.
     * @returns             Созданный продукт
     */
    static async createProduct(params: ProductType): Promise<ProductType> {
        const response = await api.post<CreateProductResponse>(
            endpoints.createProduct,
            params
        )

        return response.data.data
    }

    /**
     * Update Product function
     * @param params Product
     * @returns Product
     */

    static async updateProduct(data: ProductType): Promise<ProductType> {
        const response = await api.put<UpdateProductResponse>(
            route(endpoints.updateProduct, { id: data.id || '' }),
            data
        )
        return response.data.data
    }

    /**
     * Delete product
     * @param id ID Producta
     */
    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteProduct, { id }))
    }
}
