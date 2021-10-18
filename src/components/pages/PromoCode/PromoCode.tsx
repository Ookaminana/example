import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import moment from 'moment'
import { PromoCode as PromoCodeService } from '../../../services/PromoCode'
import {
    AutomatType,
    ProductType,
    PromoCode as PromoCodeType,
} from '../../../types'
import { Layout } from '../../complexes/Layout'
import { Header } from '../../simples/tablePages/Header'
import { TopPanel } from '../../simples/tablePages/TopPanel'
import { ItemsList } from '../../simples/tablePages/ItemsList'
import { PromoCodeEditor } from '../../complexes/PromoCodeEditor'
import { Confirm } from '../../simples/Confirm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import {
    loadAutomats,
    loadProducts,
    loadTastes,
    selectAutomats,
    selectProducts,
    selectTastes,
} from '../../../store/slices/storage'

import styles from './PromoCode.module.scss'

const header = [
    'Промокод',
    'Дата начала',
    'Дата окончания',
    'Кол-во использований',
    'Размер скидки',
    'Автоматы',
    'Вкусы',
]

export type SourceFormData = {
    id: number
    promoCode: string
    startAt: Date
    endAt: Date
    usageAmount: number
    discount: number
    automatsIds: Array<number>
    tastes: string
}

const PromoCode: FC = () => {
    const [promoCodes, setPromoCodes] = useState<Array<SourceFormData>>([])
    const promoCodesCurrent = useRef<Array<SourceFormData>>(promoCodes)
    promoCodesCurrent.current = promoCodes
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const search = useRef('')
    const has = useRef(true)

    const automats = useAppSelector(selectAutomats)
    const products = useAppSelector(selectProducts)
    const tastes = useAppSelector(selectTastes)

    const [showPromoCodeEditor, setShowPromoCodeEditor] = useState(false)
    const [editedPromoCode, setEditedPromoCode] = useState<SourceFormData>()

    const [deletedPromoCodeId, setDeletedPromoCodeId] = useState(0)

    const dispatch = useAppDispatch()

    const load = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)
        const result = await PromoCodeService.getPromoCodes({
            offset: offset.current,
            search: search.current,
        })
        setLoading(false)

        if (!result.length) {
            has.current = false
            return
        }

        offset.current = offset.current + result.length
        setPromoCodes([...promoCodesCurrent.current, ...result])
    }

    const clear = () => {
        has.current = true
        offset.current = 0
        search.current = ''
        setPromoCodes([])
    }

    useEffect(() => {
        load().then()
        dispatch(loadTastes())
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

    const startCreatePromoCode = () => {
        setShowPromoCodeEditor(true)
    }

    const startUpdatePromoCode = (promoCodeId: number) => {
        const promoCode = promoCodes.find((b) => b.id === promoCodeId)

        if (!promoCode) {
            return
        }

        setShowPromoCodeEditor(true)
        // console.log('promoCode',promoCode);
        // const newArr:any = promoCode.automatsIds
        // promoCode.automatsIds = JSON.parse(newArr)
        setEditedPromoCode(promoCode)
    }

    const handleSubmit = async (savedPromoCode: SourceFormData) => {
        // if(!savedPromoCode) return
        let updated = false
        let newPromoCodes = promoCodes.map((b) => {
            if (b.id === savedPromoCode.id) {
                updated = true
                return savedPromoCode
            }

            return b
        })

        if (!updated) {
            newPromoCodes = [savedPromoCode, ...newPromoCodes]
        }

        setPromoCodes(newPromoCodes)

        closePromoCodeEditor()
    }

    const closePromoCodeEditor = () => {
        setShowPromoCodeEditor(false)
        setEditedPromoCode(undefined)
    }

    const startDeletePromoCode = (promoCodeId: number) => {
        setDeletedPromoCodeId(promoCodeId)
    }

    const cancelPromoCodeDelete = () => {
        setDeletedPromoCodeId(0)
    }

    const confirmPromoCodeDelete = async () => {
        setDeletedPromoCodeId(0)
        await PromoCodeService.delete(deletedPromoCodeId)
        setPromoCodes(
            promoCodes.filter(
                (promoCode) => promoCode.id !== deletedPromoCodeId
            )
        )
    }

    const rows = useMemo(() => {
        return promoCodes.map((promoCode) => {
            // let automatsList: string = ''
            // promoCode.automatsIds.forEach((ai) => {
            //     automatsList = automatsList+', '+automats.find((i) => i.id === ai)
            //     return automatsList
            // })
            // console.log('automats', promoCode)

            let automatsString: string = ''
            promoCode.automatsIds.map((i) => {
                if (automatsString === '') {
                    automatsString =
                        automatsString + automats.find((ii) => ii.id == i)?.name
                } else {
                    automatsString =
                        automatsString +
                        ', ' +
                        automats.find((ii) => ii.id == i)?.name
                }
            })

            let tastesString: string = ''
            let tasteArray = promoCode.tastes.split(',')

            tasteArray.map((i) => {
                if (tastesString === '') {
                    tastesString =
                        tastesString + tastes.find((ii) => ii.id == +i)?.name
                } else {
                    tastesString =
                        tastesString +
                        ', ' +
                        tastes.find((ii) => ii.id == +i)?.name
                }
            })

            return {
                id: promoCode.id,
                values: [
                    // `${}`,
                    `${promoCode.promoCode}`,
                    <span className={styles.dateData}>
                        {moment(promoCode.startAt).format('YYYY-MM-DD')}
                    </span>,
                    <span className={styles.dateData}>
                        {moment(promoCode.endAt).format('YYYY-MM-DD')}
                    </span>,
                    `${promoCode.usageAmount}`,
                    `${promoCode.discount}`,
                    automatsString, //JSON.stringify(promoCode.automatsIds), //automatsList,
                    tastesString, //promoCode.tastes,
                    // automats.find((i) => i.id === promoCode.automatsIds),
                ],
            }
        })
    }, [promoCodes, automats, products])

    return (
        <Layout onEndReached={handleEndReached}>
            <Header text={'Создание базы:'} />
            <TopPanel
                createButtonName={'Создать прокомод'}
                onCreateButtonClick={startCreatePromoCode}
                onSearch={handleSearch}
            />
            <ItemsList
                headers={header}
                rows={rows}
                loading={loading}
                onEdit={startUpdatePromoCode}
                onDelete={startDeletePromoCode}
            />

            {showPromoCodeEditor && (
                <PromoCodeEditor
                    promoCode={editedPromoCode}
                    onSubmit={handleSubmit}
                    onClose={closePromoCodeEditor}
                />
            )}

            {!!deletedPromoCodeId && (
                <Confirm
                    text="Вы действительно хотите удалить бренд?"
                    onConfirm={confirmPromoCodeDelete}
                    onCancel={cancelPromoCodeDelete}
                />
            )}
        </Layout>
    )
}

export default PromoCode
