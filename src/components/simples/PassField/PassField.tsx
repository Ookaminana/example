import React, { FC, useState } from 'react'
import { TextField, Props as TextFieldProps } from '../TextField'
import styles from './PassField.module.scss'
import { ReactComponent as Eye } from '../../../assets/icons/eye.svg'
import { ReactComponent as EyeClose } from '../../../assets/icons/eye-close.svg'

export type Props = TextFieldProps

/**
 * Компонент Input
 */
const PassField: FC<Props> = ({ ...rest }) => {
    const [isShowPass, setShowPass] = useState<boolean>(true)

    return (
        <div className={styles.root}>
            <TextField type={isShowPass ? 'password' : 'text'} {...rest} />

            <div
                className={styles.pass}
                onClick={() => setShowPass(!isShowPass)}
            >
                {isShowPass ? <Eye /> : <EyeClose />}
            </div>
        </div>
    )
}

export default PassField
