import React, { FC, useState } from 'react'

import { Table, THead, Th, TBody, Tr, Td } from '../../Table'
import { ReactComponent as EditIcon } from '../../../../assets/icons/editEmptyFill.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/deleteEmptyFill.svg'
import { Spinner } from '../../Spinner'
import { Outlet } from './Outlet'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../../../config'
import { route } from '../../../../utils/route'

import styles from './CompanyItem.module.scss'
import { Company as CompanyType } from '../../../../types'

type Props = {
    headers: Array<string>
    rows: Array<{
        id: number
        values: Array<string>
    }>
    company: CompanyType
    loading?: boolean
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

const CompanyItem: FC<Props> = ({
    headers,
    rows,
    company,
    loading = false,
    onEdit,
    onDelete,
}) => {
    const navigation = useHistory()
    const [currentCompany, setCirrentCompany] = useState(company)

    return (
        <div className={styles.root}>
            <div className={styles.leftWrapper}>
                <div
                    className={styles.editIcon}
                    onClick={() =>
                        navigation.push(
                            route(routes.editCompany, { id: currentCompany.id })
                        )
                    }
                >
                    <EditIcon />
                </div>

                <div className={styles.logo}>
                    <div className={styles.nameLogo}>
                        <div
                            className={styles.img}
                            style={{
                                backgroundImage: company.photoPath
                                    ? `url("${company.photoPath}")`
                                    : undefined,
                            }}
                        />
                        <div className={styles.name}>
                            <Link
                                to={`${routes.outlets}?companyId=${currentCompany.id}`}
                            >
                                {currentCompany.name}
                            </Link>
                        </div>
                    </div>

                    <div
                        className={styles.deleteIcon}
                        onClick={() => onDelete && onDelete(currentCompany.id)}
                    >
                        <DeleteIcon />
                    </div>
                </div>

                <div className={styles.info}>
                    <span className={styles.h}>Контактная информация:</span>
                    {currentCompany.contacts &&
                        currentCompany.contacts
                            .sort((c1, c2) => {
                                if (
                                    c1.type === 'email' &&
                                    c2.type === 'phone'
                                ) {
                                    return -1
                                } else if (
                                    c1.type === 'phone' &&
                                    c2.type === 'email'
                                ) {
                                    return 1
                                }
                                return 0
                            })
                            .map((contact) => {
                                return (
                                    <div className={styles.label}>
                                        {contact.type === 'email'
                                            ? 'Почта: '
                                            : 'Контактный номер: '}
                                        <span className={styles.white}>
                                            {contact.contact}
                                        </span>
                                    </div>
                                )
                            })}
                </div>
            </div>
            <div className={styles.rightWrapper}>
                <span className={styles.h}>Торговые точки:</span>
                {currentCompany.outlets && (
                    <div className={styles.automats}>
                        <Outlet outlets={currentCompany.outlets} />
                    </div>
                )}
            </div>

            {loading && (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default CompanyItem
