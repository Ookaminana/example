import React, { FC, useMemo } from 'react'

import styles from './ContactsFields.module.scss'
import { Col } from '../../simples/modalEditor/Col'
import { AddButton } from '../../simples/AddButton'
import { TextDeleteField } from '../../simples/TextDeleteField'
import { Row } from '../../simples/modalEditor/Row'
import { MaskField } from '../../simples/MaskField'

export type FormContact = {
    id?: number
    type: string
    contact: string
    confirmed: boolean
}

type Props = {
    contacts: Array<FormContact>
    onChange: (contacts: Array<FormContact>) => void
}

const ContactsFields: FC<Props> = ({ contacts, onChange }) => {
    const { phoneArr, emailArr } = useMemo(() => {
        const phoneArr: Array<{ value: string; index: number }> = []
        const emailArr: Array<{ value: string; index: number }> = []

        contacts.map((item, index) => {
            if (item.type === 'phone') {
                phoneArr.push({ value: item.contact, index: index })
            } else if (item.type === 'email') {
                emailArr.push({ value: item.contact, index: index })
            }
        })
        phoneArr.push({ value: 'button', index: -1 })
        emailArr.push({ value: 'button', index: -1 })

        return { phoneArr, emailArr }
    }, [contacts])

    const handleAddPhoneClick = () => {
        onChange([
            ...contacts,
            {
                type: 'phone',
                contact: '',
                confirmed: false,
            },
        ])
    }

    const handleAddEmailClick = () => {
        onChange([
            ...contacts,
            {
                type: 'email',
                contact: '',
                confirmed: false,
            },
        ])
    }

    const handleContainerDelete = (index: number) => {
        onChange(contacts.filter((c, i) => i !== index))
    }

    return (
        <Row>
            <Col>
                {phoneArr.map((item, index) => {
                    return item.value === 'button' ? (
                        <div className={styles.field} key={`button_${index}`}>
                            <AddButton
                                label={'Добавить номер'}
                                onClick={handleAddPhoneClick}
                                positionLabel={'center'}
                            />
                        </div>
                    ) : (
                        <div className={styles.field} key={`input_${index}`}>
                            <MaskField
                                mask={'+7(999) 999-99-99'}
                                value={item.value}
                                placeholder={'Телефон'}
                                deleteIcon={true}
                                onDelete={() =>
                                    handleContainerDelete(item.index)
                                }
                                onChange={(e) => {
                                    onChange(
                                        contacts.map((contact, index) => {
                                            if (index === item.index) {
                                                return {
                                                    ...contact,
                                                    contact: e.target.value,
                                                }
                                            }

                                            return contact
                                        })
                                    )
                                }}
                            />
                        </div>
                    )
                })}
            </Col>

            <Col>
                {emailArr.map((item, index) => {
                    return item.value === 'button' ? (
                        <div className={styles.field} key={`button_${index}`}>
                            <AddButton
                                label={'Добавить электронную почту'}
                                onClick={handleAddEmailClick}
                                positionLabel={'center'}
                            />
                        </div>
                    ) : (
                        <div className={styles.field} key={`input_${index}`}>
                            <TextDeleteField
                                value={item.value}
                                placeholder={'Электронная почта'}
                                deleteIcon={true}
                                onDelete={() =>
                                    handleContainerDelete(item.index)
                                }
                                onChange={(e) => {
                                    onChange(
                                        contacts.map((contact, index) => {
                                            if (index === item.index) {
                                                return {
                                                    ...contact,
                                                    contact: e.target.value,
                                                }
                                            }

                                            return contact
                                        })
                                    )
                                }}
                            />
                        </div>
                    )
                })}
            </Col>
        </Row>
    )
}

export default ContactsFields
