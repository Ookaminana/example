import React, { FC, useEffect, useMemo, useState } from 'react'
import { PromoCode as PromoCodeType } from '../../../types'
import { PromoCode as PromoCodeService } from '../../../services/PromoCode'
import { TextField } from '../../simples/TextField'
import { Editor } from '../../simples/modalEditor/Editor'

import styles from './PromoCodeEditor.module.scss'
import { Row } from '../../simples/modalEditor/Row'
import { Col } from '../../simples/modalEditor/Col'
import { Textarea } from '../../simples/Textarea'
import { UploadPhoto } from '../../simples/UploadPhoto'
import { selectAutomats, selectTastes } from '../../../store/slices/storage'
import { useAppSelector } from '../../hooks/store'
import { MaskField } from '../../simples/MaskField'
import moment from 'moment'
import { H } from '../../simples/modalEditor/H'
import { SearchSelector } from '../../simples/SearchSelector'
import { AddButton } from '../../simples/AddButton'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'

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

const initPromoCode: SourceFormData = {
    id: 0,
    promoCode: '',
    startAt: new Date(),
    endAt: new Date(),
    usageAmount: 0,
    discount: 0,
    automatsIds: [],
    tastes: '',
}

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    promoCode?: SourceFormData
    onSubmit: (PromoCode: SourceFormData) => void
    onClose: () => void
}

