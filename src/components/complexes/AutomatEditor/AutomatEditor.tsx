import React, { FC, useEffect, useMemo, useState } from 'react'
import {
    selectFillings,
    selectModels,
    selectTastes,
} from '../../../store/slices/storage'
import { useAppSelector } from '../../hooks/store'
import { AutomatContainerTypes, AutomatType } from '../../../types'
import { Automats as AutomatsService } from '../../../services/Automats'
import { Button } from '../../simples/Button'
import { Col } from '../../simples/modalEditor/Col'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { OptionType, Selector } from '../../simples/Selector'
import { TextField } from '../../simples/TextField'
import { H } from '../../simples/modalEditor/H'
import BunkerItem, { BunkerItemData } from './BunkerItem'
import styles from './AutomatEditor.module.scss'
import {
    AutomatContainerEditor,
    FormType as AutomatContainerForm,
} from '../AutomatContainerEditor'

type ContainerFormType = {
    automatModelContainerId: number
    tasteId: number
    isActive: boolean
    hasSmallDrink: boolean
}

type DosagesFormType = {
    drinkVolume: number
    water: number
    product: number
    conversionFactor: number
    price: number
    tasteId: number
}

type FormType = {
    name: string
    serialNumber: string
    automatModelId: number
    address: string
    longitude: string
    latitude: string
    containers: Array<ContainerFormType>
    dosages: Array<DosagesFormType>
}

export const initData: FormType = {
    name: '',
    serialNumber: '',
    automatModelId: 0,
    address: '',
    longitude: '',
    latitude: '',
    containers: [],
    dosages: [],
}

type Props = {
    outletId: number
    onSubmit: (automat: AutomatType) => void
    onClose: () => void
}
/**
 *
 * @param mashin
 * @param onSubmit
 * @param onClose
 * @returns модальное окно редактирования автомата
 */

