import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import moment from 'moment'
import { Promotion as PromotionService } from '../../../services/Promotion'
import {
    AutomatType,
    ProductType,
    Promotion as PromotionType,
} from '../../../types'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import { TopPanel } from '../../simples/tablePages/TopPanel'
import { ItemsList } from '../../simples/tablePages/ItemsList'
import {
    PromotionEditor,
    PromotionParamsType,
} from '../../complexes/PromotionEditor'
import { Confirm } from '../../simples/Confirm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import {
    loadAutomats,
    loadProducts,
    selectAutomats,
    selectProducts,
} from '../../../store/slices/storage'

import styles from './Promotion.module.scss'

const header = [
    'Список продуктов',
    'Цена',
    'Дата начала',
    'Дата окончания',
    'Автомат',
]

const Promotion: FC = () => {
    const [promotions, setPromotions] = useState<Array<PromotionType>>([])
    const promotionCurrent = useRef<Array<PromotionType>>(promotions)
    promotionCurrent.current = promotions
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const search = useRef('')
    const has = useRef(true)

    const automats = useAppSelector(selectAutomats)
    const products = useAppSelector(selectProducts)

    const [showPromotionEditor, setShowPromotionEditor] = useState(false)
    const [editedPromotion, setEditedPromotion] =
        useState<PromotionParamsType>()

    const [deletedPromotionId, setDeletedPromotionId] = useState(0)

    const dispatch = useAppDispatch()

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await PromotionService.getPromotions({
            offset: offset.current,
            search: search.current,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        offset.current = offset.current + result.length
        setPromotions([...promotionCurrent.current, ...result])
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        search.current = ''
        setPromotions([])
    }

    useEffect(() => {
        load().then()
        dispatch(loadProducts())
        dispatch(loadAutomats())
    }, [])

    const handleEndReached = async () => {
        await load()
    }

    const handleSearch = async (text: string) => {
        clear()
        search.current = text
        await load()
    }

    const startCreatePromotion = () => {
        setShowPromotionEditor(true)
    }

    const startUpdatePromotion = (promotionId: number) => {
        const promotion = promotions.find((b) => b.id === promotionId)

        if (!promotion) {
            return
        }

        setShowPromotionEditor(true)
        setEditedPromotion({
            ...promotion,
            startAt: moment(promotion.startAt).format('YYYY-MM-DD'),
            endAt: moment(promotion.endAt).format('YYYY-MM-DD'),
        })
    }

    const handleSubmit = async (savedPromotion: PromotionType) => {
        let updated = false
        let newPromotions = promotions.map((b) => {
            if (b.id === savedPromotion.id) {
                updated = true
                return savedPromotion
            }

            return b
        })

        if (!updated) {
            newPromotions = [savedPromotion, ...newPromotions]
        }

        setPromotions(newPromotions)

        closePromotionEditor()
    }

    const closePromotionEditor = () => {
        setShowPromotionEditor(false)
        setEditedPromotion(undefined)
    }

    const startDeletePromotion = (promotionId: number) => {
        setDeletedPromotionId(promotionId)
    }

    const cancelPromotionDelete = () => {
        setDeletedPromotionId(0)
    }

    const confirmPromotionDelete = async () => {
        setDeletedPromotionId(0)
        await PromotionService.delete(deletedPromotionId)
        setPromotions(
            promotions.filter(
                (promotion) => promotion.id !== deletedPromotionId
            )
        )
    }

    const rows = useMemo(() => {
        return promotions.map((promotion) => ({
            id: promotion.id,
            values: [
                `${products.find((i) => i.id === promotion.product.id)?.name}`,
                `${promotion.price}`,
                <span className={styles.dateData}>
                    {moment(promotion.startAt).format('YYYY-MM-DD')}
                </span>,
                <span className={styles.dateData}>
                    {moment(promotion.endAt).format('YYYY-MM-DD')}
                </span>,
                `${automats.find((i) => i.id === promotion.automat.id)?.name}`,
            ],
        }))
    }, [promotions, automats, products])

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'Создание базы:'} />
            <TopPanel
                createButtonName={'Создать рекламную акцию'}
                onCreateButtonClick={startCreatePromotion}
                onSearch={handleSearch}
            />
            <ItemsList
                headers={header}
                rows={rows}
                loading={loading}
                onEdit={startUpdatePromotion}
                onDelete={startDeletePromotion}
            />

            {showPromotionEditor && (
                <PromotionEditor
                    promotion={editedPromotion}
                    onSubmit={handleSubmit}
                    onClose={closePromotionEditor}
                />
            )}

            {!!deletedPromotionId && (
                <Confirm
                    text="Вы действительно хотите удалить бренд?"
                    onConfirm={confirmPromotionDelete}
                    onCancel={cancelPromotionDelete}
                />
            )}
        </Layout>
    )
}

export default Promotion
