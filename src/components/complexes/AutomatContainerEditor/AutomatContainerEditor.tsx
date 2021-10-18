import React, { FC, useEffect, useMemo, useState } from 'react'
import {
    selectBrands,
    selectProducts,
    selectTastes,
} from '../../../store/slices/storage'
import { useAppSelector } from '../../hooks/store'
import { AutomatContainerTypes } from '../../../types'
import { Col } from '../../simples/modalEditor/Col'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import {
    SearchSelector,
    OptionSelectorType,
} from '../../simples/SearchSelector'
import { DosageItem, DosageItemData } from './DosageItem'

export type FormType = {
    tasteId: number
    dosages: Array<DosageItemData>
}

const initDosageData: DosageItemData = {
    drinkVolume: 0,
    water: 0,
    product: 0,
    conversionFactor: 0,
    tasteId: 0,
    price: 0,
}

const initData: FormType = {
    tasteId: 0,
    dosages: [{ ...initDosageData }],
}

type Props = {
    data?: FormType
    containerType: AutomatContainerTypes
    onClose: () => void
    onSubmit: (data: FormType) => void
}

const AutomatContainerEditor: FC<Props> = ({
    data: defaultData = initData,
    containerType,
    onSubmit,
    onClose,
}) => {
    const brands = useAppSelector(selectBrands)
    const products = useAppSelector(selectProducts)
    const tastes = useAppSelector(selectTastes)

    const [data, setData] = useState(defaultData)

    const [brandId, setBrandId] = useState(0)
    const [productId, setProductId] = useState(0)

    useEffect(() => {
        if (!data.tasteId) {
            return
        }

        const taste = tastes.find((t) => t.id === data.tasteId)

        if (!taste) {
            return
        }

        const product = products.find((p) => p.id === taste.productId)

        if (!product) {
            return
        }

        const brand = brands.find((b) => b.id === product.brandId)

        if (brand) {
            setBrandId(brand.id)
        }
        setProductId(product.id)
    }, [])

    const brandsOptions = useMemo(() => {
        return brands.map((brand) => ({ value: brand.name, id: brand.id }))
    }, [brands])

    const productsOptions = useMemo(() => {
        if (!brandId) {
            return []
        }

        return products
            .filter((product) => product.brandId === brandId)
            .map((product) => ({ value: product.name, id: product.id }))
    }, [products, brandId])

    const tasteOptions = useMemo(() => {
        if (!productId) {
            return []
        }
        return tastes
            .filter(
                (taste) =>
                    taste.product &&
                    taste.product.id === productId &&
                    +taste.product.condition === +containerType
            )
            .map((t) => {
                return {
                    id: t.id,
                    value: t.name,
                }
            })
    }, [tastes, containerType, productId])

    const handleTasteChange = (option: OptionSelectorType) => {
        setData({
            ...data,
            tasteId: option.id,
            dosages: data.dosages.map((d) => ({
                ...d,
                tasteId: option.id,
            })),
        })
    }

    const handleDosageChange = (dosage: DosageItemData, index: number) => {
        setData({
            ...data,
            dosages: data.dosages.map((d, i) => {
                if (i === index) {
                    return dosage
                }

                return d
            }),
        })
    }

    const handleAddDosageClick = () => {
        setData({
            ...data,
            dosages: [
                ...data.dosages,
                { ...initDosageData, tasteId: data.tasteId },
            ],
        })
    }

    const handleDeleteDosageClick = (index: number) => {
        setData({
            ...data,
            dosages: data.dosages.filter((d, i) => i !== index),
        })
    }

    const submit = () => {
        onSubmit(data)
    }

    return (
        <Editor
            header={'Продукты:'}
            onCancel={onClose}
            onSubmit={submit}
            submitDisabled={!data.tasteId}
        >
            <Row>
                <Col>
                    <SearchSelector
                        value={brandId}
                        options={brandsOptions}
                        onClick={(option) => setBrandId(option.id)}
                        placeholder={'Выберите бренд'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchSelector
                        value={productId}
                        options={productsOptions}
                        onClick={(option) => setProductId(option.id)}
                        placeholder={'Выберите продукт'}
                        disabled={!brandId}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchSelector
                        value={data.tasteId}
                        options={tasteOptions}
                        onClick={handleTasteChange}
                        placeholder={'Выберите вкус'}
                        disabled={!productId}
                    />
                </Col>
            </Row>

            {data.dosages.map((dosage, index) => (
                <DosageItem
                    key={index}
                    dosage={dosage}
                    number={index + 1}
                    onChange={(dosage) => {
                        handleDosageChange(dosage, index)
                    }}
                    showAddButton={data.dosages.length - 1 === index}
                    onAddClick={handleAddDosageClick}
                    showDeleteButton={data.dosages.length > 1}
                    onDeleteClick={() => handleDeleteDosageClick(index)}
                />
            ))}
        </Editor>
    )

    return null
}

export default AutomatContainerEditor
