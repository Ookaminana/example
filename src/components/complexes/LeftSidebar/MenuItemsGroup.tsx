import React, { FC, useState } from 'react'
import classNames from 'classnames'
import styles from './LeftSidebar.module.scss'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/menu-items-group-arrow.svg'

type Props = {
    title: string
    defaultOpen?: boolean
}

const MenuItemsGroup: FC<Props> = ({
    title,
    defaultOpen = false,
    children,
}) => {
    const [open, setOpen] = useState(defaultOpen)

    const toggleOpen = () => setOpen(!open)

    return (
        <div
            className={classNames(styles.menuItemsGroup, {
                [styles.open]: open,
            })}
        >
            <div className={styles.menuItemsGroupHeader} onClick={toggleOpen}>
                <span className={styles.menuItemsGroupHeaderTitle}>
                    {title}
                </span>

                <ArrowIcon className={styles.menuItemsGroupHeaderArrow} />
            </div>

            <div className={styles.menuItemsGroupBody}>{children}</div>
        </div>
    )
}

export default MenuItemsGroup
