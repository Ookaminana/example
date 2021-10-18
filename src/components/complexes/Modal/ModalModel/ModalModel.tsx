import React, { FC, useState } from 'react'
import { TextField } from '../../../simples/TextField'

import styles from '../Modal.module.scss'
import { Button } from '../../../simples/Button'

export type ModalModelParams = {
    type: string
    name: string
}

type Props = {
    edit?: boolean
    data: ModalModelParams
    onSubmit: (data: ModalModelParams) => void
    onClose: () => void
}

const ModalModel: FC<Props> = ({ edit = false, data, onSubmit, onClose }) => {
    const { type: typeInput, name: nameInput = '' } = data

    const [type, settype] = useState(typeInput)
    const [name, setName] = useState(nameInput)

    const submit = () => {
        onSubmit({
            type: type,
            name: name,
        })
    }

    return (
        <div className={styles.modalContent}>
            <h3 className={styles.h3}>Наполнение автомата</h3>

            <div className={styles.nameModel}>
                <TextField
                    className={styles.nameModelText}
                    placeholder={'Название модели'}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className={styles.modalButtons}>
                <a href="#" onClick={onClose}>
                    Отмена
                </a>

                <Button
                    type={'submit'}
                    className={styles.button}
                    children={edit ? 'Сохранить' : 'Создать'}
                    disabled={name === ''}
                    onClick={submit}
                />
            </div>
        </div>
    )
}

export default ModalModel
