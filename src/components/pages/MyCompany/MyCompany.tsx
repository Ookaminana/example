import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../config'
import { Company as CompanyType } from '../../../types'
import { Company as CompanyService } from '../../../services/Company'
import { useAppDispatch } from '../../hooks/store'
import { showToast } from '../../../store/slices/site'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import {
    CompanyEditForm,
    ResultDataForm,
} from '../../complexes/CompanyEditForm'

const MyCompany: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const [company, setCompany] = useState<CompanyType>()
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        CompanyService.getMyCompany().then((company) => {
            setCompany(company)
        })
    }, [])

    const handleSave = async (data: ResultDataForm) => {
        setSaving(true)

        await CompanyService.updateMyCompany({
            name: data.name,
            contacts: data.contacts.map((contact) => ({
                ...contact,
                confirmed: contact.confirmed ? true : false,
            })),
        })

        if (data.photo) {
            await CompanyService.updateMyCompanyPhoto(data.photo)
        }

        setSaving(false)

        dispatch(showToast('Настройки компании сохранены.'))
    }

    const handleCancel = () => {
        history.push(routes.home)
    }

    return (
        <Layout>
            <Header text={'Настройки компании'} />

            {company && (
                <CompanyEditForm
                    data={{
                        name: company.name,
                        contacts: company.contacts || [],
                        photo: company.photoPath || '',
                    }}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    loading={saving}
                />
            )}
        </Layout>
    )
}

export default MyCompany
