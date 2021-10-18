import React, { FC, FormEvent, useState } from 'react'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { TextField } from '../../simples/TextField'
import { Button, ButtonKind } from '../../simples/Button'
import { ProfilePhotoUploader } from '../ProfilePhotoUploader'
import { ContactsFields, FormContact } from '../ContactsFields'

import styles from './CompanyEditForm.module.scss'

export type SourceDataForm = {
    name: string
    photo: string
    // ownerId?: number
    contacts: Array<FormContact>
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
}

type Props = {
    data?: SourceDataForm
    loading?: boolean
    onSave: (company: ResultDataForm) => void
    onCancel: () => void
}

const CompanyEditForm: FC<Props> = ({
    data = initDataForm,
    loading,
    onSave,
    onCancel,
}) => {
    const [companyCurrent, setCompanyCurrent] = useState<SourceDataForm>(data)
    const [photo, setPhoto] = useState<File>()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSave({
            ...companyCurrent,
            photo: photo,
        })
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <ProfilePhotoUploader
                    defaultPhoto={data.photo}
                    onFileSelect={setPhoto}
                />

                <div className={styles.info}>
                    <div className={styles.h}>Контактная информация</div>
                    <Row>
                        <Col>
                            <TextField
                                value={companyCurrent.name}
                                onChange={(e) => {
                                    setCompanyCurrent({
                                        ...companyCurrent,
                                        name: e.target.value,
                                    })
                                }}
                                placeholder={'Название организации'}
                            />
                        </Col>
                    </Row>

                    <ContactsFields
                        contacts={companyCurrent.contacts}
                        onChange={(contacts) => {
                            setCompanyCurrent({
                                ...companyCurrent,
                                contacts: contacts,
                            })
                        }}
                    />
                </div>
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
                    <Button
                        type={'submit'}
                        loading={loading}
                        disabled={!companyCurrent.name}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CompanyEditForm
