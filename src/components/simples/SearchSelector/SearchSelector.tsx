import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import styles from './SearchSelector.module.scss'
import classNames from 'classnames'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/select-arrow.svg'
import Option from './Option'
import { EventType } from '@testing-library/dom'
import { setConstantValue } from 'typescript'

export type OptionSelectorType = {
    id: number
    value: string
}

export type Props = {
    value: number
    options: Array<OptionSelectorType>
    onClick: (id: OptionSelectorType) => void
    placeholder: string
    label?: string
    disabled?: boolean
}

/**
 *
 * @param value - id выбраной опции
 * @param options - массив опций
 * @param onClick - выбор опции - передаем ее id
 * @param placeholder - placeholder
 * @param label
 * @returns - компонент селектора с поиском
 */

const SearchSelector: FC<Props> = ({
    value,
    options,
    onClick,
    placeholder,
    label,
    disabled = false,
}) => {
    const selectRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const [search, setSearch] = useState<string>('')
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        if (!value) {
            setSearch('')
        }

        const option = options.find((i) => i.id === value)

        if (!option) {
            setSearch('')
        } else {
            setSearch(option.value)
        }
    }, [value, options])

    const [focus, setFocus] = useState<boolean>(false)

    const handleOptionClick = (option: OptionSelectorType) => {
        close()

        if (!onClick) {
            return
        }
        onClick(option)
    }

    // Функция открытия
    const open = useCallback(() => {
        setIsOpen(true)
        setSearching(false)
        // @ts-ignore
        document.addEventListener('click', onHandleClickDocument)
    }, [setIsOpen])

    // Функция закрытия
    const close = useCallback(() => {
        setIsOpen(false)
        // @ts-ignore
        document.removeEventListener('click', onHandleClickDocument)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsOpen])

    const toggleOpen = (e: any) => {
        e.stopPropagation()
        if (isOpen && !focus) {
            close()
        } else {
            open()
        }
    }

    // Обработчик по клику по любой части документа
    // Если клик происходит внутри селектора, то ничего не делается
    const onHandleClickDocument = useCallback((event: MouseEvent) => {
        if (
            event &&
            event.target &&
            selectRef &&
            selectRef.current &&
            selectRef.current.contains(event.target as HTMLElement)
        ) {
            return
        }

        if (close) {
            close()
        }
    }, [])

    /**
     * функция при наборе текста в поиск
     */

    const onHandleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setSearching(true)
    }, [])

    const data = useMemo(() => {
        if (!searching) {
            return options
        }

        return options.filter((i) =>
            i.value.toLowerCase().includes(search.toLowerCase())
        )
    }, [options, search, searching])

    return (
        <div
            ref={selectRef}
            className={classNames(styles.root, {
                [styles.open]: isOpen,
                [styles.disabled]: disabled,
            })}
        >
            <div className={styles.controller} onClick={toggleOpen}>
                <div
                    className={classNames(styles.label, {
                        [styles.placeholder]: !value,
                    })}
                >
                    <input
                        className={styles.input}
                        onBlur={() => setFocus(false)}
                        onFocus={() => setFocus(true)}
                        value={search}
                        placeholder={placeholder}
                        onChange={onHandleSearch}
                    />
                </div>
                <ArrowIcon className={styles.arrow} />
            </div>

            {data.length > 0 && (
                <div className={styles.menu}>
                    <div
                        onClick={toggleOpen}
                        className={classNames(styles.placeholder, styles.empty)}
                    >
                        <span>{placeholder}</span>
                    </div>
                    {data.map((option) => (
                        <Option
                            key={option.id}
                            option={option}
                            onClick={handleOptionClick}
                        />
                    ))}

                    <div className=""></div>
                </div>
            )}
        </div>
    )
}

export default SearchSelector
