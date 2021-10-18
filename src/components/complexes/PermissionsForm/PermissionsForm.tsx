import React, { FC, useEffect, useMemo, useState } from 'react'
import { UserGroups, UserPermissions } from '../../../types'
import { useAppSelector } from '../../hooks/store'
import { selectAuthUser } from '../../../store/slices/auth'
import { selectAutomats, selectOutlets } from '../../../store/slices/storage'
import { getUserGroupName } from '../../../utils/helpers'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { Selector } from '../../simples/Selector'
import { SearchSelector } from '../../simples/SearchSelector'
import { AddButton } from '../../simples/AddButton'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import styles from './PermissionsForm.module.scss'
import { H } from '../../simples/modalEditor/H'

const groupsNumbers: { [group in UserGroups]: number } = {
    [UserGroups.Root]: 1,
    [UserGroups.Owner]: 2,
    [UserGroups.Club]: 3,
    [UserGroups.Employer]: 4,
    [UserGroups.Manager]: 5,
    [UserGroups.Service]: 6,
    [UserGroups.User]: 7,
}

const groupsOptions: {
    [group in UserGroups]: Array<{ value: number; label: string }>
} = {
    [UserGroups.Root]: [
        {
            value: groupsNumbers[UserGroups.Owner],
            label: getUserGroupName(UserGroups.Owner),
        },
        {
            value: groupsNumbers[UserGroups.Club],
            label: getUserGroupName(UserGroups.Club),
        },
        {
            value: groupsNumbers[UserGroups.Employer],
            label: getUserGroupName(UserGroups.Employer),
        },
        {
            value: groupsNumbers[UserGroups.Manager],
            label: getUserGroupName(UserGroups.Manager),
        },
        {
            value: groupsNumbers[UserGroups.Service],
            label: getUserGroupName(UserGroups.Service),
        },
    ],
    [UserGroups.Owner]: [
        {
            value: groupsNumbers[UserGroups.Club],
            label: getUserGroupName(UserGroups.Club),
        },
        {
            value: groupsNumbers[UserGroups.Employer],
            label: getUserGroupName(UserGroups.Employer),
        },
        {
            value: groupsNumbers[UserGroups.Manager],
            label: getUserGroupName(UserGroups.Manager),
        },
        {
            value: groupsNumbers[UserGroups.Service],
            label: getUserGroupName(UserGroups.Service),
        },
    ],
    [UserGroups.Club]: [
        {
            value: groupsNumbers[UserGroups.Employer],
            label: getUserGroupName(UserGroups.Employer),
        },
    ],
    [UserGroups.Employer]: [
        {
            value: groupsNumbers[UserGroups.Employer],
            label: getUserGroupName(UserGroups.Employer),
        },
    ],
    [UserGroups.Manager]: [],
    [UserGroups.Service]: [],
    [UserGroups.User]: [],
}

type Props = {
    permissions?: UserPermissions
    onChange: (permissions?: UserPermissions) => void
}

