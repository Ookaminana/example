import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'

import styles from './Modal.module.scss'

const modalParent = document.createElement('div')
modalParent.className = styles.modalParent
document.body.appendChild(modalParent)

type Props = {
    classes?: {
        root?: string
        underlay?: string
        modal?: string
        container?: string
        close?: string
    }
    showClose?: boolean
    onClose?: () => void
}

const Modal: FC<Props> = ({
    classes = {},
    showClose = false,
    onClose,
    children,
}) => {
    return ReactDOM.createPortal(
        <div className={classNames(styles.root, classes.root)}>
            <div
                className={classNames(styles.underlay, classes.underlay)}
            ></div>
            <div className={classNames(styles.modal, classes.modal)}>
                <div
                    className={classNames(styles.container, classes.container)}
                >
                    {children}
                </div>

                {showClose && (
                    <button
                        className={classNames(styles.close, classes.close)}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
        </div>,
        modalParent
    )
}

export default Modal
