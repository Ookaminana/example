import React, { FC, memo, useMemo } from 'react'
import classNames from 'classnames'
import { AutomatContainerType } from '../../../types'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import styles from './AutomatEditor.module.scss'
import { useAppSelector } from '../../hooks/store'
import { selectTastes } from '../../../store/slices/storage'

export type BunkerItemData = {
    id?: number
    automatModelContainerId: number
    tasteId: number
    isActive: boolean
    hasSmallDrink: boolean
}

type Props = {
    number: number
    bunker?: BunkerItemData
    onEdit: (number: number, bunker?: BunkerItemData) => void
}

/**
 *
 * @param bunker
 * @param onEdit
 * @returns
 */

const BunkerItem: FC<Props> = ({ number, bunker, onEdit }) => {
    const tastes = useAppSelector(selectTastes)

    const tasteName = useMemo(() => {
        if (!bunker) {
            return 'Пусто'
        }

        return tastes.find((i) => i.id === bunker.tasteId)?.name || ''
    }, [tastes, bunker])

    return (
        <div className={styles.item}>
            <div className={styles.bunkerNumber}>Бункер {number}</div>
            <div
                className={classNames(styles.tasteName, {
                    [styles.tasteEmpty]: !bunker,
                })}
            >
                {tasteName}
            </div>
            <div onClick={() => onEdit(number, bunker)} className={styles.icon}>
                <EditIcon />
            </div>
        </div>
    )
}

export default memo(BunkerItem)
