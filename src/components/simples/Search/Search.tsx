import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg'
import styles from './Search.module.scss'

type Props = {
    onSearch?: (search: string) => void
    classes?: {
        root?: string
        form?: string
        icon?: string
        input?: string
    }
}

const Search: FC<Props> = ({ onSearch, classes = {} }) => {
    const [search, setSearch] = useState('')

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSearch && onSearch(search)
    }

    return (
        <div className={classNames(styles.root, classes.root)}>
            <form
                className={classNames(styles.form, classes.form)}
                onSubmit={handleSubmit}
            >
                <SearchIcon className={classNames(styles.icon, classes.icon)} />
                <input
                    className={classNames(styles.input, classes.input)}
                    placeholder={'Поиск'}
                    value={search}
                    onChange={handleSearchChange}
                />
            </form>
        </div>
    )
}

export default Search
