import React, { FC } from 'react'
import moment from 'moment'
import { getLogLevelName } from '../../../../utils/helpers'
import { AutomatLog } from '../../../../types'
import styles from './Logs.module.scss'

type Props = {
    log: AutomatLog
}

export const LogItem: FC<Props> = ({ log }) => {
    return (
        <div className={styles.logItem}>
            <div className={styles.logItemLeft}>
                <div className={styles.logItemLevel}>
                    {getLogLevelName(log.level)}
                </div>
            </div>

            <div className={styles.logItemRight}>
                <div className={styles.logItemTime}>
                    {moment(log.timeAt).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className={styles.logItemMessage}>{log.message}</div>
            </div>
        </div>
    )
}
