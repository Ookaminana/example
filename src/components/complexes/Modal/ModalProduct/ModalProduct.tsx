import React, { FC, useMemo, useState } from 'react'

import { useAppSelector } from '../../../hooks/store'
import { selectBrands } from '../../../../store/slices/storage'

import styles from '../Modal.module.scss'
import { Modal } from '../../../simples/Modal'
import { UploadPhoto } from '../../../simples/UploadPhoto'
import { TextField } from '../../../simples/TextField'
import { Selector } from '../../../simples/Selector'
import { Textarea } from '../../../simples/Textarea'
import { Button } from '../../../simples/Button'

export type ModalProductParams = {
    logo: string
    brand_id: number
    name: string
    feature: string
    compound: string
}

export type ModalProductResult = {
    logo?: File
    brand_id: number
    name: string
    feature: string
    compound: string
}

type Props = {
    edit?: boolean
    data: ModalProductParams
    onSubmit: (data: ModalProductResult) => void
    onClose: () => void
}

const ModalProducts: FC<Props> = ({
    edit = false,
    data,
    onSubmit,
    onClose,
}) => {
    const {
        logo: logoInput = '',
        brand_id: brandIdInput,
        name: nameInput = '',
        feature: featureInput = '',
        compound: compoundInput = '',
    } = data

    const [logoFile, setLogoFile] = useState<File>()
    const [brandId, setBrandId] = useState<number>(brandIdInput)
    const [name, setName] = useState(nameInput)
    const [feature, setFeature] = useState(featureInput)
    const [compound, setCompound] = useState(compoundInput)

    const brands = useAppSelector(selectBrands)

    const brandOptions = useMemo(() => {
        return brands.map((brand) => ({ value: brand.id, label: brand.name }))
    }, [brands])

    const submit = () => {
        onSubmit({
            logo: logoFile,
            brand_id: brandId,
            name,
            feature,
            compound,
        })
    }

    return (
        <Modal>
            <div className={styles.productMain}>
                <h3 className={styles.h3}>
                    {edit ? 'Редактирование продукта' : 'Создание продукта'}
                </h3>

                <div className={styles.productRow}>
                    <div className={styles.productCol}>
                        <UploadPhoto
                            defaultPhotoUrl={logoInput}
                            onChange={setLogoFile}
                        />
                    </div>
                    <div className={styles.productCol}>
                        <div className={styles.productFieldGroup}>
                            <Selector
                                options={brandOptions}
                                label="Название бренда"
                                value={brandId}
                                onChange={setBrandId}
                            />
                        </div>

                        <div className={styles.productFieldGroup}>
                            <TextField
                                placeholder="Название продукта"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.productCharacteristics}>
                    <h4 className={styles.productCharacteristicsTitle}>
                        Характеристики
                    </h4>

                    <div className={styles.productFieldGroup}>
                        <Textarea
                            placeholder="Описание"
                            value={feature}
                            onChange={(event) => setFeature(event.target.value)}
                        />
                    </div>
                    <div className={styles.productFieldGroup}>
                        <Textarea
                            placeholder="Состав"
                            value={compound}
                            onChange={(event) =>
                                setCompound(event.target.value)
                            }
                        />
                    </div>
                </div>

                <div className={styles.productButtons}>
                    <Button
                        type={'submit'}
                        className={styles.button}
                        children={edit ? 'Сохранить' : 'Создать'}
                        disabled={name === '' || !brandId}
                        onClick={submit}
                    />
                    <a href="#" onClick={onClose}>
                        Отмена
                    </a>
                </div>
            </div>
        </Modal>
    )
}

export default ModalProducts
