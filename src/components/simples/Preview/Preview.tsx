import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './Preview.module.scss'

const imgExts = ['.png', '.jpg', '.bmp']

const videoExts = ['.mp4']

type Props = {
    src: string | null
    className?: string
}

const Preview: FC<Props> = ({ src, className }) => {
    if (!src) {
        return <div className={classNames(styles.img, className)} />
    }

    const dotIndex = src.lastIndexOf('.')

    const ext = src.substring(dotIndex)

    if (imgExts.indexOf(ext) !== -1) {
        return (
            <div
                className={classNames(styles.img, className)}
                style={{
                    backgroundImage: src ? `url("${src}")` : undefined,
                }}
            />
        )
    } else if (videoExts.indexOf(ext) !== -1) {
        return (
            <video
                className={classNames(styles.video, className)}
                preload="metadata"
                controls
            >
                <source src={src} />
            </video>
        )
    }

    return null
}

export default Preview
