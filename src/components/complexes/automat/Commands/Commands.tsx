import React, { FC } from 'react'
import classNames from 'classnames'
import { SubHeader } from '../SubHeader'
import { CommandItem } from './CommandItem'
import styles from './Command.module.scss'

type Props = {
    automatId: number
}

const Commands: FC<Props> = ({ automatId }) => {
    return (
        <div className={styles.root}>
            <SubHeader>Операции с автоматом</SubHeader>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={classNames(styles.th, styles.commandName)}>
                        Операция
                    </div>
                    <div
                        className={classNames(styles.th, styles.commandStatus)}
                    >
                        Статус
                    </div>
                    <div className={classNames(styles.th, styles.commandRun)}>
                        Действие
                    </div>
                </div>

                <div className={styles.body}>
                    <CommandItem
                        automatId={automatId}
                        label={'Остановить'}
                        command={'stop'}
                    />
                    <CommandItem
                        automatId={automatId}
                        label={'Перезагрузить'}
                        command={'restart'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Commands
