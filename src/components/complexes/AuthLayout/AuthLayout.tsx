import React, { FC } from 'react'
import styles from './AuthLayout.module.scss'
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg'

const AuthLayout: FC = ({ children }) => {
    return (
        <div className={styles.main}>
            <div className={styles.leftContainer}>{children}</div>

            <div className={styles.rightContainer}>
                <Logo />
            </div>
        </div>
    )
}

export default AuthLayout
