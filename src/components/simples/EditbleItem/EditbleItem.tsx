import React, { FC, memo } from 'react'
import styles from './EditbleItem.module.scss'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import classNames from 'classnames'

type Props = {
    name: string
    id: number
    onEdit: (id: number) => void
    onDelete: (id: number) => void
    classes?: {
        root?: any
    }
}

/**
 *
 * @param name
 * @param onDelete
 * @param onEdit
 * @returns
 */

const EditbleItem: FC<Props> = ({ name, onDelete, onEdit, id, classes }) => {
    return (
        <div className={classNames([styles.root, classes?.root])}>
            <div className={styles.name}>{name}</div>
            <div className={styles.rightBlock}>
                <EditIcon onClick={() => onEdit(id)} />
                <DeleteIcon onClick={() => onDelete(id)} />
            </div>
        </div>
    )
}

export default memo(EditbleItem)
