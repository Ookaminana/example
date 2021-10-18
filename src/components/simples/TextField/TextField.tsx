import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './TextField.module.scss'

export enum TextFieldStatus {
    Normal,
    Success,
    Error,
}

export type Props = InputHTMLAttributes<HTMLInputElement> & {
    status?: TextFieldStatus
    note?: string
    deleteIcon?: boolean
    classes?: {
        root?: string
        input?: string
        note?: string
    }
    label?: string
}

/**
 * Компонент Input
 */
const TextField: FC<Props> = ({
    status = TextFieldStatus.Normal,
    note = '',
    deleteIcon = false,
    classes = {},
    label,
    ...rest
}) => {
    return (
        <div
            className={classNames(styles.root, classes.root, {
                [styles.success]: status === TextFieldStatus.Success,
                [styles.error]: status === TextFieldStatus.Error,
            })}
        >
            {label && <div className={styles.label}>{label}</div>}
            <input
                className={classNames(styles.input, classes.input)}
                {...rest}
            />
            {note && (
                <div className={classNames(styles.note, classes.note)}>
                    {note}
                </div>
            )}
        </div>
    )
}

export default TextField