const AutomatEditor: FC<Props> = ({ outletId, onSubmit, onClose }) => {
    /**
     * Наполнения
     */
    const fillings = useAppSelector(selectFillings)
    /**
     * модели
     */
    const models = useAppSelector(selectModels)

    const tastes = useAppSelector(selectTastes)

    /**
     * редактируемый аппарат
     */
    const [data, setData] = useState<FormType>(initData)

    /**
     * набор id
     */
    const [copedFillingId, setCopedFillingId] = useState<number>()

    const [editedContainerNumber, setEditedContainerNumber] = useState(0)
    const [editedContainerType, setEditedContainerType] =
        useState<AutomatContainerTypes>()
    const [editedContainerData, setEditedContainerData] =
        useState<AutomatContainerForm>()

    /**
     * формирование опций наполнения
     */
    const fillingsOptions: OptionType[] = useMemo(() => {
        return fillings
            .filter((f) => f.automatModelId === data.automatModelId)
            .map((t) => {
                return {
                    label: t.name,
                    value: t.id,
                }
            })
    }, [fillings, data.automatModelId])

    /**
     * формирование опций моделей автоматов
     */
    const modelsOptions: OptionType[] = useMemo(() => {
        return models.map((t) => {
            return {
                label: t.name,
                value: t.id,
            }
        })
    }, [models])

    const currentAutomatModel = useMemo(() => {
        return models.find((model) => model.id === data.automatModelId)
    }, [models, data.automatModelId])

    /**
     * Копирование набора
     */
    const onCopyFromSet = () => {
        if (!copedFillingId) {
            return
        }

        const filling = fillings.find((f) => f.id === copedFillingId)

        if (!filling) {
            throw new Error('Filling not found')
        }

        if (filling.automatModelId !== data.automatModelId) {
            return
        }

        const newDosages: Array<DosagesFormType> = []
        const hasSmallDrinkOfContainers: Array<boolean> = []

        for (let i = 0; i < filling.containers.length; i++) {
            const container = filling.containers[i]
            let taste = tastes.find((t) => t.id === container.tasteId)

            if (!taste) {
                continue
            }

            hasSmallDrinkOfContainers[container.automatContainerId] =
                taste.baseDosages.length > 1

            for (let j = 0; j < taste.baseDosages.length; j++) {
                let dosage = taste.baseDosages[j]

                newDosages.push({
                    ...dosage,
                    tasteId: taste.id,
                    price: 0,
                })
            }
        }

        const newContainers = filling.containers.map((c) => ({
            automatModelContainerId: c.automatContainerId,
            tasteId: c.tasteId,
            isActive: true,
            hasSmallDrink: hasSmallDrinkOfContainers[c.automatContainerId],
        }))

        setData({
            ...data,
            containers: newContainers,
            dosages: newDosages,
        })

        // const containers = fillings.find((i) => i.id === set)?.containers || []
        // setEditMashin({ ...editMashin, containers: containers })
        // dispatch(setMashin({ ...editMashin, containers: containers }))
    }

    const startUpdateContainer = (
        number: number,
        container?: BunkerItemData
    ) => {
        setEditedContainerNumber(number)

        if (!currentAutomatModel) {
            throw new Error('Current automat model is empty')
        }

        const modelContainer = currentAutomatModel.containers.find(
            (c) => c.number === number
        )

        if (!modelContainer) {
            throw new Error('Model container not found')
        }

        setEditedContainerType(modelContainer.type)

        if (container) {
            setEditedContainerData({
                tasteId: container.tasteId,
                dosages: data.dosages.filter(
                    (d) => d.tasteId === container.tasteId
                ),
            })
        }
    }

    const closeContainerEditor = () => {
        setEditedContainerNumber(0)
        setEditedContainerData(undefined)
    }

    const containerEditorSubmit = (containerData: AutomatContainerForm) => {
        if (!currentAutomatModel) {
            throw new Error('Current automat model is absent')
        }

        const automatModelContainer = currentAutomatModel.containers.find(
            (c) => c.number === editedContainerNumber
        )

        if (!automatModelContainer) {
            throw new Error('Automat model container not found')
        }

        let updated = false
        const newContainers = data.containers.map((container) => {
            if (
                container.automatModelContainerId === automatModelContainer.id
            ) {
                updated = true
                return {
                    ...container,
                    tasteId: containerData.tasteId,
                    isActive: true,
                    hasSmallDrink: containerData.dosages.length > 1,
                }
            }

            return container
        })
        if (!updated) {
            newContainers.push({
                automatModelContainerId: automatModelContainer.id,
                tasteId: containerData.tasteId,
                isActive: true,
                hasSmallDrink: containerData.dosages.length > 1,
            })
        }

        const newDosages = [
            ...data.dosages.filter((d) => d.tasteId !== containerData.tasteId),
            ...containerData.dosages,
        ]

        setData({
            ...data,
            containers: newContainers,
            dosages: newDosages,
        })

        closeContainerEditor()
    }

    const handleSubmit = async () => {
        const createdAutomat = await AutomatsService.create({
            ...data,
            outletId,
            longitude: +data.longitude,
            latitude: +data.latitude,
        })

        onSubmit(createdAutomat)
    }

    const disabled = useMemo(() => {
        return (
            !data.name ||
            !data.automatModelId ||
            !data.serialNumber ||
            !data.address ||
            !data.longitude ||
            !data.latitude
        )
    }, [data])

    return (
        <Editor
            onSubmit={handleSubmit}
            submitDisabled={disabled}
            onCancel={onClose}
            header={`Создание автомата`}
        >
            <Row>
                <Col>
                    <TextField
                        placeholder={'Название автомата'}
                        value={data.name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                name: e.target.value,
                            })
                        }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Selector
                        label={'Модель автомата'}
                        options={modelsOptions}
                        value={+data.automatModelId}
                        onChange={(e) => {
                            setData({ ...data, automatModelId: e })
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        placeholder={'Серийный номер'}
                        value={data.serialNumber}
                        onChange={(e) => {
                            setData({
                                ...data,
                                serialNumber: e.target.value,
                            })
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col width={'two-third'}>
                    <TextField
                        placeholder={'Адрес'}
                        value={data.address}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: e.target.value,
                            })
                        }}
                    />
                </Col>
                <Col width={'third'}>
                    <Row>
                        <Col>
                            <TextField
                                placeholder={'Долгота'}
                                value={data.longitude}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        longitude: e.target.value,
                                    })
                                }}
                            />
                        </Col>
                        <Col>
                            <TextField
                                placeholder={'Широта'}
                                value={data.latitude}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        latitude: e.target.value,
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {!!data.automatModelId && (
                <>
                    <H level={3}>Скопировать из набора</H>
                    <Row>
                        <Col width={'forth-fith'}>
                            <Selector
                                label={'Выберите набор'}
                                options={fillingsOptions}
                                value={copedFillingId}
                                onChange={(i) => {
                                    setCopedFillingId(i)
                                }}
                            />
                        </Col>
                        <Col width={'one-fith'}>
                            <Button
                                onClick={onCopyFromSet}
                                classNames={{
                                    button: styles.btn,
                                }}
                            >
                                Скопировать
                            </Button>
                        </Col>
                    </Row>
                </>
            )}

            {currentAutomatModel && (
                <>
                    <H level={2}>Продукты</H>

                    {currentAutomatModel.containers.map((modelContainer) => {
                        const container = data.containers.find(
                            (c) =>
                                c.automatModelContainerId === modelContainer.id
                        )

                        return (
                            <Row>
                                <Col>
                                    <BunkerItem
                                        number={modelContainer.number}
                                        bunker={container}
                                        onEdit={startUpdateContainer}
                                    />
                                </Col>
                            </Row>
                        )
                    })}
                </>
            )}

            {!!editedContainerNumber && !!editedContainerType && (
                <AutomatContainerEditor
                    data={editedContainerData}
                    containerType={editedContainerType}
                    onClose={closeContainerEditor}
                    onSubmit={containerEditorSubmit}
                />
            )}
        </Editor>
    )
}

export default AutomatEditor
