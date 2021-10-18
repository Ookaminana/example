import React, { FC } from 'react'

import { Spinner } from '../Spinner'
import { Item } from './Item'
import styles from './ItemsGrid.module.scss'

const MAX_DESCRIPTION_LENGTH = 145

type Props = {
    data: Array<{
        id: number
        photo: string | null
        title: string
        description?: string
    }>
    loading?: boolean
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

const ItemsGrid: FC<Props> = ({ data, loading = false, onEdit, onDelete }) => {
    return (
        <div className={styles.root}>
            {data.length > 0 && (
                <div className={styles.list}>
                    {data.map((d) => {
                        const description =
                            d.description &&
                            d.description.length > MAX_DESCRIPTION_LENGTH
                                ? `${d.description.substring(
                                      0,
                                      MAX_DESCRIPTION_LENGTH
                                  )}...`
                                : d.description

                        return (
                            <div className={styles.itemWrap} key={d.id}>
                                <Item
                                    id={d.id}
                                    photo={d.photo}
                                    title={d.title}
                                    description={description}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </div>
                        )
                    })}

                    <div className={styles.itemEmpty} />
                    <div className={styles.itemEmpty} />
                    <div className={styles.itemEmpty} />
                    <div className={styles.itemEmpty} />
                </div>
            )}

            {loading && (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default ItemsGrid