const PermissionsForm: FC<Props> = ({ permissions, onChange }) => {
    const user = useAppSelector(selectAuthUser)
    const outlets = useAppSelector(selectOutlets)
    const outletsOptions = useMemo(() => {
        return outlets.map((outlet) => ({ id: outlet.id, value: outlet.name }))
    }, [outlets])
    const automats = useAppSelector(selectAutomats)
    const automatsOptions = useMemo(() => {
        return automats.map((automat) => ({
            id: automat.id,
            value: automat.name,
        }))
    }, [automats])

    const handleGroupChange = (value: number) => {
        const groups = Object.keys(groupsNumbers) as Array<UserGroups>
        const group = groups.find((g) => groupsNumbers[g] === value)

        if (!group) {
            onChange(undefined)
            return
        }

        if (permissions && permissions.group === group) {
            return
        } else if (group === UserGroups.Club || group === UserGroups.Service) {
            onChange({
                group,
                outlets: [],
            })
        } else if (group === UserGroups.Employer) {
            onChange({
                group: UserGroups.Employer,
                automats: [],
            })
        } else {
            onChange({
                group,
            })
        }
    }

    const handleClubOutletChange = (value: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Club) {
            throw new Error('User group is not club')
        }

        onChange({
            ...permissions,
            outlets: value > 0 ? [value] : [],
        })
    }

    // Start: Методы для выбора автоматов
    const [addingAutomat, setAddingAutomat] = useState(false)
    useEffect(() => {
        if (
            permissions &&
            permissions.group === UserGroups.Employer &&
            permissions.automats.length === 0
        ) {
            setAddingAutomat(true)
        }
    }, [permissions])

    const handleNewAutomatChange = (value: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Employer) {
            throw new Error('User group is not employer')
        }

        onChange({
            ...permissions,
            automats: [...permissions.automats, value],
        })

        setAddingAutomat(false)
    }

    const handleAutomatChange = (value: number, index: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Employer) {
            throw new Error('User group is not employer')
        }

        onChange({
            ...permissions,
            automats: permissions.automats.map((automatId, i) => {
                if (i === index) {
                    return value
                }

                return automatId
            }),
        })
    }

    const deleteAutomat = (index: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Employer) {
            throw new Error('User group is not employer')
        }

        onChange({
            ...permissions,
            automats: permissions.automats.filter((_, i) => i !== index),
        })
    }
    // End: Методы для выбора автоматов

    // Start: Методы для выбора торговых точек
    const [addingOutlet, setAddingOutlet] = useState(false)
    useEffect(() => {
        if (
            permissions &&
            permissions.group === UserGroups.Service &&
            permissions.outlets.length === 0
        ) {
            setAddingOutlet(true)
        }
    }, [permissions])

    const handleNewOutletChange = (value: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Service) {
            throw new Error('User group is not service')
        }

        onChange({
            ...permissions,
            outlets: [...permissions.outlets, value],
        })

        setAddingOutlet(false)
    }

    const handleOutletChange = (value: number, index: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Service) {
            throw new Error('User group is not service')
        }

        onChange({
            ...permissions,
            outlets: permissions.outlets.map((outletId, i) => {
                if (i === index) {
                    return value
                }

                return outletId
            }),
        })
    }

    const deleteOutlet = (index: number) => {
        if (!permissions) {
            throw new Error('Group not selected')
        }

        if (permissions.group !== UserGroups.Service) {
            throw new Error('User group is not service')
        }

        onChange({
            ...permissions,
            outlets: permissions.outlets.filter((_, i) => i !== index),
        })
    }

    // End: Методы для выбора торговых точек

    if (!user) {
        throw new Error('User is not logged in')
    }

    const userGroup = useMemo(() => {
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
        } else {
            return UserGroups.Manager
        }
    }, [user])

    return (
        <div className={styles.root}>
            <H level={3}>Роли и права</H>

            <Row>
                <Col>
                    <Selector
                        options={groupsOptions[userGroup]}
                        label={'Роль пользователя'}
                        value={
                            permissions ? groupsNumbers[permissions.group] : 0
                        }
                        onChange={handleGroupChange}
                    />
                </Col>
            </Row>

            {!permissions ? null : permissions.group === UserGroups.Club ? (
                <Row>
                    <Col>
                        <Selector
                            options={outlets.map((outlet) => ({
                                value: outlet.id,
                                label: outlet.name,
                            }))}
                            label={'Торговая точка'}
                            value={
                                permissions.outlets.length > 0
                                    ? permissions.outlets[0]
                                    : 0
                            }
                            onChange={handleClubOutletChange}
                        />
                    </Col>
                </Row>
            ) : permissions.group === UserGroups.Employer ? (
                <div className={styles.fieldsGroups}>
                    <H level={3}>Доступные автоматы</H>

                    {permissions.automats.map((automatId, index) => (
                        <Row key={automatId}>
                            <Col>
                                <div className={styles.fieldGroup}>
                                    <div className={styles.fieldGroupSelector}>
                                        <SearchSelector
                                            value={automatId}
                                            options={automatsOptions}
                                            onClick={(option) =>
                                                handleAutomatChange(
                                                    option.id,
                                                    index
                                                )
                                            }
                                            placeholder={'Выберите автомат'}
                                        />
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => deleteAutomat(index)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    ))}

                    {addingAutomat && (
                        <Row>
                            <Col>
                                <div className={styles.fieldGroup}>
                                    <div className={styles.fieldGroupSelector}>
                                        <SearchSelector
                                            value={0}
                                            options={automatsOptions}
                                            onClick={(option) =>
                                                handleNewAutomatChange(
                                                    option.id
                                                )
                                            }
                                            placeholder={'Выберите автомат'}
                                        />
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setAddingAutomat(false)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <AddButton
                                label={'Добавить автомат'}
                                onClick={() => setAddingAutomat(true)}
                            />
                        </Col>
                        <Col />
                    </Row>
                </div>
            ) : permissions.group === UserGroups.Service ? (
                <div className={styles.fieldsGroups}>
                    <H level={3}>Доступные торговые точки</H>

                    {permissions.outlets.map((outletId, index) => (
                        <Row key={outletId}>
                            <Col>
                                <div className={styles.fieldGroup}>
                                    <div className={styles.fieldGroupSelector}>
                                        <SearchSelector
                                            value={outletId}
                                            options={outletsOptions}
                                            onClick={(option) =>
                                                handleOutletChange(
                                                    option.id,
                                                    index
                                                )
                                            }
                                            placeholder={
                                                'Выберите торговую точку'
                                            }
                                        />
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => deleteOutlet(index)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    ))}

                    {addingOutlet && (
                        <Row>
                            <Col>
                                <div className={styles.fieldGroup}>
                                    <div className={styles.fieldGroupSelector}>
                                        <SearchSelector
                                            value={0}
                                            options={outletsOptions}
                                            onClick={(option) =>
                                                handleNewOutletChange(option.id)
                                            }
                                            placeholder={
                                                'Выберите торговую точку'
                                            }
                                        />
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setAddingOutlet(false)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <AddButton
                                label={'Добавить торговую точку'}
                                onClick={() => setAddingOutlet(true)}
                            />
                        </Col>
                        <Col />
                    </Row>
                </div>
            ) : null}
        </div>
    )
}

export default PermissionsForm
