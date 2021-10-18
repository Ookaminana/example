import React, { FC } from 'react'

import styles from './SubHeader.module.scss'

const SubHeader: FC = ({ children }) => {
    return <h2 className={styles.header}>{children}</h2>
}

export default SubHeader
