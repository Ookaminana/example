import React, { FC, useMemo, useState } from 'react'
import { AutomatType } from '../../../../types'
import { useAppSelector } from '../../../hooks/store'
import { selectModels, selectTastes } from '../../../../store/slices/storage'
import { Container } from './Container'
import { Button } from '../../../simples/Button'
import styles from './RefillAppSettings.module.scss'

const containers = [
    {
        number: 1,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 2,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 3,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 4,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 5,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 6,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 7,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 8,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 9,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 10,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 11,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
    {
        number: 12,
        tasteName: 'Протеин Maxler Golden Whey Черничный маффин',
        fullness: 40,
        value: 17759,
    },
]

type Props = {
    automat: AutomatType
    onSend: (containers: Array<number>) => void
}

const RefillAppSettings: FC<Props> = ({ automat, onSend }) => {
    const [refilled, setRefilled] = useState<Array<number>>([])

    const changeRefilled = (containerNumber: number, skip: boolean) => {
        if (skip) {
            setRefilled(refilled.filter((cn) => cn != containerNumber))
        } else {
            setRefilled([...refilled, containerNumber])
        }
    }

    const send = async () => {
        await onSend(refilled)
    }

    const models = useAppSelector(selectModels)
    const tastes = useAppSelector(selectTastes)

    const currentModel = models.find((m) => m.id === automat.automatModelId)

    return (
        <div className={styles.root}>
            {currentModel && (
                <div className={styles.containersList}>
                    {currentModel.containers.map((container) => {
                        const automatContainer = automat.containers.find(
                            (ac) => ac.automatModelContainerId === container.id
                        )
                        const taste = automatContainer
                            ? tastes.find(
                                  (t) => t.id === automatContainer.tasteId
                              )
                            : undefined

                        const volume = container.volume || 0
                        const remainsVolume = automatContainer
                            ? automatContainer.remainsVolume || 0
                            : 0
                        const fullness =
                            volume > 0 ? (remainsVolume / volume) * 100 : 0

                        return (
                            <div
                                className={styles.containersItem}
                                key={container.number}
                            >
                                <Container
                                    tasteName={taste ? taste.name : ''}
                                    fullness={fullness}
                                    value={remainsVolume}
                                    skip={
                                        refilled.indexOf(container.number) ===
                                        -1
                                    }
                                    onSkipChange={(skip) =>
                                        changeRefilled(container.number, skip)
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            )}

            <div className={styles.buttons}>
                <Button onClick={send}>Отправить заявку</Button>
            </div>
        </div>
    )
}

export default RefillAppSettings
