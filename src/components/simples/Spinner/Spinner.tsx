import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './Spinner.module.scss'

type Props = {
    rootClassName?: string
}

const Spinner: FC<Props> = ({ rootClassName }) => {
    return (
        <div className={classNames(styles.root, rootClassName)}>
            <span />
            <span />
            <span />
        </div>
    )
}

export default Spinner
