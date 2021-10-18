import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { ColumnChart } from '../../../simples/ColumnChart'
import styles from './OrdersChart.module.scss'
import moment from 'moment'
import { Dashboard as DashboardService } from '../../../../services/Dashboard'

const prepareSchedule = (
    data: Array<{ day: string; income: number }>,
    days: number
) => {
    const newData: Array<{ day: string; income: number }> = []

    for (let i = days - 1; i >= 0; i--) {
        let day = moment().subtract(i, 'days').format('DD.MM')

        const dayData = data.find((d) => d.day === day)
        const income = dayData ? dayData.income : 0

        newData.push({ day, income })
    }

    return newData
}

enum Periods {
    Today,
    SevenDays,
    ThirtyDays,
}

type Props = {
    automatId: number
}

const OrdersChart: FC<Props> = ({ automatId }) => {
    const [data, setData] = useState<Array<{ day: string; income: number }>>([])
    const [period, setPeriod] = useState(Periods.ThirtyDays)
    const [loading, setLoading] = useState(false)
    const [incomeToday, setIncomeToday] = useState(0)
    const [incomeSevenDays, setIncomeSevenDays] = useState(0)
    const [incomeThirtyDays, setIncomeThirtyDays] = useState(0)

    const load = async (days: number) => {
        const end = moment().startOf('day').toDate() // .add(1, "days")
        const start =
            days > 1
                ? moment()
                      .subtract(days - 1, 'days')
                      .startOf('day')
                      .toDate()
                : moment().startOf('day').toDate()

        setLoading(true)
        const result = await DashboardService.getSalesSchedule({
            automatId,
            start,
            end,
        })
        setLoading(false)

        setData(prepareSchedule(result.data, days))
        setIncomeToday(result.income.today)
        setIncomeSevenDays(result.income.sevenDays)
        setIncomeThirtyDays(result.income.thirtyDays)

        return result.data
    }

    useEffect(() => {
        getThirtyDays().then()
    }, [])

    const getToday = async () => {
        setPeriod(Periods.Today)
        await load(1)
    }

    const getSevenDays = async () => {
        setPeriod(Periods.SevenDays)
        await load(7)
    }

    const getThirtyDays = async () => {
        setPeriod(Periods.ThirtyDays)
        await load(30)
    }

    return (
        <div className={styles.root}>
            <div className={styles.chart}>
                <div className={styles.switcher}>
                    <button
                        className={classNames(styles.switcherButton, {
                            [styles.active]: period === Periods.Today,
                        })}
                        onClick={getToday}
                    >
                        За сегодня
                    </button>
                    <button
                        className={classNames(styles.switcherButton, {
                            [styles.active]: period === Periods.SevenDays,
                        })}
                        onClick={getSevenDays}
                    >
                        За 7 дней
                    </button>
                    <button
                        className={classNames(styles.switcherButton, {
                            [styles.active]: period === Periods.ThirtyDays,
                        })}
                        onClick={getThirtyDays}
                    >
                        За 30 дней
                    </button>
                </div>

                <div
                    className={classNames(styles.chartContainer, {
                        [styles.loading]: loading,
                    })}
                >
                    <ColumnChart
                        data={data.map((d) => ({
                            label: d.day,
                            value: d.income,
                        }))}
                    />

                    <div className={styles.chartLoader}>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Временной промежуток</th>
                            <th>Сумма выручки в рублях</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>За сегодня</td>
                            <td>{incomeToday}</td>
                        </tr>
                        <tr>
                            <td>За 7 дней</td>
                            <td>{incomeSevenDays}</td>
                        </tr>
                        <tr>
                            <td>За 30 дней</td>
                            <td>{incomeThirtyDays}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersChart
