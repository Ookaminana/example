import React, { FC } from 'react'

import { Table, THead, Th, TBody, Tr, Td } from '../../Table'
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg'

import styles from './ItemList.module.scss'
import { Spinner } from '../../Spinner'

type Props = {
    headers: Array<string>
    rows: Array<{
        id: number
        values: Array<string | JSX.Element | number>
    }>
    loading?: boolean
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

const ItemsList: FC<Props> = ({
    headers,
    rows,
    loading = false,
    onEdit,
    onDelete,
}) => {
    return (
        <div className={styles.root}>
            <Table>
                <THead>
                    {headers.map((header, i) => (
                        <Th key={i}>{header}</Th>
                    ))}
                    <Th />
                </THead>
                <TBody>
                    {rows.map((row, i) => (
                        <Tr key={i}>
                            {row.values.map((value, j) => (
                                <Td key={j}>{value}</Td>
                            ))}
                            <Td align="right">
                                <span className={styles.actions}>
                                    <button
                                        className={styles.action}
                                        onClick={() => onEdit && onEdit(row.id)}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        className={styles.action}
                                        onClick={() =>
                                            onDelete && onDelete(row.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </button>
                                </span>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>

            {loading && (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default ItemsList
