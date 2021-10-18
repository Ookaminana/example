import api from '../utils/api'
import { endpoints } from '../constants'
import { CupType } from '../types'

type GetCupsResponse = {
    data: CupType[]
}

type GetCupsResponseData = {
    data: Array<CupType>
}

export class CupsService {
    static async getCups(): Promise<Array<CupType>> {
        const response = await api.get<GetCupsResponseData>(endpoints.getCups)
        return response.data.data
    }
}
