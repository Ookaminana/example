import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import InputMask from 'react-input-mask'

import styles from './MaskField.module.scss'

export enum MaskFieldStatus {
    Normal,
    Success,
    Error,
}

export type Props = InputHTMLAttributes<HTMLInputElement> & {
    status?: MaskFieldStatus
    note?: string
    deleteIcon?: boolean
    onDelete?: () => void
    mask: string
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
const MaskField: FC<Props> = ({
    status = MaskFieldStatus.Normal,
    note = '',
    mask,
    deleteIcon = false,
    onDelete,
    classes = {},
    label,
    ...rest
}) => {
    return (
        <div
            className={classNames(styles.root, classes.root, {
                [styles.success]: status === MaskFieldStatus.Success,
                [styles.error]: status === MaskFieldStatus.Error,
            })}
        >
            {deleteIcon && (
                <div className={styles.icon} onClick={onDelete && onDelete}>
                    <DeleteIcon />
                </div>
            )}

            {label && <div className={styles.label}>{label}</div>}
            <InputMask
                mask={mask}
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

export default MaskField
