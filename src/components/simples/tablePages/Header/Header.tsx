import React, { FC } from 'react'

import styles from './Header.module.scss'

type Props = {
    text: string
}

const Header: FC<Props> = ({ text }) => {
    return <h1 className={styles.h1}>{text}</h1>
}

export default Header
