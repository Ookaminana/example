import api from '../utils/api'
import { endpoints } from '../constants'
import { route } from '../utils/route'
import { Company as CompanyType, ContactType } from '../types'

type RequestContact = {
    id?: number
    type: string
    contact: string
    confirmed: boolean
}

type GetListParams = {
    search?: string
    offset?: number
    limit?: number
}

type GetListResponse = {
    baseUrl: string
    data: Array<CompanyType>
}

type GetListOwnerResponse = {
    baseUrl: string
    data: CompanyType
}

type CreateCompanyParams = {
    name: string
    contacts: Array<RequestContact>
}

type CreateCompanyResponse = {
    baseUrl: string
    data: CompanyType
}

type UpdateMyCompanyParams = {
    name: string
    contacts: Array<RequestContact>
}

type UpdateCompanyParams = {
    name?: string
    contacts?: Array<RequestContact>
}

type UpdateCompanyResponse = {
    baseUrl: string
    data: CompanyType
}

export class Company {
    static async getList(
        params: GetListParams = {}
    ): Promise<Array<CompanyType>> {
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

        let endpoint = endpoints.getCompanies
        if (queries.length > 0) {
            endpoint += `?` + queries.join('&')
        }

        const response = await api.get<GetListResponse>(endpoint)

        return response.data.data.map((company) =>
            Company._prepareCompany(company, response.data.baseUrl)
        )
    }

    static async getMyCompany(): Promise<CompanyType> {
        let endpoint = endpoints.getMyCompany

        const response = await api.get<GetListOwnerResponse>(endpoint)

        return Company._prepareCompany(
            response.data.data,
            response.data.baseUrl
        )
    }

    //TODO getCompany for edit

    static async getCompanyItem(id: number): Promise<CompanyType> {
        let endpoint = endpoints.getCompany
        const response = await api.get<GetListOwnerResponse>(
            route(endpoint, { id })
        )
        return Company._prepareCompany(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async create(params: CreateCompanyParams): Promise<CompanyType> {
        const { name, contacts } = params

        const data = new FormData()
        data.append('name', name)

        if (contacts) {
            data.append('contacts', JSON.stringify(contacts))
        }

        const response = await api.post<CreateCompanyResponse>(
            endpoints.createCompany,
            data
        )

        return Company._prepareCompany(
            response.data.data,
            response.data.baseUrl
        )
    }

    //put
    static async updateCompany(
        id: number,
        params: UpdateCompanyParams
    ): Promise<CompanyType> {
        const { name, contacts } = params

        const data = new FormData()
        if (name) {
            data.append('name', name)
        }
        if (contacts) {
            data.append('contacts', JSON.stringify(contacts))
        }

        const response = await api.post<UpdateCompanyResponse>(
            route(endpoints.updateCompany, { id }),
            data
        )
        return Company._prepareCompany(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async updatePhoto(id: number, file: File): Promise<void> {
        const data = new FormData()
        data.append('file', file)

        const response = await api.post(
            route(endpoints.updateCompanyPhoto, { id }),
            data
        )
        return response.data.data
    }

    //Token owner
    static async updateMyCompany(
        params: UpdateMyCompanyParams
    ): Promise<CompanyType> {
        const { name, contacts } = params

        const data = new FormData()
        data.append('name', name)
        data.append('contacts', JSON.stringify(contacts))

        const response = await api.post<UpdateCompanyResponse>(
            endpoints.updateMyCompany,
            data
        )
        return Company._prepareCompany(
            response.data.data,
            response.data.baseUrl
        )
    }

    static async updateMyCompanyPhoto(file: File): Promise<void> {
        const data = new FormData()
        data.append('file', file)

        const response = await api.post(endpoints.updateMyCompanyPhoto, data)
        return response.data.data
    }

    static async delete(id: number): Promise<void> {
        await api.delete(route(endpoints.deleteCompany, { id }))
    }

    static _prepareCompany(company: CompanyType, baseUrl: string): CompanyType {
        return {
            ...company,
            photoPath: company.photoPath ? baseUrl + company.photoPath : null,
        }
    }
}
