import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Models as ModelsService } from '../../../services/Models'
import { AutomatModel as ModelType, AutomatModelTypes } from '../../../types'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import { TopPanel } from '../../simples/tablePages/TopPanel'
import { ItemsList } from '../../simples/tablePages/ItemsList'
import { ModelEditor } from '../../complexes/ModelEditor'
import { Confirm } from '../../simples/Confirm'

const header = ['Название модели', 'Тип автомата']

const Model: FC = () => {
    const [models, setModels] = useState<Array<ModelType>>([])
    const modelCurrent = useRef<Array<ModelType>>(models)
    modelCurrent.current = models
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const search = useRef('')
    const has = useRef(true)

    const [showModelEditor, setShowModelEditor] = useState(false)
    const [editedModel, setEditedModel] = useState<ModelType>()

    const [deletedModelId, setDeletedModelId] = useState(0)

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await ModelsService.getModels({
            offset: offset.current,
            search: search.current,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        offset.current = offset.current + result.length
        setModels([...modelCurrent.current, ...result])
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        search.current = ''
        setModels([])
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

    const startCreateModel = () => {
        setShowModelEditor(true)
    }

    const startUpdateModel = (modelId: number) => {
        const model = models.find((b) => b.id === modelId)

        if (!model) {
            return
        }

        setShowModelEditor(true)
        setEditedModel(model)
    }

    const handleSubmit = async (savedModel: ModelType) => {
        let updated = false

        let newModels = models.map((b) => {
            if (b.id === savedModel.id) {
                updated = true
                return savedModel
            }

            return b
        })

        if (!updated) {
            newModels = [savedModel, ...newModels]
        }

        setModels(newModels)

        closeModelEditor()
    }

    const closeModelEditor = () => {
        setShowModelEditor(false)
        setEditedModel(undefined)
    }

    const startDeleteModel = (modelId: number) => {
        setDeletedModelId(modelId)
    }

    const cancelModelDelete = () => {
        setDeletedModelId(0)
    }

    const confirmModelDelete = async () => {
        setDeletedModelId(0)
        await ModelsService.delete(deletedModelId)

        setModels(models.filter((model) => model.id !== deletedModelId))
    }

    const rows = useMemo(() => {
        return models.map((model) => {
            let type = ''
            switch (model.type) {
                case AutomatModelTypes.Beverages:
                    type = 'Напитки'
                    break

                case AutomatModelTypes.Snack:
                    type = 'Снеки'
                    break

                case AutomatModelTypes.Coffee:
                    type = 'Кофе'
                    break
            }

            return {
                id: model.id,
                values: [model.name, type],
            }
        })
    }, [models])

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'Создание базы:'} />
            <TopPanel
                createButtonName={'Создать'}
                onCreateButtonClick={startCreateModel}
                onSearch={handleSearch}
            />
            <ItemsList
                headers={header}
                rows={rows}
                loading={loading}
                onEdit={startUpdateModel}
                onDelete={startDeleteModel}
            />

            {showModelEditor && (
                <ModelEditor
                    model={editedModel}
                    onSubmit={handleSubmit}
                    onClose={closeModelEditor}
                />
            )}

            {!!deletedModelId && (
                <Confirm
                    text="Вы действительно хотите удалить модель?"
                    onConfirm={confirmModelDelete}
                    onCancel={cancelModelDelete}
                />
            )}
        </Layout>
    )
}

export default Model
