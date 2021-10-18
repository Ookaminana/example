import React, { FC, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../config'
import { signOut } from '../../../store/slices/auth'
import { useAppSelector, useAppDispatch } from '../../hooks/store'
import { selectAuthUser } from '../../../store/slices/auth'
import styles from './LeftSidebar.module.scss'
import { ReactComponent as Logo } from '../../../assets/icons/shaker-logo.svg'
import { ReactComponent as LogoutIcon } from '../../../assets/icons/logout.svg'
import MenuItemsGroup from './MenuItemsGroup'
import { menuConfig } from './config'
import { UserGroups } from '../../../types'

const LeftSidebar: FC = () => {
    const dispatch = useAppDispatch()

    const logout = () => dispatch(signOut())

    const user = useAppSelector(selectAuthUser)

    const userGroup = useMemo(() => {
        if (!user) {
            return undefined
        }

        if (user.groups.root) {
            return UserGroups.Root
        } else if (user.groups.owner) {
            return UserGroups.Owner
        } else if (user.groups.club) {
            return UserGroups.Club
        } else if (user.groups.employer) {
            return UserGroups.Employer
        } else if (user.groups.service) {
            return UserGroups.Service
        } else if (user.groups.manager) {
            return UserGroups.Manager
        }

        return undefined
    }, [user])

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <div className={styles.logoWrap}>
                    <Logo />
                </div>
                <div className={styles.menu}>
                    {userGroup &&
                        menuConfig[userGroup].map((menuGroup) => (
                            <MenuItemsGroup title={menuGroup.title} defaultOpen>
                                {menuGroup.items.map((menuItem) => (
                                    <div className={styles.menuItem}>
                                        <NavLink
                                            to={menuItem.url}
                                            className={styles.menuItemLink}
                                            activeClassName={
                                                styles.menuItemActiveLink
                                            }
                                            exact
                                        >
                                            {menuItem.title}
                                        </NavLink>
                                    </div>
                                ))}
                            </MenuItemsGroup>
                        ))}
                </div>
            </div>

            <div className={styles.bottom}>
                <button className={styles.logout} onClick={logout}>
                    <LogoutIcon className={styles.logoutIcon} />
                    <span>Выход</span>
                </button>
            </div>
        </div>
    )
}

export default LeftSidebar
