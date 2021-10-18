import React, { FC, useCallback, useEffect, useState } from 'react'
import {
    Translations as TranslationsType,
    LangKeys as LangKeysType,
} from '../../../types'
import { Localizations as LocalizationsService } from '../../../services/Localizations'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import styles from './LocalizationEditor.module.scss'
import { H } from '../../simples/modalEditor/H'
import { useAppSelector } from '../../hooks/store'

const initLangKey: LangKeysType = {
    id: 0,
    name: '',
    translations: [
        // {
        //     languageId: 1,
        //     translate: '',
        // },
        // {
        //     languageId: 2,
        //     translate: '',
        // },
        // {
        //     languageId: 3,
        //     translate: '',
        // },
    ],
}

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    langKey?: LangKeysType
    onSubmit: (langKey: LangKeysType) => void
    onClose: () => void
}

const LocalizationEditor: FC<Props> = ({
    langKey = initLangKey,
    onClose,
    onSubmit,
}) => {
    const [langKeysCurrent, setLangKeysCurrent] =
        useState<LangKeysType>(langKey)
    const langs = useAppSelector((state) => state.storage.langs)

    const [loading, setLoading] = useState(false)

    const onChangeComponent = useCallback(
        (langId: number, value: string) => {
            let updated = false

            let newTranslations = langKeysCurrent.translations.map(
                (translate) => {
                    if (translate.languageId === langId) {
                        updated = true

                        return {
                            ...translate,
                            translate: value,
                        }
                    }

                    return translate
                }
            )

            if (!updated) {
                newTranslations = [
                    ...newTranslations,
                    { languageId: langId, translate: value },
                ]
            }

            setLangKeysCurrent({
                ...langKeysCurrent,
                translations: newTranslations,
            })
        },
        [langKeysCurrent]
    )

    const submit = async () => {
        let savedLocalization: LangKeysType

        setLoading(true)

        if (langKeysCurrent.id > 0) {
            savedLocalization = await LocalizationsService.update({
                id: langKeysCurrent.id,
                name: langKeysCurrent.name,
                translations: langKeysCurrent.translations,
            })
        } else {
            savedLocalization = await LocalizationsService.create({
                name: langKeysCurrent.name,
                translations: langKeysCurrent.translations,
            })
        }

        setLoading(false)
        onSubmit(savedLocalization)
    }

    return (
        <Editor
            header={langKeysCurrent.id > 0 ? 'Редактирование' : 'Создание'}
            submitButtonName={langKeysCurrent.id > 0 ? 'Сохранить' : 'Создать'}
            submitDisabled={!langKeysCurrent.name}
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
            classes={editorClasses}
        >
            <Row>
                <Col>
                    <div>Название ключа</div>
                    <TextField
                        placeholder={'Медиа ключ'}
                        value={langKeysCurrent.name}
                        onChange={(event) =>
                            setLangKeysCurrent({
                                ...langKeysCurrent,
                                name: event.target.value,
                            })
                        }
                    />
                </Col>
            </Row>

            <H level={2}>Переводы</H>

            {langs.map((lang) => {
                const translate = langKeysCurrent.translations.find(
                    (t) => t.languageId === lang.id
                )

                return (
                    <Row>
                        <Col>
                            <TextField
                                placeholder={'Перевод'}
                                value={translate ? translate.translate : ''}
                                onChange={(event) =>
                                    onChangeComponent(
                                        lang.id,
                                        event.target.value
                                    )
                                }
                                label={lang.name}
                            />
                        </Col>
                    </Row>
                )
            })}
        </Editor>
    )
}

export default LocalizationEditor
