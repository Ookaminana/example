import React, { FC, useState } from 'react'
import { User as UserType, UserGroups, UserPermissions } from '../../../types'
import { User as UserService } from '../../../services/User'
import { useAppSelector } from '../../hooks/store'
import { selectAuthUser } from '../../../store/slices/auth'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { TextField } from '../../simples/TextField'
import { PermissionsForm } from '../PermissionsForm'

type Props = {
    companyId?: number
    onCancel: () => void
    onInvite: (user: UserType) => void
}

const UserInviter: FC<Props> = ({ companyId, onCancel, onInvite }) => {
    const user = useAppSelector(selectAuthUser)

    const [email, setEmail] = useState('')
    const [permissions, setPermissions] = useState<UserPermissions>()
    const [loading, setLoading] = useState(false)

    const invite = async () => {
        if (!user) {
            throw new Error('User is not logged in')
        }

        if (!email || !permissions) {
            throw new Error('The form is not completed')
        }

        setLoading(true)
        const invitedUser = await UserService.invite({
            email: email,
            companyId: companyId || user.company.id,
            group: permissions.group,
            automats:
                permissions.group === UserGroups.Employer
                    ? permissions.automats
                    : undefined,
            outlets:
                permissions.group === UserGroups.Club ||
                permissions.group === UserGroups.Service
                    ? permissions.outlets
                    : undefined,
        })
        setLoading(false)

        onInvite(invitedUser)
    }

    return (
        <Editor
            header={'Пригласить пользователя'}
            onCancel={onCancel}
            submitLoading={loading}
            submitDisabled={!email || !permissions}
            submitButtonName={'Пригласить'}
            onSubmit={invite}
        >
            <Row>
                <Col>
                    <TextField
                        placeholder={'Электронная почта'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Col>
            </Row>

            <PermissionsForm
                permissions={permissions}
                onChange={setPermissions}
            />
        </Editor>
    )
}

export default UserInviter
