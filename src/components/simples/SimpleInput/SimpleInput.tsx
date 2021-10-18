import { EventType } from '@testing-library/dom'
import React, { ChangeEvent, FC, memo } from 'react'
import styles from './Divider.module.scss'

type Props = {
    value?: string
    onChange?: (e: string) => void
    placeholder?: string
}

/**
 *
 * @param title - заголовок если нужен
 * @param onChange - заголовок если нужен
 * @returns линию разделителя с Title
 */

const SimpleInput: FC<Props> = ({ value, onChange, placeholder }) => {
    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target.value
        if (onChange) {
            onChange(target)
        }
    }

    return (
        <div className={styles.root}>
            <input
                className={styles.input}
                value={value}
                onChange={onHandleChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default memo(SimpleInput)
