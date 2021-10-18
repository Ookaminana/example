import React, { FC, useEffect, useMemo, useState } from 'react'
import { AutomatType, AutomatContainerTypes } from '../../../../types'
import { useAppSelector, useAppDispatch } from '../../../hooks/store'
import {
    selectModels,
    loadModels,
    loadTastes,
} from '../../../../store/slices/storage'
import { showToast } from '../../../../store/slices/site'
import { Automats as AutomatsService } from '../../../../services/Automats'
import { SubHeader } from '../SubHeader'
import { Row } from '../../../simples/modalEditor/Row'
import { Col } from '../../../simples/modalEditor/Col'
import { H } from '../../../simples/modalEditor/H'
import { TextField } from '../../../simples/TextField'
import { Selector } from '../../../simples/Selector'
import { OptionType } from '../../../simples/Selector'
import BunkerItem, { BunkerItemData } from '../../AutomatEditor/BunkerItem'
import {
    AutomatContainerEditor,
    FormType as AutomatContainerForm,
} from '../../AutomatContainerEditor'
import { Button } from '../../../simples/Button'
import styles from './GeneralSettings.module.scss'

type ContainerFormType = {
    id?: number
    automatModelContainerId: number
    tasteId: number
    isActive: boolean
    hasSmallDrink: boolean
}

type DosagesFormType = {
    id?: number
    drinkVolume: number
    water: number
    product: number
    conversionFactor: number
    price: number
    tasteId: number
}

type FormType = {
    name: string
    key: string
    serialNumber: string
    automatModelId: number
    address: string
    longitude: string
    latitude: string
    containers: Array<ContainerFormType>
    dosages: Array<DosagesFormType>
}

type Props = {
    automat: AutomatType
    onSubmit: (automat: AutomatType) => void
}

const GeneralSettings: FC<Props> = ({ automat: automatDefault, onSubmit }) => {
    const models = useAppSelector(selectModels)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadModels())
        dispatch(loadTastes())
    }, [])

    const modelsOptions: OptionType[] = useMemo(() => {
        return models.map((t) => {
            return {
                label: t.name,
                value: t.id,
            }
        })
    }, [models])

    const [automat, setAutomat] = useState<FormType>(() => ({
        ...automatDefault,
        longitude: automatDefault.longitude + '',
        latitude: automatDefault.latitude + '',
    }))

    const currentAutomatModel = useMemo(() => {
        if (!automat) {
            return undefined
        }

        return models.find((model) => model.id === automat.automatModelId)
    }, [models, automat])

    const [editedContainerNumber, setEditedContainerNumber] = useState(0)
    const [editedContainerType, setEditedContainerType] =
        useState<AutomatContainerTypes>()
    const [editedContainerData, setEditedContainerData] =
        useState<AutomatContainerForm>()

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
                dosages: automat.dosages.filter(
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
        const newContainers = automat.containers.map((container) => {
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
            ...automat.dosages
                .filter(
                    (d) =>
                        d.tasteId !== containerData.tasteId ||
                        (d.id !== undefined &&
                            containerData.dosages.findIndex(
                                (cdd) => cdd.id === d.id
                            ) !== -1)
                )
                .map((d) => {
                    const updatedDosage = containerData.dosages.find(
                        (cdd) => cdd.id === d.id
                    )
                    return updatedDosage || d
                }),
            ...containerData.dosages.filter((d) => d.id === undefined),
        ]

        setAutomat({
            ...automat,
            containers: newContainers,
            dosages: newDosages,
        })

        closeContainerEditor()
    }

    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        const updatedAutomat = await AutomatsService.update(automatDefault.id, {
            ...automat,
            outletId: automatDefault.outletId,
            longitude: +automat.longitude,
            latitude: +automat.latitude,
        })

        setLoading(false)

        dispatch(showToast('Настойки автомата успешно сохранены'))

        onSubmit(updatedAutomat)
    }

    const disabled = useMemo(() => {
        return (
            !automat.name ||
            !automat.automatModelId ||
            !automat.serialNumber ||
            !automat.address ||
            !automat.longitude ||
            !automat.latitude
        )
    }, [automat])

    return (
        <>
            <SubHeader>Основные настройки</SubHeader>

            <div className={styles.container}>
                <Row>
                    <Col>
                        <TextField
                            placeholder={'Название'}
                            value={automat.name}
                            onChange={(event) => {
                                setAutomat({
                                    ...automat,
                                    name: event.target.value,
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Selector
                            options={modelsOptions}
                            label={'Модель'}
                            value={automat.automatModelId}
                            onChange={(event) => {
                                setAutomat({
                                    ...automat,
                                    automatModelId: event,
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField
                            placeholder={'Ключ'}
                            value={automat.key}
                            disabled
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField
                            placeholder={'Серийный номер'}
                            value={automat.serialNumber}
                            onChange={(event) => {
                                setAutomat({
                                    ...automat,
                                    serialNumber: event.target.value,
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextField
                            placeholder={'Адрес'}
                            value={automat.address}
                            onChange={(event) => {
                                setAutomat({
                                    ...automat,
                                    address: event.target.value,
                                })
                            }}
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <TextField
                                    placeholder={'Долгота'}
                                    value={automat.longitude}
                                    onChange={(event) => {
                                        setAutomat({
                                            ...automat,
                                            longitude: event.target.value,
                                        })
                                    }}
                                />
                            </Col>
                            <Col>
                                <TextField
                                    placeholder={'Широта'}
                                    value={automat.latitude}
                                    onChange={(event) => {
                                        setAutomat({
                                            ...automat,
                                            latitude: event.target.value,
                                        })
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {currentAutomatModel && (
                    <>
                        <H level={2}>Продукты</H>

                        {currentAutomatModel.containers.map(
                            (modelContainer, index) => {
                                const container = automat.containers.find(
                                    (c) =>
                                        c.automatModelContainerId ===
                                        modelContainer.id
                                )

                                return (
                                    <Row key={index}>
                                        <Col>
                                            <BunkerItem
                                                number={modelContainer.number}
                                                bunker={container}
                                                onEdit={startUpdateContainer}
                                            />
                                        </Col>
                                    </Row>
                                )
                            }
                        )}
                    </>
                )}

                <div className={styles.buttons}>
                    <Button
                        onClick={submit}
                        loading={loading}
                        disabled={disabled}
                    >
                        Обновить
                    </Button>
                </div>

                {!!editedContainerNumber && !!editedContainerType && (
                    <AutomatContainerEditor
                        data={editedContainerData}
                        containerType={editedContainerType}
                        onClose={closeContainerEditor}
                        onSubmit={containerEditorSubmit}
                    />
                )}
            </div>
        </>
    )
}

export default GeneralSettings
