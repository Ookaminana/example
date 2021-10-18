import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Tabs.module.scss'

type TabItem = {
    label: string
    url: string
}

type Props = {
    items: Array<TabItem>
}

/**
 * Навигация в виде вкладок. Используется, например, на страницах управления автоматом.
 * При клике по вкладке происходит переход на другую страницу.
 * Активная вкладка определяется по url открытой страницы.
 *
 * @param {TabItem} items   Список вкладок
 * @constructor
 */

const Tabs: FC<Props> = ({ items }) => {
    return (
        <div className={styles.root}>
            {items.map((item, index) => (
                <NavLink
                    to={item.url}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                    key={index}
                    exact
                >
                    {item.label}
                </NavLink>
            ))}
        </div>
    )
}

export default Tabs
