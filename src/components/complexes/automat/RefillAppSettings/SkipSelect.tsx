import React, { FC, useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import { ReactComponent as ArrowIcon } from '../../../../assets/icons/skip-select-arrow.svg'
import styles from './RefillAppSettings.module.scss'

type Props = {
    skip: boolean
    onChange: (skip: boolean) => void
}

export const SkipSelect: FC<Props> = ({ skip, onChange }) => {
    const selectRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

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
        <div
            className={classNames(styles.skipSelect, { [styles.open]: isOpen })}
            ref={selectRef}
        >
            <div className={styles.skipSelectControl} onClick={toggleOpen}>
                <div className={styles.skipSelectValue}>
                    {skip ? 'Пропустить' : 'Пополнить'}
                </div>
                <div className={styles.skipSelectArrow}>
                    <ArrowIcon />
                </div>
            </div>

            <div className={styles.skipSelectMenu}>
                <div
                    className={styles.skipSelectOption}
                    onClick={() => {
                        onChange(false)
                        close()
                    }}
                >
                    Пополнить
                </div>
                <div
                    className={styles.skipSelectOption}
                    onClick={() => {
                        onChange(true)
                        close()
                    }}
                >
                    Пропустить
                </div>
            </div>
        </div>
    )
}
