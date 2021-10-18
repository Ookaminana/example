import React, { ChangeEvent, FC } from 'react'
import { AutomatContainerTypes, AutomatModelContainer } from '../../../types'
import { TextField } from '../../simples/TextField'
import { Selector } from '../../simples/Selector'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import styles from './ModelEditor.module.scss'

const volumeInputClasses = {
    input: styles.bunkerItemVolumeInput,
}

const typeOptions = [
    { value: AutomatContainerTypes.Powder, label: 'Порошок' },
    { value: AutomatContainerTypes.Syrup, label: 'Сироп' },
]

type Props = {
    container: AutomatModelContainer
    onChange: (container: AutomatModelContainer) => void
    onDelete: () => void
}

export const BunkerItem: FC<Props> = ({ container, onChange, onDelete }) => {
    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/, '')

        onChange({
            ...container,
            volume: +value,
        })
    }

    const handleTypeChange = (type: AutomatContainerTypes) => {
        onChange({
            ...container,
            type,
        })
    }

    return (
        <div className={styles.bunkerItem}>
            <div className={styles.bunkerItemNumber}>
                Бункер {container.number}
            </div>

            <div className={styles.bunkerItemVolumeWrap}>
                <TextField
                    value={container.volume}
                    onChange={handleVolumeChange}
                    classes={volumeInputClasses}
                />
                <div className={styles.bunkerItemVolumeUnit}>
                    {container.type === AutomatContainerTypes.Syrup
                        ? 'мл.'
                        : 'г.'}
                </div>
            </div>

            <div className={styles.bunkerItemTypeWrap}>
                <Selector
                    options={typeOptions}
                    label="Тип бункера"
                    value={container.type}
                    onChange={handleTypeChange}
                />
            </div>

            <button className={styles.bunkerItemDelete} onClick={onDelete}>
                <DeleteIcon />
            </button>
        </div>
    )
}
