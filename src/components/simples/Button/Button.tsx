import React, { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

export enum ButtonKind {
    Primary,
    Link,
}

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Цвет кнопки
     */
    kind?: ButtonKind
    loading?: boolean
    classNames?: {
        button?: string
        contain?: string
        loader?: string
    }
}

/**
 * Кнопка
 * @param {ButtonKind} kind - Цветовая гамма кнопки
 * @param loading - Показывать ли индикатор загрузки
 * @param children - Содержимое кнопки
 * @param classNames - Дополнительные классы стилей
 * @param rest - Остальные пропсы
 * @constructor
 */
const Button: FC<Props> = ({
    kind = ButtonKind.Primary,
    loading = false,
    children,
    classNames = {},
    ...rest
}: Props) => {
    const classes = cn(styles.button, classNames.button, {
        [styles.link]: kind === ButtonKind.Link,
        [styles.loading]: loading,
    })

    return (
        <button className={classes} {...rest}>
            <span className={cn(styles.contain, classNames.contain)}>
                {children}
            </span>
            <span className={cn(styles.loader, classNames.loader)}>
                <span />
                <span />
                <span />
            </span>
        </button>
    )
}

export default Button
