import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './TableCheckbox.module.scss'

type Props = {
    checked?: boolean | 'partly'
    onChange?: (checked: boolean) => void
}

const TableCheckbox: FC<Props> = ({ checked = false, onChange }) => {
    const handleClick = () => {
        onChange && onChange(!checked)
    }

    return (
        <div
            className={classNames(styles.root, {
                [styles.checked]: checked === true,
                [styles.partly]: checked === 'partly',
            })}
            onClick={handleClick}
        />
    )
}

export default TableCheckbox
