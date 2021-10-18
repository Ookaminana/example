import React, { FC, useState } from 'react'

import { Automats as AutomatsService } from '../../../../services/Automats'
import styles from './Command.module.scss'
import classNames from 'classnames'
import { Button } from '../../../simples/Button'

const runButtonClassNames = {
    button: styles.runButton,
}

type Props = {
    automatId: number
    label: string
    command: string
}

export const CommandItem: FC<Props> = ({ automatId, label, command }) => {
    const [status, setStatus] = useState('')

    const sendCommand = async () => {
        setStatus('Отправка...')

        await AutomatsService.sendCommand(automatId, command)

        setStatus('Выполнено')
    }

    return (
        <div className={styles.tr}>
            <div className={classNames(styles.td, styles.commandName)}>
                {label}
            </div>
            <div className={classNames(styles.td, styles.commandStatus)}>
                {status}
            </div>
            <div className={classNames(styles.td, styles.commandRun)}>
                <Button classNames={runButtonClassNames} onClick={sendCommand}>
                    Запуск
                </Button>
            </div>
        </div>
    )
}
