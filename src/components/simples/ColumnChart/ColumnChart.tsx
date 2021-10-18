import React, { FC } from 'react'
import Chart from 'react-apexcharts'
import styles from './ColumnChart.module.scss'

type Props = {
    data: Array<{
        label: string
        value: number
    }>
}

const ColumnChart: FC<Props> = ({ data }) => {
    const options = {
        colors: ['#66b32e'],
        xaxis: {
            categories: data.map((d) => d.label),
            labels: {
                style: {
                    colors: data.map((d) => '#868686'),
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                },
            },
            axisBorder: {
                color: '#868686',
                offsetY: 5,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: ['#868686'],
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                },
            },
            axisBorder: {
                show: true,
                color: '#868686',
                offsetY: 4,
            },
        },
        grid: {
            show: false,
        },

        plotOptions: {
            bar: {
                borderRadius: 6,
            },
        },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            enabled: false,
        },
        chart: {
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
            height: '100%',
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
            active: {
                filter: {
                    type: 'none',
                },
            },
        },
    }

    const series = [
        {
            data: data.map((d) => d.value),
        },
    ]

    return (
        <div className={styles.root}>
            <Chart
                options={options}
                series={series}
                type={'bar'}
                height={'100%'}
            />
        </div>
    )
}

export default ColumnChart
