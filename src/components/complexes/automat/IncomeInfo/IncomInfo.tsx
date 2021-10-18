import React, { FC } from 'react'
import { SubHeader } from '../SubHeader'
import styles from './IncomeInfo.module.scss'

const IncomeInfo: FC = () => {
    return (
        <div className={styles.root}>
            <SubHeader>Информация о выручке</SubHeader>

            <div className={styles.content}>
                <div className={styles.block}>
                    <div className={styles.blockTitle}>За сутки</div>
                    <div className={styles.blockValue}>600</div>
                </div>

                <div className={styles.block}>
                    <div className={styles.blockTitle}>За последнюю неделю</div>
                    <div className={styles.blockValue}>4590</div>
                </div>

                <div className={styles.block}>
                    <div className={styles.blockTitle}>За последний месяц</div>
                    <div className={styles.blockValue}>29180</div>
                </div>
            </div>
        </div>
    )
}

export default IncomeInfo
