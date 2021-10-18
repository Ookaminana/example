import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Preview } from '../Preview'
import styles from './UploadPhoto.module.scss'

type Props = {
    defaultPhotoUrl?: string
    onChange?: (file: File) => void
}

const UploadPhoto: FC<Props> = ({ defaultPhotoUrl = '', onChange }) => {
    const [url, setUrl] = useState(defaultPhotoUrl)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length < 0) {
            return
        }

        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onloadend = function (event) {
            if (
                !event.target ||
                !event.target.result ||
                typeof event.target.result !== 'string'
            ) {
                return null
            }

            setUrl(event.target.result)
        }

        reader.readAsDataURL(file)

        if (onChange) {
            onChange(file)
        }
    }

    console.log('UploadPhoto', { url })

    return (
        <label
            className={classNames(styles.root, { [styles.showPhoto]: !!url })}
        >
            <input
                type="file"
                className={styles.input}
                onChange={handleFileChange}
            />

            <span className={styles.label}>Загрузите фото</span>
            <span className={styles.formats}>Форматы: pdf, png, mp4, jpg</span>

            {url && (
                <span
                    className={styles.photo}
                    style={{ backgroundImage: `url("${url}")` }}
                />
            )}
        </label>
    )
}

export default UploadPhoto
