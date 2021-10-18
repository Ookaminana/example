import React, { ChangeEvent, FC, useState } from 'react'

import styles from './ProfilePhotoUploader.module.scss'
import Default from '../../../assets/images/defaultPhoto.png'
import { Spinner } from '../../simples/Spinner'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'

type Props = {
    defaultPhoto?: string
    loading?: boolean
    onFileSelect?: (file: File) => void
    onDeletePhoto?: () => void
}

const ProfilePhotoUploader: FC<Props> = ({
    defaultPhoto = '',
    loading = false,
    onFileSelect,
    onDeletePhoto,
}) => {
    const [photoUrl, setPhotoUrl] = useState(defaultPhoto)

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }

        const photo = event.target.files[0]

        const reader = new FileReader()
        reader.onloadend = function (event) {
            if (
                !event.target ||
                !event.target.result ||
                typeof event.target.result !== 'string'
            ) {
                return null
            }

            setPhotoUrl(event.target.result)
        }

        reader.readAsDataURL(photo)

        onFileSelect && onFileSelect(photo)
    }

    const handleDelete = () => {
        setPhotoUrl('')
        onDeletePhoto && onDeletePhoto()
    }

    return (
        <>
            <div className={styles.h}>Изображение профиля:</div>
            <div className={styles.photo}>
                <div
                    className={styles.img}
                    style={{
                        backgroundImage: photoUrl
                            ? `url("${photoUrl}")`
                            : `url("${Default}")`,
                    }}
                ></div>
                <div className={styles.btns}>
                    <div className={styles.top}>
                        <label className={styles.importButtonContainer}>
                            Загрузить фото
                            {loading && (
                                <div className={styles.loader}>
                                    <Spinner />
                                </div>
                            )}
                            <input
                                type="file"
                                className={styles.file}
                                onChange={handlePhotoChange}
                            />
                        </label>
                        <div className={styles.delete} onClick={handleDelete}>
                            <DeleteIcon />
                        </div>
                    </div>
                    <div className={styles.discribe}>
                        Поддерживаемые форматы: JPEG, PNG или GIF. Макс. размер:
                        10 МБ.
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePhotoUploader
