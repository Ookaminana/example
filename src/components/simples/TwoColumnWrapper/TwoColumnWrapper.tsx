import React, { FC, memo } from 'react'
import styles from './TwoColumnWrapper.module.scss'

type Props = {
    children: any
    paddingBottom?: number
    spaceBetween?: number
}

/**
 *
 * @param children - компоненты
 * @param paddingBottom - отступ снизу от ряда
 * @param spaceBetween - отступ между компонентами
 * @returns - обертку для двух компонентов
 */
const TwoColumnWrapper: FC<Props> = ({
    children,
    paddingBottom = 10,
    spaceBetween = 25,
}) => {
    return (
        <div
            style={{ paddingBottom: paddingBottom + 'px' }}
            className={styles.wrapper}
        >
            {children.length > 1 ? (
                children.map((i: any, index: number) => {
                    return (
                        <div
                            style={{
                                width: '100%',
                                marginLeft: index ? spaceBetween / 2 + 'px' : 0,
                                marginRight: !index
                                    ? spaceBetween / 2 + 'px'
                                    : 0,
                            }}
                        >
                            {i}
                        </div>
                    )
                })
            ) : (
                <div
                    style={{
                        width: '50%',
                        paddingRight: spaceBetween / 2 + 'px',
                    }}
                >
                    <div>{children}</div>
                </div>
            )}
        </div>
    )
}

export default memo(TwoColumnWrapper)
