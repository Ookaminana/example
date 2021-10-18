import React, { FC, useState } from 'react'
import { TextField } from '../../../simples/TextField'

import styles from '../Modal.module.scss'
import { Button } from '../../../simples/Button'

export type ModalBrandParams = {
    mediaKey: string
    name: string
}

type Props = {
    edit?: boolean
    data: ModalBrandParams
    onSubmit: (data: ModalBrandParams) => void
    onClose: () => void
}

const ModalBrand: FC<Props> = ({ edit = false, data, onSubmit, onClose }) => {
    const { mediaKey: mediaKeyInput, name: nameInput = '' } = data

    const [mediaKey, setMediaKey] = useState(mediaKeyInput)
    const [name, setName] = useState(nameInput)

    const submit = () => {
        onSubmit({
            mediaKey: mediaKey,
            name: name,
        })
    }

    return (
        <div className={styles.modalContent}>
            <h3 className={styles.h3}>
                {edit ? 'Редактирование' : 'Создание'} бренда
            </h3>

            <div className={styles.nameBrand}>
                <TextField
                    className={styles.nameBrandText}
                    placeholder={'Название бренда'}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className={styles.btns}>
                <Button
                    type={'submit'}
                    className={styles.button}
                    children={edit ? 'Сохранить' : 'Создать'}
                    disabled={name === ''}
                    onClick={submit}
                />
                <a href="#" onClick={onClose}>
                    Отмена
                </a>
            </div>
        </div>
    )
}

export default ModalBrand
