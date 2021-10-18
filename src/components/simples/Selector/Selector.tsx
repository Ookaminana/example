import React, { FC, useState, useMemo, useCallback, useRef } from 'react'
import classNames from 'classnames'

import styles from './Selector.module.scss'
import { Option, OptionType } from './index'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/select-arrow.svg'

export type Props = {
    options: Array<OptionType>
    label: string
    labled?: boolean
    value?: number
    onChange?: (value: number) => void
}
/**
 *
 * @param options
 * @param label
 * @param labled
 * @param value
 * @param onChange
 * @returns
 */

const Selector: FC<Props> = ({ options, label, value, onChange, labled }) => {
    const selectRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const view = useMemo(() => {
        const selectedOption = options.find((option) => option.value === value)

        if (selectedOption) {
            return selectedOption.label
        }

        return label
    }, [label, options, value])

    const handleOptionClick = (option: OptionType) => {
        close()

        if (!onChange) {
            return
        }

        onChange(option.value)
    }

    const toggleOpen = () => {
        if (isOpen) {
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

    // Функция открытия
    const open = useCallback(() => {
        setIsOpen(true)
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

    return (
        <div className={classNames(styles.root, { [styles.open]: isOpen })}>
            {labled && <div className={styles.labeled}>{label}</div>}
            <div className={styles.controller} onClick={toggleOpen}>
                <div
                    className={classNames(styles.label, {
                        [styles.placeholder]: !value,
                    })}
                >
                    {view}
                </div>
                <ArrowIcon className={styles.arrow} />
            </div>

            {options.length > 0 && (
                <div className={styles.menu}>
                    {options.map((option, index) => (
                        <Option
                            key={index}
                            option={option}
                            onClick={handleOptionClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Selector
