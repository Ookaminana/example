import React, { FC, TextareaHTMLAttributes } from 'react'

import styles from './Textarea.module.scss'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: FC<Props> = ({ ...rest }) => {
    return <textarea className={styles.root} {...rest} />
}

export default Textarea
