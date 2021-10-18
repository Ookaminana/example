import React, { FC } from 'react'
import { AuthLayout } from '../../complexes/AuthLayout'
import { RegistrationForm } from '../../complexes/RegistrationForm'

const Registration: FC = () => {
    return (
        <AuthLayout>
            <RegistrationForm />
        </AuthLayout>
    )
}

export default Registration
