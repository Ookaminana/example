import React, { FC } from 'react'
import { SkipSelect } from './SkipSelect'
import styles from './RefillAppSettings.module.scss'

type Props = {
    tasteName: string
    fullness: number
    value: number
    skip: boolean
    onSkipChange: (skip: boolean) => void
}

export const Container: FC<Props> = ({
    tasteName,
    fullness,
    value,
    skip,
    onSkipChange,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.containerTasteName}>{tasteName}</div>

            <div className={styles.containerBody}>
                <div className={styles.containerScale}>
                    <div
                        className={styles.containerScaleIndicator}
                        style={{ width: `${fullness}%` }}
                    />
                    <div className={styles.containerScaleValue}>{value}</div>
                </div>

                <div className={styles.containerSkipSelectWrap}>
                    <SkipSelect skip={skip} onChange={onSkipChange} />
                </div>
            </div>
        </div>
    )
}
