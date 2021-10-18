import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import { NewsType } from '../../../types'
import { Layout } from '../../complexes/Layout'
import { News as NewsService } from '../../../services/NewsService'
import { Header } from '../../simples/tablePages/Header'
import { TopPanel } from '../../simples/tablePages/TopPanel'
import { ItemsGrid } from '../../simples/ItemsGrid'
import { NewsEditor } from '../../complexes/NewsEditor'
import { SourceFormData } from '../../complexes/NewsEditor/NewsEditor'
import { Confirm } from '../../simples/Confirm'

const News: FC = () => {
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const search = useRef('')
    const has = useRef(true)
    const [news, setNews] = useState<Array<NewsType>>([])
    const newsCurrent = useRef<Array<NewsType>>(news)
    newsCurrent.current = news
    const [showNewsEditor, setShowNewsEditor] = useState(false)
    const [editedNews, setEditedNews] = useState<SourceFormData>()
    const [deletedNewsId, setDeletedNewsId] = useState(0)

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await NewsService.getNewsList({
            offset: offset.current,
            search: search.current,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        offset.current = offset.current + result.length
        setNews([...newsCurrent.current, ...result])
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        search.current = ''
        setNews([])
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

    const startCreateNews = () => {
        setShowNewsEditor(true)
    }

    const data: Array<{
        id: number
        photo: string | null
        title: string
        description?: string
    }> = useMemo(() => {
        return news.map((newsItem) => ({
            id: newsItem.id,
            photo: newsItem.photoPath,
            title: newsItem.title,
            description: newsItem.content,
        }))
    }, [news])

    const closeNewsEditor = () => {
        setShowNewsEditor(false)
        setEditedNews(undefined)
    }

    const handleSubmit = async (savedNews: NewsType) => {
        let updated = false
        let newNews = news.map((n) => {
            if (n.id === savedNews.id) {
                updated = true
                return savedNews
            }

            return n
        })

        if (!updated) {
            newNews = [savedNews, ...newNews]
        }

        setNews(newNews)

        closeNewsEditor()
    }

    const startUpdateNews = (newsId: number) => {
        const newsItem = news.find((am) => am.id === newsId)

        if (!newsItem) {
            throw new Error('Ad material not found')
        }

        setEditedNews({
            id: newsItem.id,
            title: newsItem.title,
            content: newsItem.content,
            photoPath: newsItem.photoPath,
        })
        setShowNewsEditor(true)
    }

    const startDeleteNews = (newsId: number) => {
        setDeletedNewsId(newsId)
    }

    const confirmNewsDelete = async () => {
        setDeletedNewsId(0)
        await NewsService.delete(deletedNewsId)
        setNews(news.filter((n) => n.id !== deletedNewsId))
    }

    const cancelNewsDelete = () => {
        setDeletedNewsId(0)
    }

    // console.log('news', news)
    // console.log('newsCurrent', newsCurrent)
    // console.log('data', data)

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'Размещение новостей:'} />
            <TopPanel
                createButtonName={'Создать новость'}
                onCreateButtonClick={startCreateNews}
                onSearch={handleSearch}
            />
            <ItemsGrid
                data={data}
                onEdit={startUpdateNews}
                onDelete={startDeleteNews}
            />
            {showNewsEditor && (
                <NewsEditor
                    news={editedNews}
                    onClose={closeNewsEditor}
                    onSubmit={handleSubmit}
                />
            )}

            {!!deletedNewsId && (
                <Confirm
                    text={'Вы действительно хотите удалить новость?'}
                    onConfirm={confirmNewsDelete}
                    onCancel={cancelNewsDelete}
                />
            )}
        </Layout>
    )
}

export default News
