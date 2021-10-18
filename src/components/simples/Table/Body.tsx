import React, { FC } from 'react'
import styles from './Table.module.scss'

const Body: FC = ({ children }) => {
    return <tbody className={styles.tbody}>{children}</tbody>
}

export default Body
