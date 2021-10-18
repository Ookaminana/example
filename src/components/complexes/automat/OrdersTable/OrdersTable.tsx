import React, { FC, useState } from 'react'
import moment from 'moment'
import { getPriceMethodName } from '../../../../utils/helpers'
import {
    Order as OrderType,
    OrderPriceMethods,
    OrderStatuses,
} from '../../../../types'
import {
    SortOrderBy as OrdersSortOrderBy,
    SortOrder as OrdersSortOrder,
} from '../../../../services/Orders'
import { Spinner } from '../../../simples/Spinner'
import { Th } from './Th'
import styles from './OrdersTable.module.scss'

type Props = {
    orders: Array<OrderType>
    loading?: boolean
    onSortChange?: (orderBy: OrdersSortOrderBy, order: OrdersSortOrder) => void
}

const OrdersTable: FC<Props> = ({ orders, loading = false, onSortChange }) => {
    const [orderBy, setOrderBy] = useState<OrdersSortOrderBy>('buyAt')
    const [order, setOrder] = useState<OrdersSortOrder>('DESC')

    const handleSort = (orderBy: OrdersSortOrderBy, order: OrdersSortOrder) => {
        setOrderBy(orderBy)
        setOrder(order)

        onSortChange && onSortChange(orderBy, order)
    }

    // console.log('OrdersTable', { orders })
    return (
        <div className={styles.root}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <Th
                            field={'tasteName'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Напиток
                        </Th>
                        <Th
                            field={'automatName'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Автомат
                        </Th>
                        <Th
                            field={'totalPrice'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Сумма
                        </Th>
                        <Th
                            field={'priceMethod'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Тип оплаты
                        </Th>
                        <Th
                            field={'buyAt'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Дата
                        </Th>
                        <Th
                            field={'promo'}
                            orderBy={orderBy}
                            order={order}
                            onSort={handleSort}
                        >
                            Промокод
                        </Th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>
                                {order.items &&
                                order.items.length > 0 &&
                                order.items[0].taste
                                    ? order.items[0].taste.name
                                    : ''}
                            </td>
                            <td>{order.automat.name}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.prices && order.prices.length > 0
                                    ? getPriceMethodName(order.prices[0].method)
                                    : ''}
                            </td>
                            <td>{moment(order.buyAt).format('YYYY-MM-DD')}</td>
                            <td>{order.promo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {loading && (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default OrdersTable
