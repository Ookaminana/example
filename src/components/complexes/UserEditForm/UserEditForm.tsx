import React, { FC, FormEvent, useState } from 'react'
import { UserPermissions } from '../../../types'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { TextField } from '../../simples/TextField'
import { Button, ButtonKind } from '../../simples/Button'
import { ProfilePhotoUploader } from '../ProfilePhotoUploader'
import { ContactsFields, FormContact } from '../ContactsFields'
import { PermissionsForm } from '../PermissionsForm'

import styles from './UserEditForm.module.scss'

export type SourceDataForm = {
    name: string
    photo: string
    // ownerId?: number
    contacts: Array<FormContact>
    permissions?: UserPermissions
}

const initDataForm: SourceDataForm = {
    name: '',
    photo: '',
    contacts: [],
}

export type ResultDataForm = {
    name: string
    photo?: File
    ownerId?: number
    contacts: Array<FormContact>
    permissions?: UserPermissions
}

type Props = {
    data?: SourceDataForm
    loading?: boolean
    onSave: (company: ResultDataForm, deletePhoto?: boolean) => void
    onCancel: () => void
    showPermissionsFields?: boolean
}

const UserEditForm: FC<Props> = ({
    data = initDataForm,
    loading,
    onSave,
    onCancel,
    showPermissionsFields = false,
}) => {
    const [userCurrent, setUserCurrent] = useState<SourceDataForm>(data)
    const [photo, setPhoto] = useState<File>()
    const [deletePhoto, setDeletePhoto] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSave(
            {
                ...userCurrent,
                photo: photo,
            },
            !photo && deletePhoto
        )
    }

    const handlePermissionsChange = (permissions?: UserPermissions) => {
        setUserCurrent({
            ...userCurrent,
            permissions,
        })
    }

    const handlePhotoDelete = () => {
        setPhoto(undefined)
        setDeletePhoto(true)
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <ProfilePhotoUploader
                    defaultPhoto={data.photo}
                    onFileSelect={setPhoto}
                    onDeletePhoto={handlePhotoDelete}
                />

                <div className={styles.info}>
                    <div className={styles.h}>Контактная информация</div>
                    <Row>
                        <Col>
                            <TextField
                                value={userCurrent.name || ''}
                                onChange={(e) => {
                                    setUserCurrent({
                                        ...userCurrent,
                                        name: e.target.value,
                                    })
                                }}
                                placeholder={'ФИО'}
                            />
                        </Col>
                    </Row>

                    <ContactsFields
                        contacts={userCurrent.contacts}
                        onChange={(contacts) => {
                            setUserCurrent({
                                ...userCurrent,
                                contacts: contacts,
                            })
                        }}
                    />
                </div>

                {showPermissionsFields && (
                    <div className={styles.info}>
                        <PermissionsForm
                            permissions={userCurrent.permissions}
                            onChange={handlePermissionsChange}
                        />
                    </div>
                )}

                <div className={styles.action}>
                    <Button
                        classNames={{
                            contain: styles.link,
                        }}
                        kind={ButtonKind.Link}
                        onClick={onCancel}
                    >
                        Отмена
                    </Button>
                    <Button type={'submit'} loading={loading}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserEditForm
