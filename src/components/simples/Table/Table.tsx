import React, { FC } from 'react'
import styles from './Table.module.scss'

const Table: FC = ({ children }) => {
    return <table className={styles.table}>{children}</table>
}

export default Table
