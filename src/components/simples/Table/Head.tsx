import React, { FC } from 'react'
import styles from './Table.module.scss'

const Head: FC = ({ children }) => {
    return (
        <thead className={styles.thead}>
            <tr>{children}</tr>
        </thead>
    )
}

export default Head
