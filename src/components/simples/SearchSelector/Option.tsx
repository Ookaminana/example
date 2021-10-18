import React, { FC, memo } from 'react'
import { OptionSelectorType } from './SearchSelector'

import styles from './SearchSelector.module.scss'

type Props = {
    option: OptionSelectorType
    onClick: (option: OptionSelectorType) => void
}

const Option: FC<Props> = ({ option, onClick }) => {
    return (
        <div className={styles.option} onClick={() => onClick(option)}>
            {option.value}
        </div>
    )
}

export default memo(Option)
