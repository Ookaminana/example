import React, { FC, memo } from 'react'
import styles from './WrapperBlockWithDelete.module.scss'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/deleteDisable.svg'

type Props = {
    title: string
    showDeleteButton?: boolean
    onClick?: () => void
    deleteLabel?: string
}
/**
 *
 * @param title
 * @param onClick
 * @param deleteLabel
 */

const WrapperBlockWithDelete: FC<Props> = ({
    title,
    showDeleteButton = false,
    onClick,
    deleteLabel,
}) => {
    return (
        <div className={styles.root}>
            <h4 className={styles.title}>{title}</h4>

            {showDeleteButton && (
                <div onClick={onClick} className={styles.deleteBlock}>
                    <DeleteIcon className={styles.icon} />
                    <span className={styles.deleteLabel}>{deleteLabel}</span>
                </div>
            )}
        </div>
    )
}

export default memo(WrapperBlockWithDelete)
