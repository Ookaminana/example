import React, { FC } from 'react'
import styles from './Table.module.scss'

const Tr: FC = ({ children }) => {
    return <tr className={styles.tr}>{children}</tr>
}

export default Tr
