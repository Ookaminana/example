import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './H.module.scss'

type Props = {
    level: number
}

const H: FC<Props> = ({ level, children }) => {
    return (
        <div className={classNames(styles.h, styles[`level${level}`])}>
            {children}
        </div>
    )
}

export default H
