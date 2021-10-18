import React, { FC } from 'react'

import styles from './Selector.module.scss'

export type OptionType = {
    value: number
    label: string
}

type Props = {
    option: OptionType
    onClick: (option: OptionType) => void
}

const Option: FC<Props> = ({ option, onClick }) => {
    return (
        <div className={styles.option} onClick={() => onClick(option)}>
            {option.label}
        </div>
    )
}

export default Option
