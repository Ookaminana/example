import React, { FC, useState, ChangeEvent } from 'react'
import { NewsType } from '../../../types'
import { News as NewsService } from '../../../services/NewsService'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'

import styles from './NewsEditor.module.scss'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { Textarea } from '../../simples/Textarea'
import { UploadPhoto } from '../../simples/UploadPhoto'

export type SourceFormData = {
    id: number
    title: string
    content: string
    photoPath: string | null
}

const initNews: SourceFormData = {
    id: 0,
    title: '',
    content: '',
    photoPath: null,
}

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    news?: SourceFormData
    onSubmit: (news: NewsType) => void
    onClose: () => void
}

const NewsEditor: FC<Props> = ({ news = initNews, onSubmit, onClose }) => {
    const [title, setTitle] = useState(news.title)
    const [content, setContent] = useState(news.content)
    const [photoFile, setPhotoFile] = useState<File>()

    const [loading, setLoading] = useState(false)

    const submit = async () => {
        if (!title || !content || (!news.id && !photoFile)) {
            throw new Error('Name or photo is empty')
        }

        setLoading(true)

        let savedNews = news.id
            ? await NewsService.update(news.id, { title, content })
            : await NewsService.create({ title, content })

        if (photoFile) {
            savedNews = await NewsService.uploadPhoto(savedNews.id, photoFile)
        }

        onSubmit(savedNews)
    }

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value.substring(0, 300)
        setContent(value)
    }

    return (
        <Editor
            header={
                news.id > 0 ? 'Редактирование новости:' : 'Создание новости:'
            }
            submitButtonName={news.id > 0 ? 'Сохранить' : 'Создать'}
            submitDisabled={!title || !content || (!news.id && !photoFile)}
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
            classes={editorClasses}
        >
            <Row>
                <Col>
                    <UploadPhoto
                        defaultPhotoUrl={news.photoPath || ''}
                        onChange={setPhotoFile}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        placeholder={'Заголовок'}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Textarea
                        placeholder={'Основной текст до 300 символов'}
                        value={content}
                        onChange={handleContentChange}
                        // label={'Описание'}
                    />
                </Col>
            </Row>
        </Editor>
    )
}

export default NewsEditor
