import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './RemainsIndicator.module.scss'

const END_THRESHOLD = 10

type Indicator = {
    name: string
    percent: number
}

type Props = {
    title: string
    indicators: Array<Indicator>
}

const RemainsIndicator: FC<Props> = ({ title, indicators }) => {
    return (
        <div className={styles.root}>
            <div className={styles.title}>{title}</div>

            <div className={styles.container}>
                <div className={styles.scalesList}>
                    {indicators.map((indicator, index) => {
                        let percent = indicator.percent

                        if (percent < 0) {
                            percent = 0
                        } else if (percent > 100) {
                            percent = 100
                        }

                        return (
                            <div className={styles.scaleWrap} key={index}>
                                <div className={styles.scale}>
                                    <div
                                        className={classNames(
                                            styles.scaleIndicator,
                                            {
                                                [styles.ends]:
                                                    percent < END_THRESHOLD,
                                            }
                                        )}
                                        style={{ height: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.namesList}>
                    <div
                        className={classNames(styles.namesListContainer, {
                            [styles.twoColumns]: indicators.length > 3,
                        })}
                    >
                        {indicators.map((indicator, index) => (
                            <div className={styles.nameItemWrap} key={index}>
                                <div
                                    className={classNames(styles.nameItem, {
                                        [styles.ends]:
                                            indicator.percent < END_THRESHOLD,
                                    })}
                                >
                                    {indicator.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemainsIndicator
