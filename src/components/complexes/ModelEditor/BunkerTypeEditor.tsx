import React, { FC } from 'react'
import {
    AutomatModel as ModelType,
    AutomatContainerTypes,
    AutomatModelContainer,
} from '../../../types'
import { Col } from '../../simples/modalEditor/Col'
import { AddButton } from '../../simples/AddButton'
import { Row } from '../../simples/modalEditor/Row'
import { BunkerItem } from './BunkerItem'
import { H } from '../../simples/modalEditor/H'
import styles from './ModelEditor.module.scss'

type Props = {
    model: ModelType
    onChange: (model: ModelType) => void
}

export const BunkerTypeEditor: FC<Props> = ({ model, onChange }) => {
    const handleAddBunker = () => {
        onChange({
            ...model,
            containers: [
                ...model.containers,
                {
                    id: 0,
                    type: AutomatContainerTypes.Powder,
                    number: model.containers.length + 1,
                    volume: 0,
                },
            ],
        })
    }

    const handleContainerChange = (
        container: AutomatModelContainer,
        index: number
    ) => {
        onChange({
            ...model,
            containers: model.containers.map((c, i) => {
                if (i !== index) {
                    return c
                }

                return container
            }),
        })
    }

    const handleContainerDelete = (index: number) => {
        onChange({
            ...model,
            containers: model.containers
                .filter((c, i) => i !== index)
                .map((c, i) => ({ ...c, number: i + 1 })),
        })
    }

    return (
        <>
            <H level={3}>Распределение по бункерам</H>

            {model.containers
                .sort(
                    (container1, container2) =>
                        container1.number - container2.number
                )
                .map((container, i) => (
                    <Row key={i}>
                        <Col>
                            <BunkerItem
                                container={container}
                                onChange={(container) =>
                                    handleContainerChange(container, i)
                                }
                                onDelete={() => handleContainerDelete(i)}
                            />
                        </Col>
                    </Row>
                ))}

            <Row>
                <Col>
                    <div className={styles.addBunker}>
                        <AddButton
                            label={'Добавить бункер'}
                            onClick={handleAddBunker}
                            positionLabel={'center'}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}
