import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Button } from '../../Button'
import { Search } from '../../Search'
import { OptionType, Selector } from '../../Selector'
import { useAppSelector } from '../../../hooks/store'
import styles from './TopLangPanel.module.scss'
import { Spinner } from '../../Spinner'

const buttonClasses = {
    button: styles.createButton,
}

const importButtonClasses = {
    button: styles.importButton,
}

type Props = {
    createButtonName: string
    importButtonName: string
    onCreateButtonClick: () => void
    onSearch: (search: string) => void
    onImport: (file: File) => void
    onLangChange: (langId: number) => void
    loading: boolean
}

const TopLangPanel: FC<Props> = ({
    createButtonName,
    importButtonName,
    onCreateButtonClick,
    onSearch,
    onImport,
    onLangChange,
    loading,
}) => {
    const [langCurrent, setLangCurrent] = useState(0)
    const [langList, setLangList] = useState<Array<OptionType>>([])
    const langs = useAppSelector((state) => state.storage.langs)

    useEffect(() => {
        const select: Array<OptionType> = [{ value: 0, label: 'Нет значения' }]
        langs.map((elem) => select.push({ value: elem.id, label: elem.name }))

        setLangList(
            select
            // langs.map((elem) => ({ value: elem.id, label: elem.name }))
        )
    }, [langs])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0]
        onImport(file)
    }

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
            <label className={styles.importButtonContainer}>
                {importButtonName}
                {loading && (
                    <div className={styles.loader}>
                        <Spinner />
                    </div>
                )}
                <input
                    type="file"
                    className={styles.file}
                    onChange={handleChange}
                />
            </label>
            <div className={styles.searchContainer}>
                <Search onSearch={onSearch} />
            </div>
            <div className={styles.selectContainer}>
                <Selector
                    options={langList}
                    label={'Выберите язык'}
                    value={langCurrent}
                    onChange={(e) => {
                        setLangCurrent(e)
                        onLangChange(e)
                        // console.log(langCurrent)
                    }}
                />
            </div>
        </div>
    )
}

export default TopLangPanel
