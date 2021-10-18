import React, { ChangeEvent, FC } from 'react'
import { Editor } from '../../simples/modalEditor/Editor'
import { WrapperBlockWithDelete } from '../../simples/WrapperBlockWithDelete'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { TextField } from '../../simples/TextField'
import { AddButton } from '../../simples/AddButton'

export type DosageItemData = {
    id?: number
    drinkVolume: number
    water: number
    product: number
    conversionFactor: number
    tasteId: number
    price: number
}

type FieldNames =
    | 'drinkVolume'
    | 'water'
    | 'product'
    | 'conversionFactor'
    | 'price'

type Props = {
    dosage: DosageItemData
    number: number
    onChange: (dosage: DosageItemData) => void
    showAddButton?: boolean
    onAddClick?: () => void
    showDeleteButton?: boolean
    onDeleteClick?: () => void
}

export const DosageItem: FC<Props> = ({
    dosage,
    number,
    onChange,
    showAddButton = false,
    onAddClick,
    showDeleteButton = false,
    onDeleteClick,
}) => {
    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        field: FieldNames
    ) => {
        const value = event.target.value.replace(/\D/, '')

        onChange({
            ...dosage,
            [field]: value,
        })
    }

    return (
        <div>
            <WrapperBlockWithDelete
                deleteLabel={'Удалить дозировку'}
                showDeleteButton={showDeleteButton}
                onClick={onDeleteClick}
                title={`Дозировка ${number}`}
            />
            <Row>
                <Col>
                    <TextField
                        label={'Объем напитка, мл'}
                        placeholder={'Объем напитка, мл'}
                        value={dosage.drinkVolume}
                        onChange={(event) => handleChange(event, 'drinkVolume')}
                    />
                </Col>
                <Col>
                    <TextField
                        label={'Вода, мл'}
                        placeholder={'Вода, мл'}
                        value={dosage.water}
                        onChange={(event) => handleChange(event, 'water')}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        label={'Продукт, гр'}
                        placeholder={'Продукт, гр'}
                        value={dosage.product}
                        onChange={(event) => handleChange(event, 'product')}
                    />
                </Col>

                <Col>
                    <TextField
                        label={'Кол-во продукта, г/мл '}
                        placeholder={'Кол-во продукта, г/мл'}
                        value={dosage.conversionFactor}
                        onChange={(event) =>
                            handleChange(event, 'conversionFactor')
                        }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        placeholder={'Цена:'}
                        value={dosage.price}
                        onChange={(event) => handleChange(event, 'price')}
                    />
                </Col>

                <Col>
                    {showAddButton && (
                        <AddButton
                            onClick={onAddClick}
                            label={'Добавить дозировку'}
                        />
                    )}
                </Col>
            </Row>
        </div>
    )
}
