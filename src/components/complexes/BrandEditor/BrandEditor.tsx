import React, { FC, useState } from 'react'
import { Brand as BrandType } from '../../../types'
import { Brands as BrandsService } from '../../../services/Brands'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import styles from './BrandEditor.module.scss'

const initBrand: BrandType = {
    id: 0,
    mediaKey: '',
    name: '',
}

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    brand?: BrandType
    onSubmit: (brand: BrandType) => void
    onClose: () => void
}

const BrandEditor: FC<Props> = ({ brand = initBrand, onSubmit, onClose }) => {
    const { mediaKey: mediaKeyInput, name: nameInput = '' } = brand

    const [mediaKey, setMediaKey] = useState(mediaKeyInput)
    const [name, setName] = useState(nameInput)
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        let savedBrand: BrandType

        setLoading(true)

        if (brand.id > 0) {
            savedBrand = await BrandsService.update(brand.id, {
                mediaKey,
                name,
            })
        } else {
            savedBrand = await BrandsService.create({
                mediaKey,
                name,
            })
        }

        setLoading(false)
        onSubmit(savedBrand)
    }

    return (
        <Editor
            header={brand.id > 0 ? 'Редактирование бренда' : 'Создание бренда'}
            submitButtonName={brand.id > 0 ? 'Сохранить' : 'Создать'}
            submitDisabled={!mediaKey || !name}
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
            classes={editorClasses}
        >
            <Row>
                <Col>
                    <TextField
                        placeholder={'Медиа ключ'}
                        value={mediaKey}
                        onChange={(event) => setMediaKey(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        placeholder={'Название бренда'}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Col>
            </Row>
        </Editor>
    )
}

export default BrandEditor
