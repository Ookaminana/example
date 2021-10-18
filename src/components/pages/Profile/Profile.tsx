import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import styles from './Profile.module.scss'
import { Profile as ProfileType } from '../../../types'
import { User as UserService } from '../../../services/User'
import { UserEditForm, ResultDataForm } from '../../complexes/UserEditForm'
import { useAppSelector, useAppDispatch } from '../../hooks/store'
import { selectAuthUser } from '../../../store/slices/auth'
import { showToast } from '../../../store/slices/site'
import { routes } from '../../../config'

const Profile = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [profile, setProfile] = useState<ProfileType | null>()
    const user = useAppSelector(selectAuthUser)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setLoading(true)

        setProfile(user)

        setLoading(false)
    }, [user])

    const onHandleSave = async (
        data: ResultDataForm,
        deletePhoto: boolean = false
    ) => {
        setSaveLoading(true)

        const savedProfile = await UserService.update({
            fullName: data.name,
            contacts: data.contacts.map((contact) => ({
                ...contact,
                confirmed: contact.confirmed ? true : false,
            })),
        })

        if (data.photo) {
            await UserService.uploadPhoto(data.photo)
        } else if (deletePhoto) {
            await UserService.deletePhoto()
        }

        setSaveLoading(false)
        dispatch(showToast('Профиль успешно сохранен!'))
    }

    const onHandleCancel = () => {
        history.push(routes.home)
    }

    return (
        <Layout>
            <Header text={'Настройки профиля:'} />

            {loading ? (
                <></>
            ) : profile ? (
                <div className={styles.root}>
                    <UserEditForm
                        data={
                            profile
                                ? {
                                      name: profile.fullName,
                                      contacts: profile.contacts || [],
                                      photo: profile.photoPath || '',
                                  }
                                : undefined
                        }
                        onSave={onHandleSave}
                        onCancel={onHandleCancel}
                        loading={saveLoading}
                    />
                </div>
            ) : null}
        </Layout>
    )
}

export default Profile
