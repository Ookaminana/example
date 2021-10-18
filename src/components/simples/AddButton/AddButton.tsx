import React, { FC, memo } from 'react'
import styles from './AddButton.module.scss'

type Props = {
    label: string
    onClick?: () => void
    positionLabel?: 'left' | 'center'
}

/**
 *
 * @param label
 * @param onClick
 * @param positionLabel
 * @returns
 */

const AddButton: FC<Props> = ({ label, onClick, positionLabel = 'left' }) => {
    return (
        <div onClick={onClick} className={styles.root}>
            <div
                style={{
                    textAlign: positionLabel,
                }}
                className={styles.label}
            >
                {label}
            </div>
        </div>
    )
}

export default memo(AddButton)
