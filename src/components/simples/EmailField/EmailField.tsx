import React, { FC } from 'react'
import { TextField, Props as TextFieldProps } from '../TextField'
import styles from './EmailField.module.scss'
import { ReactComponent as Envelope } from '../../../assets/icons/envelope.svg'

export type Props = TextFieldProps

/**
 * Компонент Input
 */
const EmailField: FC<Props> = ({ ...rest }) => {
    return (
        <div className={styles.root}>
            <TextField {...rest} />
            <div className={styles.envelope}>
                <Envelope />
            </div>
        </div>
    )
}

export default EmailField
