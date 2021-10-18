import React, { FC } from 'react'
import classNames from 'classnames'

import { Modal } from '../../Modal'
import { Button, ButtonKind } from '../../Button'
import styles from './Editor.module.scss'

export type Props = {
    header: string
    // buttons:
    classes?: {
        modalRoot?: string
        modalUnderlay?: string
        modalModal?: string
        modalContainer?: string
        modalClose?: string
        buttons?: string
    }
    submitButtonName?: string
    submitDisabled?: boolean
    submitLoading?: boolean
    onSubmit?: () => void
    onCancel?: () => void
}

/**
 *
 * @param classes
 * @param header
 * @param submitButtonName
 * @param submitDisabled
 * @param submitLoading
 * @param onSubmit
 * @param onCancel
 * @param children
 * @returns
 */

const Editor: FC<Props> = ({
    classes = {},
    header,
    submitButtonName = 'Сохранить',
    submitDisabled = false,
    submitLoading = false,
    onSubmit,
    onCancel,
    children,
}) => {
    const modalClasses = {
        root: classNames(styles.modalRoot, classes.modalRoot),
        underline: classNames(styles.modalUnderlay, classes.modalUnderlay),
        modal: classNames(styles.modalModal, classes.modalModal),
        container: classNames(styles.modalContainer, classes.modalContainer),
        close: classNames(styles.modalClose, classes.modalClose),
    }

    return (
        <Modal classes={modalClasses} onClose={onCancel} showClose>
            <h3 className={styles.header}>{header}</h3>

            <div className={styles.body}>{children}</div>

            <div className={classNames(styles.buttons, classes.buttons)}>
                <Button onClick={onCancel} kind={ButtonKind.Link}>
                    Отмена
                </Button>
                <Button
                    onClick={onSubmit}
                    kind={ButtonKind.Primary}
                    disabled={submitDisabled}
                    loading={submitLoading}
                >
                    {submitButtonName}
                </Button>
            </div>
        </Modal>
    )
}

export default Editor
