import React, { FC } from 'react'
import { Tabs } from '../../../simples/Tabs'
import styles from './AutomatTabs.module.scss'
import { route } from '../../../../utils/route'
import { routes } from '../../../../config'

type Props = {
    automatId: number
}

const AutomatTabs: FC<Props> = ({ automatId }) => {
    const tabs = [
        { label: 'Главная', url: route(routes.automatMain, { id: automatId }) },
        {
            label: 'Пополнение',
            url: route(routes.automatRefill, { id: automatId }),
        },
        {
            label: 'Продажи',
            url: route(routes.automatOrders, { id: automatId }),
        },
        {
            label: 'Фискализация',
            url: route(routes.automatFiscalization, { id: automatId }),
        },
        {
            label: 'Настройки',
            url: route(routes.automatSettings, { id: automatId }),
        },
    ]

    return (
        <div className={styles.automatTabs}>
            <Tabs items={tabs} />
        </div>
    )
}

export default AutomatTabs
