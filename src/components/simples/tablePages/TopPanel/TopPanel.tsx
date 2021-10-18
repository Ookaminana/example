import React, { FC } from 'react'

import { Button } from '../../Button'
import { Search } from '../../Search'
import styles from './TopPanel.module.scss'

const buttonClasses = {
    button: styles.createButton,
}

type Props = {
    createButtonName: string
    onCreateButtonClick: () => void
    onSearch: (search: string) => void
}

const TopPanel: FC<Props> = ({
    createButtonName,
    onCreateButtonClick,
    onSearch,
}) => {
    return (
        <div className={styles.root}>
            <div className={styles.createButtonContainer}>
                <Button
                    classNames={buttonClasses}
                    onClick={onCreateButtonClick}
                >
                    {createButtonName}
                </Button>
            </div>
            <div className={styles.searchContainer}>
                <Search onSearch={onSearch} />
            </div>
        </div>
    )
}

export default TopPanel
