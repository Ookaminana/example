import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Promotion as PromotionType } from '../../../types'
import { Promotion as PromotionService } from '../../../services/Promotion'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { SearchSelector } from '../../simples/SearchSelector'
import InputMask from 'react-input-mask'
import { selectAutomats, selectProducts } from '../../../store/slices/storage'

import styles from './PromotionEditor.module.scss'
import { useAppSelector } from '../../hooks/store'
import { MaskField } from '../../simples/MaskField'
import moment from 'moment'

export type PromotionParamsType = {
    id: number
    productId: number
    automatId: number
    price: number
    startAt: string
    endAt: string
}

const initPromotion: PromotionParamsType = {
    id: 0,
    productId: 0,
    automatId: 0,
    price: 0,
    startAt: moment(new Date()).format('YYYY-MM-DD'),
    endAt: moment(new Date()).format('YYYY-MM-DD'),
}

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    promotion?: PromotionParamsType
    onSubmit: (promotion: PromotionType) => void
    onClose: () => void
}

const PromotionEditor: FC<Props> = ({
    promotion = initPromotion,
    onSubmit,
    onClose,
}) => {
    const [productId, setProductId] = useState<number>(promotion.productId)
    const [automatId, setAutomatId] = useState<number>(promotion.automatId)
    const automats = useAppSelector(selectAutomats)
    const products = useAppSelector(selectProducts)

    const [price, setPrice] = useState<number>(promotion.price)
    const [startAt, setStartAt] = useState<string>(promotion.startAt)
    const [endAt, setEndAt] = useState<string>(promotion.endAt)
    const [loading, setLoading] = useState(false)
    const [errorMess, setErrorMess] = useState(false)
    // const [errorDateMess, setErrorDateMess] = useState(false)

    const checkDate = (date: string) => {
        const darr = date.split('-')
        const month = darr[1].split('')
        const day = darr[2].split('')

        if (
            (+month[0] === 1 && +month[1] > 2) ||
            +month[0] > 1 ||
            +day[0] > 3 ||
            (+day[0] === 3 && +day[1] > 1) ||
            darr[1] === '00' ||
            darr[2] === '00'
        ) {
            // setErrorDateMess(true)
            return false
        }
        return true

        // var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

        // const reg = /(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        // console.log(date.match(reg));

        // if(date.match(reg)){

        // }
    }

    const handleStartAtChange = (event: ChangeEvent<HTMLInputElement>) => {
        //date:any
        const value = event.target.value //  date
        if (checkDate(value)) {
            setStartAt(value)
        } // else {
        //     setStartAt(value.slice(0, -1))
        //     console.log('1', event.target.value) // date
        //
        //     console.log(value.slice(0, -1))
        // }
        // if(moment(value, 'YYYY-MM-DD',true).isValid()){

        //     console.log(true);

        // }else{
        //     //setStartAt(value)
        //     console.log(false)
        // }
    }

    useEffect(() => {
        if (!startAt && !endAt) return
        const start = new Date(startAt)
        const end = new Date(endAt)

        if (start > end) {
            setErrorMess(true)
        } else {
            setErrorMess(false)
        }
    }, [startAt, endAt])

    const submit = async () => {
        let savedPromotion: PromotionType

        setLoading(true)

        if (promotion.id > 0) {
            savedPromotion = await PromotionService.update(promotion.id, {
                productId,
                automatId,
                price,
                startAt,
                endAt,
            })
        } else {
            savedPromotion = await PromotionService.create({
                productId,
                automatId,
                price,
                startAt,
                endAt,
            })
        }

        setLoading(false)
        onSubmit(savedPromotion)
    }

    return (
        <Editor
            header={
                promotion.id > 0
                    ? 'Редактирование рекламной акции'
                    : 'Создание рекламной акции'
            }
            submitButtonName={promotion.id > 0 ? 'Сохранить' : 'Создать'}
            submitDisabled={
                !productId || !automatId || !price || !startAt || !endAt
            }
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
            classes={editorClasses}
        >
            <Row>
                <Col>
                    <SearchSelector
                        value={productId}
                        options={products.map((a) => ({
                            id: a.id,
                            value: a.name,
                        }))}
                        onClick={(option) => setProductId(option.id)}
                        placeholder={'Выбор продукта'}
                    />
                </Col>
                <Col>
                    <TextField
                        placeholder={'Цена'}
                        value={price === 0 ? '' : price}
                        onChange={(event) => setPrice(+event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col css={styles.dates}>
                    <div className={styles.dateStart}>
                        <MaskField
                            mask={'9999-99-99'}
                            placeholder={'Дата начала рекламной акции'}
                            value={startAt}
                            onChange={handleStartAtChange}
                        />
                    </div>
                    <div className={styles.dateEnd}>
                        <MaskField
                            mask={'9999-99-99'}
                            placeholder={'Дата конца рекламной акции'}
                            value={endAt}
                            onChange={(event) => setEndAt(event.target.value)}
                        />
                    </div>
                </Col>
                <Col>
                    <SearchSelector
                        value={automatId}
                        options={automats.map((a) => ({
                            id: a.id,
                            value: a.name,
                        }))}
                        onClick={(option) => setAutomatId(option.id)}
                        placeholder={'Выбор автомата'}
                    />
                </Col>
            </Row>
            {errorMess && (
                <Row>
                    <Col>
                        <div className={styles.errorMess}>
                            Дата окончания действия промокода не может быть
                            меньше даты начала действия промокода
                        </div>
                    </Col>
                </Row>
            )}
        </Editor>
    )
}

export default PromotionEditor
