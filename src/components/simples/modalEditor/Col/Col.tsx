import classNames from 'classnames'
import React, { FC } from 'react'

import styles from './Col.module.scss'

type Props = {
    css?: string
    width?:
        | 'full'
        | 'half'
        | 'quater'
        | 'third'
        | 'two-third'
        | 'three-quater'
        | 'forth-fith'
        | 'one-fith'
}

const Col: FC<Props> = ({ children, css, width = 4 }) => {
    const w =
        width === 'half'
            ? 50
            : width === 'two-third'
            ? 60
            : width === 'full'
            ? 100
            : width === 'quater'
            ? 25
            : width === 'third'
            ? 40
            : width === 'three-quater'
            ? 75
            : width === 'forth-fith'
            ? 80
            : width === 'one-fith'
            ? 20
            : 100
    return (
        <div
            style={{
                maxWidth: w + '%',
            }}
            className={classNames(styles.col, css)}
        >
            {children}
        </div>
    )
}

export default Col
