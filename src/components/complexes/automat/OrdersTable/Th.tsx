import React, { FC } from 'react'
import classNames from 'classnames'
import {
    SortOrderBy as OrdersSortOrderBy,
    SortOrder as OrdersSortOrder,
} from '../../../../services/Orders'
import { ReactComponent as ArrowUpIcon } from '../../../../assets/icons/orders-table-arrow-up.svg'
import { ReactComponent as ArrowDownIcon } from '../../../../assets/icons/orders-table-arrow-down.svg'
import styles from './OrdersTable.module.scss'

type Props = {
    field: OrdersSortOrderBy
    orderBy: OrdersSortOrderBy
    order: OrdersSortOrder
    onSort: (orderBy: OrdersSortOrderBy, order: OrdersSortOrder) => void
}

export const Th: FC<Props> = ({ children, field, orderBy, order, onSort }) => {
    const handleClick = () => {
        if (field !== orderBy) {
            onSort(field, 'ASC')
        } else {
            onSort(field, order === 'ASC' ? 'DESC' : 'ASC')
        }
    }

    return (
        <th>
            <span className={styles.thContainer} onClick={handleClick}>
                <span className={styles.thTitle}>{children}</span>
                <span className={styles.thArrows}>
                    <ArrowUpIcon
                        className={classNames(styles.thArrow, {
                            [styles.active]:
                                field === orderBy && order === 'ASC',
                        })}
                    />
                    <ArrowDownIcon
                        className={classNames(styles.thArrow, {
                            [styles.active]:
                                field === orderBy && order === 'DESC',
                        })}
                    />
                </span>
            </span>
        </th>
    )
}
