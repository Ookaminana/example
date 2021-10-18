import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import styles from './TextDeleteField.module.scss'

export enum TextDeleteFieldStatus {
    Normal,
    Success,
    Error,
}

export type Props = InputHTMLAttributes<HTMLInputElement> & {
    status?: TextDeleteFieldStatus
    note?: string
    deleteIcon?: boolean
    onDelete: () => void
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
const TextDeleteField: FC<Props> = ({
    status = TextDeleteFieldStatus.Normal,
    note = '',
    deleteIcon = false,
    onDelete,
    classes = {},
    label,
    ...rest
}) => {
    return (
        <div
            className={classNames(styles.root, classes.root, {
                [styles.success]: status === TextDeleteFieldStatus.Success,
                [styles.error]: status === TextDeleteFieldStatus.Error,
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
            {deleteIcon && (
                <div className={styles.icon} onClick={onDelete}>
                    <DeleteIcon />
                </div>
            )}
        </div>
    )
}

export default TextDeleteField
