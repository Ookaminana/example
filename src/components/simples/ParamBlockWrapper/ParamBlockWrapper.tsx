import classNames from 'classnames'
import React, { FC, memo } from 'react'
import styles from './ParamBlockWrapper.module.scss'

type Props = {
    title?: string
    children: any
    classes?: {
        root?: any
        title?: any
    }
}

/**
 *
 * @param title
 * @param classes
 * @returns
 */
const ParamBlockWrapper: FC<Props> = ({ title, children, classes }) => {
    return (
        <div className={classNames(styles.wrapper, classes?.root)}>
            <h3 className={classNames(styles.title, classes?.title)}>
                {title}
            </h3>
            <div className={styles.itemsWrapper}>{children}</div>
        </div>
    )
}

export default memo(ParamBlockWrapper)
