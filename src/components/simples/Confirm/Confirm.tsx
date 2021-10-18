import React, { FC } from 'react'

import styles from './Confirm.module.scss'
import { Modal } from '../Modal'
import { Button, ButtonKind } from '../Button'

type Props = {
    text: string
    onConfirm: () => void
    onCancel: () => void
}

const Confirm: FC<Props> = ({ text, onConfirm, onCancel }) => {
    return (
        <Modal>
            <div className={styles.root}>
                <div className={styles.text}>{text}</div>

                <div className={styles.buttons}>
                    <Button onClick={onCancel} kind={ButtonKind.Link}>
                        Отмена
                    </Button>
                    <Button onClick={onConfirm} kind={ButtonKind.Primary}>
                        Да
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default Confirm
