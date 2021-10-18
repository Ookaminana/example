import React, { ChangeEvent, FC, useState } from 'react'
import { AutomatModel as ModelType, AutomatModelTypes } from '../../../types'
import { Models as ModelsService } from '../../../services/Models'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { Selector } from '../../simples/Selector'
import { BunkerTypeEditor } from './BunkerTypeEditor'

const automatModelTypeOptions = [
    { value: AutomatModelTypes.Beverages, label: 'Напитки' },
    { value: AutomatModelTypes.Snack, label: 'Снеки' },
    { value: AutomatModelTypes.Coffee, label: 'Кофе' },
]

const initModel: ModelType = {
    id: 0,
    type: AutomatModelTypes.Beverages,
    name: '',
    cups: 0,
    containers: [],
}

type Props = {
    model?: ModelType
    onSubmit: (model: ModelType) => void
    onClose: () => void
}

const ModelEditor: FC<Props> = ({ model = initModel, onSubmit, onClose }) => {
    const [modelCurrent, setModelCurrent] = useState<ModelType>(model)
    const [loading, setLoading] = useState(false)

    const handleCupsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/, '')

        setModelCurrent({
            ...modelCurrent,
            cups: +value,
        })
    }

    const submit = async () => {
        let savedModel: ModelType

        setLoading(true)

        if (modelCurrent.id && modelCurrent.id > 0) {
            savedModel = await ModelsService.update(modelCurrent.id, {
                type: modelCurrent.type,
                name: modelCurrent.name,
                cups: modelCurrent.cups,
                containers: modelCurrent.containers.map((container) => {
                    if (container.id > 0) {
                        return container
                    }

                    return {
                        type: container.type,
                        number: container.number,
                        volume: container.volume,
                    }
                }),
            })
        } else {
            savedModel = await ModelsService.create({
                type: modelCurrent.type,
                name: modelCurrent.name,
                cups: modelCurrent.cups,
                containers: modelCurrent.containers.map((container) => ({
                    type: container.type,
                    number: container.number,
                    volume: container.volume,
                })),
            })
        }

        setLoading(false)
        onSubmit(savedModel)
    }

    return (
        <Editor
            header={
                modelCurrent.id && modelCurrent.id > 0
                    ? 'Редактирование модели'
                    : 'Создание модели'
            }
            submitButtonName={
                modelCurrent.id && modelCurrent.id > 0 ? 'Сохранить' : 'Создать'
            }
            submitDisabled={!modelCurrent.type || !modelCurrent.name}
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
        >
            <Row>
                <Col>
                    <TextField
                        placeholder={'Название модели'}
                        value={modelCurrent.name}
                        onChange={(event) =>
                            setModelCurrent({
                                ...modelCurrent,
                                name: event.target.value,
                            })
                        }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Selector
                        options={automatModelTypeOptions}
                        label={'Тип автомата'}
                        value={modelCurrent.type}
                        onChange={(e) => {
                            setModelCurrent({ ...modelCurrent, type: e })
                        }}
                    />
                </Col>
            </Row>

            {modelCurrent.type === AutomatModelTypes.Beverages ? (
                <>
                    <Row>
                        <Col>
                            <TextField
                                placeholder={'Максимальное количество стаканов'}
                                value={modelCurrent.cups || ''}
                                onChange={handleCupsChange}
                            />
                        </Col>
                    </Row>

                    <BunkerTypeEditor
                        model={modelCurrent}
                        onChange={setModelCurrent}
                    />
                </>
            ) : null}
        </Editor>
    )
}

export default ModelEditor
