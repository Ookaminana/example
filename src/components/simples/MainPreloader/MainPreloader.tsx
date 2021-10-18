import React, { FC } from 'react'
import style from './MainPreloader.module.scss'
import classNames from 'classnames'

type Props = {
    classes?: {
        loader?: string
    }
}

const MainPreloader: FC<Props> = ({ classes = {} }) => {
    return (
        <div className={classNames(style.loader, classes.loader)}>
            <div className={style.loaderInner}>
                <label>●</label>
                <label>●</label>
                <label>●</label>
                <label>●</label>
                <label>●</label>
                <label>●</label>
            </div>
        </div>
    )
}

export default MainPreloader
