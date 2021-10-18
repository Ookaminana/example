import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { User as UserType, UserGroups } from '../../../types'
import { User as UserService } from '../../../services/User'
import { getUserGroupName } from '../../../utils/helpers'
import { useAppDispatch } from '../../hooks/store'
import { loadAutomats, loadOutlets } from '../../../store/slices/storage'
import { routes } from '../../../config'
import { route } from '../../../utils/route'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import { Search } from '../../simples/Search'
import { ItemsList } from '../../simples/tablePages/ItemsList'
import { Confirm } from '../../simples/Confirm'
import styles from './MobileUsers.module.scss'

const header = ['', 'ФИО', 'Группа', 'Электронная почта']

const MobileUsers: FC = () => {
    const history = useHistory()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadOutlets())
        dispatch(loadAutomats())
    }, [])

    const [users, setUsers] = useState<Array<UserType>>([])
    const usersCurrent = useRef<Array<UserType>>(users)
    usersCurrent.current = users
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const search = useRef('')
    const has = useRef(true)

    const [deletedUserId, setDeletedUserId] = useState(0)

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await UserService.getList({
            offset: offset.current,
            search: search.current,
            group: UserGroups.User,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        const newUsers = [...usersCurrent.current, ...result]
        offset.current = newUsers.length
        setUsers(newUsers)
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        search.current = ''
        setUsers([])
    }

    useEffect(() => {
        load().then()
    }, [])

    const handleEndReached = async () => {
        await load()
    }

    const handleSearch = async (text: string) => {
        clear()
        search.current = text
        await load()
    }

    const startEditUser = (userId: number) => {
        history.push(route(routes.mobileUserEdit, { id: userId }))
    }

    const rows = useMemo(() => {
        return users.map((user) => {
            const email = user.contacts.find(
                (contact) => contact.type === 'email'
            )

            return {
                id: user.id,
                values: [
                    <div
                        className={styles.userPhoto}
                        style={{
                            backgroundImage: user.photoPath
                                ? `url("${user.photoPath}")`
                                : undefined,
                        }}
                    />,
                    user.fullName || (
                        <span className={styles.emptyFullName}>Не указано</span>
                    ),
                    getUserGroupName(user.permissions.group),
                    email ? email.contact : '',
                ],
            }
        })
    }, [users])

    const startDeleteUser = (userId: number) => {
        setDeletedUserId(userId)
    }

    const cancelUserDelete = () => {
        setDeletedUserId(0)
    }

    const confirmUserDelete = async () => {
        setDeletedUserId(0)
        await UserService.delete(deletedUserId)
        setUsers(users.filter((user) => user.id !== deletedUserId))
    }

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'Пользователи мобильного приложения'} />
            <div className={styles.search}>
                <Search onSearch={handleSearch} />
            </div>
            <ItemsList
                headers={header}
                rows={rows}
                onEdit={startEditUser}
                onDelete={startDeleteUser}
            />

            {!!deletedUserId && (
                <Confirm
                    text={'Вы действительно хотите удалить пользователя?'}
                    onConfirm={confirmUserDelete}
                    onCancel={cancelUserDelete}
                />
            )}
        </Layout>
    )
}

export default MobileUsers
