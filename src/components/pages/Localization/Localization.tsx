import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import { Localizations as LocalizationsService } from '../../../services/Localizations'
import {
    LangKeys as LangKeysType,
    LanguageList as LanguageListType,
} from '../../../types'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import { TopPanel } from '../../simples/tablePages/TopPanel'
import { ItemsList } from '../../simples/tablePages/ItemsList'
import { LocalizationEditor } from '../../complexes/LocalizationEditor'
import { Confirm } from '../../simples/Confirm'
import { OptionType, Selector } from '../../simples/Selector'
import { TopLangPanel } from '../../simples/tablePages/TopLangPanel'
import { useAppSelector } from '../../hooks/store'
import ImportMessage from '../../complexes/ImportMessage/ImportMessage'

const header = ['Ключ', 'Список языков']

const Localization: FC = () => {
    const [localizations, setLocalizations] = useState<Array<LangKeysType>>([])
    const localizationCurrent = useRef<Array<LangKeysType>>(localizations)
    localizationCurrent.current = localizations
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const noTranslateLang = useRef(0)
    const search = useRef('')
    const has = useRef(true)
    // const [langList, setLangList] = useState<Array<OptionType>>()
    const langs = useAppSelector((state) => state.storage.langs)
    const [file, setFile] = useState<File>()
    const [showSuccessMess, setShowSuccessMess] = useState<boolean>(false)

    const [showLocalizationEditor, setShowLocalizationEditor] = useState(false)
    const [editedLocalization, setEditedLocalization] = useState<LangKeysType>()

    const [deletedLocalizationId, setDeletedLocalizationId] = useState(0)

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await LocalizationsService.getList({
            offset: offset.current,
            noTranslateLang: noTranslateLang.current,
            search: search.current,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        setLocalizations([...localizationCurrent.current, ...result])
        offset.current = offset.current + result.length
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        noTranslateLang.current = 0
        search.current = ''
        setLocalizations([])
    }

    useEffect(() => {
        load().then()
    }, [])

    const handleEndReached = async () => {
        await load()
    }

    const handleSearch = async (text: string) => {
        clear()
        search.current = text
        await load()
    }

    const handleLanguage = async (value: number) => {
        clear()
        noTranslateLang.current = value
        await load()
    }

    const startCreateLocalization = () => {
        setShowLocalizationEditor(true)
    }

    const startUpdateLocalization = (localizationId: number) => {
        const localization = localizations.find((b) => b.id === localizationId)

        if (!localization) {
            return
        }

        setShowLocalizationEditor(true)
        setEditedLocalization(localization)
    }

    const handleSubmit = async (savedLocalization: LangKeysType) => {
        let updated = false

        let newLocalizations = localizations.map((b) => {
            if (b.id === savedLocalization.id) {
                updated = true
                return savedLocalization
            }

            return b
        })

        if (!updated) {
            newLocalizations = [savedLocalization, ...newLocalizations]
        }

        setLocalizations(newLocalizations)

        closeLocalizationEditor()
    }

    const closeLocalizationEditor = () => {
        setShowLocalizationEditor(false)
        setEditedLocalization(undefined)
    }

    const closeImportMessage = () => {
        setShowSuccessMess(false)
    }

    const startDeleteLocalization = (localizationId: number) => {
        setDeletedLocalizationId(localizationId)
    }

    const cancelLocalizationDelete = () => {
        setDeletedLocalizationId(0)
    }

    const confirmLocalizationDelete = async () => {
        setDeletedLocalizationId(0)
        await LocalizationsService.delete(deletedLocalizationId)

        setLocalizations(
            localizations.filter(
                (localization) => localization.id !== deletedLocalizationId
            )
        )
    }

    const rows = useMemo(() => {
        return localizations.map((localization) => {
            return {
                id: localization.id,
                values: [
                    localization.name,
                    localization.translations
                        .map((item) => {
                            const lang = langs.find(
                                (l) => l.id === item.languageId
                            )

                            if (!lang) {
                                return ''
                            }

                            return lang.name
                        })
                        .join(', '),
                ],
            }
        })
    }, [localizations, langs])

    const importFile = async (file: File) => {
        if (!file || loading) {
            return
        }
        console.log('setLoading IMPORT ')

        setLoading(true)
        const result = await LocalizationsService.import({
            file: file,
        })
        setLoading(false)

        setShowSuccessMess(true)

        // if (!result.length) {
        //     has.current = false
        //     return
        // }

        // setLocalizations([...localizationCurrent.current, ...result])
    }

    // const handleImport = (file: File) => {
    //     // importLangKeys
    // }
    const handleLangChange = () => {}

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'База переводов:'} />
            <TopLangPanel
                createButtonName={'Ключ'}
                importButtonName={'Импорт файла'}
                onCreateButtonClick={startCreateLocalization}
                onSearch={handleSearch}
                onImport={importFile}
                onLangChange={handleLanguage}
                loading={loading}
            />

            <ItemsList
                headers={header}
                rows={rows}
                loading={loading}
                onEdit={startUpdateLocalization}
                onDelete={startDeleteLocalization}
            />

            {showLocalizationEditor && (
                <LocalizationEditor
                    langKey={editedLocalization}
                    onSubmit={handleSubmit}
                    onClose={closeLocalizationEditor}
                />
            )}

            {showSuccessMess && (
                <ImportMessage
                    // langKey={editedLocalization}
                    onSubmit={closeImportMessage}
                    onClose={closeLocalizationEditor}
                />
            )}

            {!!deletedLocalizationId && (
                <Confirm
                    text="Вы действительно хотите удалить модель?"
                    onConfirm={confirmLocalizationDelete}
                    onCancel={cancelLocalizationDelete}
                />
            )}
        </Layout>
    )
}

export default Localization
