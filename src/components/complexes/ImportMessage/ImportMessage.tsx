import React, { FC, useState } from 'react'
import { Editor } from '../../simples/modalEditor/Editor'
import styles from './ImportMessage.module.scss'

const editorClasses = {
    modalModal: styles.modal,
    buttons: styles.buttons,
}

type Props = {
    onSubmit: () => void
    onClose: () => void
}

const ImportMessage: FC<Props> = ({ onClose, onSubmit }) => {
    return (
        <Editor
            header={'Импорт успешно завершен'}
            submitButtonName={'Ок'}
            submitDisabled={false}
            // submitLoading={loading}
            onSubmit={onSubmit}
            onCancel={onClose}
            classes={editorClasses}
        ></Editor>
    )
}

export default ImportMessage
