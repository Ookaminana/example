import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config'
import styles from './Header.module.scss'
import { ReactComponent as NewNot } from '../../../assets/icons/newNotification.svg'
import { ReactComponent as Lk } from '../../../assets/icons/lk.svg'

type Props = {}

const Header: FC<Props> = () => {
    return (
        <header className={styles.header} id="main-header">
            <div className={styles.items}>
                <NewNot />
            </div>
            <div className={styles.items}>
                <Link to={routes.profile}>
                    <Lk />
                </Link>
            </div>
        </header>
    )
}

export default Header