const PromoCodeEditor: FC<Props> = ({
    promoCode = initPromoCode,
    onSubmit,
    onClose,
}) => {
    // promoCode, startAt, endAt, usageAmount, discount, automatsIds, tastes
    const [code, setCode] = useState(promoCode.promoCode)
    const [startAt, setStartAt] = useState(
        `${moment(promoCode.startAt).format('YYYY-MM-DD')}`
    )
    const [endAt, setEndAt] = useState(
        `${moment(promoCode.endAt).format('YYYY-MM-DD')}`
    )
    const [usageAmount, setUsageAmount] = useState(promoCode.usageAmount)
    const [discount, setDiscount] = useState(promoCode.discount)
    const [automatsIds, setAutomatsIds] = useState<Array<number>>(
        promoCode?.automatsIds || []
    )
    const [tastesIds, setTastesIds] = useState<Array<any>>(
        promoCode.tastes.split(',')
    )
    // const [tastesArray, setTastesArray] = useState(promoCode.tastes)
    const [errorMess, setErrorMess] = useState(false)

    const [addingTaste, setAddingTaste] = useState(false)

    const tastes = useAppSelector(selectTastes)
    const tastesOptions = useMemo(() => {
        return tastes.map((taste) => ({
            id: taste.id,
            value: taste.name,
        }))
    }, [tastes])

    const [addingAutomat, setAddingAutomat] = useState(false)
    const automats = useAppSelector(selectAutomats)
    const automatsOptions = useMemo(() => {
        return automats.map((automat) => ({
            id: automat.id,
            value: automat.name,
        }))
    }, [automats])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (promoCode && promoCode.automatsIds.length === 0) {
            setAddingAutomat(true)
        }
    }, [promoCode])

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
        if (
            !promoCode ||
            !startAt ||
            !endAt ||
            !usageAmount ||
            !discount ||
            !automatsIds ||
            !tastesIds
        ) {
            throw new Error('Name or photo is empty')
        }

        setLoading(true)

        let savedPromoCode = promoCode.id
            ? await PromoCodeService.update(promoCode.id, {
                  promoCode: code,
                  startAt: new Date(startAt),
                  endAt: new Date(endAt),
                  usageAmount,
                  discount,
                  automatsIds,
                  tastes: tastesIds.join(','),
              })
            : await PromoCodeService.create({
                  promoCode: code,
                  startAt: new Date(startAt),
                  endAt: new Date(endAt),
                  usageAmount,
                  discount,
                  automatsIds,
                  tastes: tastesIds.join(','),
              })

        onSubmit(savedPromoCode)
    }

    const handleTasteChange = (value: number, index: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }

        let newTastesIds = tastesIds.map((tasteId, i) => {
            if (i === index) {
                return value
            }

            return tasteId
        })
        setTastesIds(newTastesIds)
    }

    const handleAutomatChange = (value: number, index: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }

        console.log('!!!handleAutomatChange', value, ' + ', index)

        let newAutomatsIds = automatsIds.map((automatId, i) => {
            if (i === index) {
                return value
            }
            return automatId
        })

        setAutomatsIds(newAutomatsIds)
    }

    const deleteAutomat = (index: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }

        // if (promoCode.group !== UserGroups.Employer) {
        //     throw new Error('User group is not employer')
        // }
        // setAutomatsIds(
        //     [...automatsIds, value]
        // )
        setAutomatsIds(automatsIds.filter((_, i) => i !== index))
    }
    const deleteTaste = (index: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }
        setTastesIds(tastesIds.filter((_, i) => i !== index))
    }

    const handleNewAutomatChange = (value: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }

        console.log('!!!handleNewAutomatChange')

        // if (permissions.group !== UserGroups.Employer) {
        //     throw new Error('User group is not employer')
        // }

        setAutomatsIds([...automatsIds, value])

        setAddingAutomat(false)
    }

    const handleNewTasteChange = (value: number) => {
        if (!promoCode) {
            throw new Error('Group not selected')
        }

        setTastesIds([...tastesIds, `${value}`])

        setAddingTaste(false)
    }

    return (
        <Editor
            header={
                promoCode.id > 0
                    ? 'Редактирование промокода:'
                    : 'Создание промокода:'
            }
            submitButtonName={promoCode.id > 0 ? 'Сохранить' : 'Создать'}
            submitDisabled={
                !code ||
                !startAt ||
                !endAt ||
                startAt > endAt ||
                !usageAmount ||
                !discount ||
                !automatsIds ||
                !tastes
            }
            submitLoading={loading}
            onSubmit={submit}
            onCancel={onClose}
            classes={editorClasses}
        >
            <Row>
                <Col>
                    <TextField
                        placeholder={'Промокод'}
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col css={styles.dates}>
                    <div className={styles.dateStart}>
                        <MaskField
                            mask={'9999-99-99'}
                            placeholder={'Дата начала рекламной акции'}
                            value={`${startAt}`}
                            onChange={(event) => setStartAt(event.target.value)}
                        />
                    </div>
                    <div className={styles.dateEnd}>
                        <MaskField
                            mask={'9999-99-99'}
                            placeholder={'Дата конца рекламной акции'}
                            value={`${endAt}`}
                            onChange={(event) => setEndAt(event.target.value)}
                        />
                    </div>
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
            <Row>
                <Col>
                    <TextField
                        placeholder={'Кол-во использований'}
                        value={usageAmount === 0 ? '' : usageAmount}
                        onChange={(event) =>
                            setUsageAmount(+event.target.value)
                        }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField
                        placeholder={'Скидка'}
                        value={discount === 0 ? '' : discount}
                        onChange={(event) => setDiscount(+event.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className={styles.fieldsGroups}>
                        <H level={3}>Доступные автоматы</H>
                        {/* { console.log('automatsIds',automatsIds) } */}
                        {automatsIds?.map((automatId, index) => (
                            <Row key={automatId}>
                                <Col>
                                    <div className={styles.fieldGroup}>
                                        <div
                                            className={
                                                styles.fieldGroupSelector
                                            }
                                        >
                                            <SearchSelector
                                                value={automatId}
                                                options={automatsOptions}
                                                onClick={(option) =>
                                                    handleAutomatChange(
                                                        option.id,
                                                        index
                                                    )
                                                }
                                                placeholder={'Выберите автомат'}
                                            />
                                        </div>

                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => deleteAutomat(index)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        ))}

                        {addingAutomat && (
                            <Row>
                                <Col>
                                    <div className={styles.fieldGroup}>
                                        <div
                                            className={
                                                styles.fieldGroupSelector
                                            }
                                        >
                                            <SearchSelector
                                                value={0}
                                                options={automatsOptions}
                                                onClick={(option) =>
                                                    handleNewAutomatChange(
                                                        option.id
                                                    )
                                                }
                                                placeholder={'Выберите автомат'}
                                            />
                                        </div>

                                        <button
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                setAddingAutomat(false)
                                            }
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col>
                                <AddButton
                                    label={'Добавить автомат'}
                                    onClick={() => setAddingAutomat(true)}
                                />
                            </Col>
                            <Col />
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className={styles.fieldsGroups}>
                        <H level={3}>Доступные вкусы</H>

                        {tastesIds.map((tasteId, index) => (
                            <Row key={tasteId}>
                                <Col>
                                    <div className={styles.fieldGroup}>
                                        <div
                                            className={
                                                styles.fieldGroupSelector
                                            }
                                        >
                                            <SearchSelector
                                                value={+tasteId}
                                                options={tastesOptions}
                                                onClick={(option) =>
                                                    handleTasteChange(
                                                        option.id,
                                                        index
                                                    )
                                                }
                                                placeholder={'Выберите вкус'}
                                            />
                                        </div>

                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => deleteTaste(index)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        ))}

                        {addingTaste && (
                            <Row>
                                <Col>
                                    <div className={styles.fieldGroup}>
                                        <div
                                            className={
                                                styles.fieldGroupSelector
                                            }
                                        >
                                            <SearchSelector
                                                value={0}
                                                options={tastesOptions}
                                                onClick={(option) =>
                                                    handleNewTasteChange(
                                                        option.id
                                                    )
                                                }
                                                placeholder={'Выберите вкус'}
                                            />
                                        </div>

                                        <button
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                setAddingTaste(false)
                                            }
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col>
                                <AddButton
                                    label={'Добавить вкус'}
                                    onClick={() => setAddingTaste(true)}
                                />
                            </Col>
                            <Col />
                        </Row>
                    </div>
                </Col>
            </Row>
        </Editor>
    )
}

export default PromoCodeEditor
