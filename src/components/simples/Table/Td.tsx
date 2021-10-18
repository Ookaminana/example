import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './Table.module.scss'

type Props = {
    align?: 'left' | 'center' | 'right' | 'justify'
}

const Td: FC<Props> = ({ align = 'left', children }) => {
    return <td className={classNames(styles.td, styles[align])}>{children}</td>
}

export default Td
