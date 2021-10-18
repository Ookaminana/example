import React, { FC } from 'react'
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg'
import { AuthLayout } from '../../complexes/AuthLayout'
import styles from './Auth.module.scss'

import { AuthForm } from '../../complexes/AuthForm'

const Auth: FC = () => {
    return (
        <AuthLayout>
            <AuthForm />
        </AuthLayout>
    )
}

export default Auth
