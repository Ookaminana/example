import React, { FC } from 'react'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import { Preview } from '../Preview'
import styles from './ItemsGrid.module.scss'

type Props = {
    id: number
    photo: string | null
    title: string
    description?: string
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

export const Item: FC<Props> = ({
    id,
    photo,
    title,
    description,
    onEdit,
    onDelete,
}) => {
    return (
        <div className={styles.item}>
            <Preview src={photo} className={styles.itemPhoto} />

            <div className={styles.itemTitleContainer}>
                <div className={styles.itemActions}>
                    <button
                        className={styles.itemButton}
                        onClick={() => {
                            onEdit && onEdit(id)
                        }}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className={styles.itemButton}
                        onClick={() => {
                            onDelete && onDelete(id)
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>

                <div className={styles.itemTitle}>{title}</div>
            </div>

            {description && (
                <div
                    className={styles.itemDescription}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
        </div>
    )
}
