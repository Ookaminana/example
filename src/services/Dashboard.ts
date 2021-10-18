import moment from 'moment'
import api from '../utils/api'
import _ from 'lodash'
import { endpoints } from '../constants'
import { DashboardData, NewsType } from '../types'

type GetSalesScheduleParams = {
    automatId?: number
    start?: Date
    end?: Date
}

type GetSalesScheduleResponse = {
    data: Array<{ day: string; income: number }>
    income: {
        today: number
        sevenDays: number
        thirtyDays: number
    }
}

type GetSalesScheduleResult = GetSalesScheduleResponse

type GetDataResponse = {
    baseUrl: string
    data: DashboardData
}

export class Dashboard {
    static async getSalesSchedule(
        params: GetSalesScheduleParams = {}
    ): Promise<GetSalesScheduleResult> {
        const { automatId, start, end } = params

        const queries: Array<string> = []

        if (automatId) {
            queries.push(`automatId=${automatId}`)
        }
        if (start) {
            queries.push(`start=${moment(start).format('YYYY-MM-DD')}`)
        }
        if (end) {
            queries.push(`end=${moment(end).format('YYYY-MM-DD')}`)
        }

        let endpoint = endpoints.getSalesSchedule
        if (queries.length > 0) {
            endpoint += '?' + queries.join('&')
        }

        const result = await api.get<GetSalesScheduleResponse>(endpoint)

        return result.data
    }

    static async getData(): Promise<DashboardData> {
        const response = await api.get<GetDataResponse>(
            endpoints.getDashboardData
        )

        const data = response.data.data
        return {
            ...data,
            news: _.isArray(data.news)
                ? data.news.map((newsItem) =>
                      Dashboard._prepareNews(newsItem, response.data.baseUrl)
                  )
                : undefined,
        }
    }

    static _prepareNews(newsItem: NewsType, baseUrl: string): NewsType {
        return {
            ...newsItem,
            photoPath: newsItem.photoPath ? baseUrl + newsItem.photoPath : null,
        }
    }
}
