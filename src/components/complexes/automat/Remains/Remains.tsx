import React, { FC, useEffect, useMemo } from 'react'
import { AutomatType } from '../../../../types'
import { useAppSelector } from '../../../hooks/store'
import { selectModels } from '../../../../store/slices/storage'
import { SubHeader } from '../SubHeader'
import { RemainsIndicator } from '../../../simples/RemainsIndicator'
import { Spinner } from '../../../simples/Spinner'
import styles from './Remains.module.scss'

type Props = {
    automat?: AutomatType
}

const Remains: FC<Props> = ({ automat }) => {
    const models = useAppSelector(selectModels)

    const waterRemaining = automat ? automat.waterRemaining : 0
    const { cupsPercent, containersIndicators, loading } = useMemo(() => {
        let loading = false
        let cupsPercent = 0
        let containersIndicators: Array<{ name: string; percent: number }> = []

        if (!automat) {
            loading = true
            return { cupsPercent, containersIndicators, loading }
        }

        const currentModel = models.find((m) => m.id === automat.automatModelId)
        if (!currentModel) {
            loading = true
            return { cupsPercent, containersIndicators, loading }
        }

        // Вычисляем заполненность бункера стаканов
        const maxCups = currentModel.cups || 0
        const cups = automat.cupsRemaining || 0
        cupsPercent = maxCups > 0 ? (cups / maxCups) * 100 : 0

        // Вычисляем заполненность бункеров
        containersIndicators = currentModel.containers
            .slice()
            .sort((c1, c2) => c1.number - c2.number)
            .map((container) => {
                const volume = container.volume

                const automatContainer = automat.containers.find(
                    (ac) => ac.automatModelContainerId === container.id
                )
                const remainsVolume = automatContainer
                    ? automatContainer.remainsVolume
                    : 0

                return {
                    name: `Бункер ${container.number}`,
                    percent: (remainsVolume / volume) * 100,
                }
            })

        return { cupsPercent, containersIndicators, loading }
    }, [automat, models])

    return (
        <div className={styles.root}>
            <SubHeader>Статус остатков</SubHeader>

            {loading ? (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            ) : (
                <div className={styles.body}>
                    <div className={styles.indicatorWrap}>
                        <RemainsIndicator
                            title={'Жидкость'}
                            indicators={[
                                { name: 'Вода', percent: waterRemaining },
                            ]}
                        />
                    </div>

                    {containersIndicators.length > 0 && (
                        <div className={styles.indicatorWrap}>
                            <RemainsIndicator
                                title={'Порошок'}
                                indicators={containersIndicators}
                            />
                        </div>
                    )}

                    <div className={styles.indicatorWrap}>
                        <RemainsIndicator
                            title={'Стакан'}
                            indicators={[
                                { name: 'Туба Стаканы', percent: cupsPercent },
                            ]}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Remains
