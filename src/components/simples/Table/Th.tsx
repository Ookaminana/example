import React, { FC } from 'react'
import styles from './Table.module.scss'

const Th: FC = ({ children }) => {
    return <th className={styles.th}>{children}</th>
}

export default Th
