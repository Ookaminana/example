import React, { FC } from 'react'
import styles from './CheckBox.module.scss'

type Props = {
    value: number
    lable: string
    checked?: boolean
    onChange?: (value: number, checked: boolean) => void
}

const CheckBox: FC<Props> = ({ lable, value, checked = false, onChange }) => {
    const handleClick = () => {
        onChange && onChange(value, !checked)
    }

    return (
        <div className={styles.check}>
            <div className={styles.checkbox} onClick={handleClick}>
                {checked && <div className={styles.mark}> </div>}
            </div>
            <div className={styles.label}>{lable}</div>
        </div>
    )
}

export default CheckBox
