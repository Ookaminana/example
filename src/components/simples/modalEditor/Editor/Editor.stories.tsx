import React, { useState } from 'react'

import { Meta, Story } from '@storybook/react'

import { Editor, EditorProps } from './index'
import { Button } from '../../Button'

export default {
    component: Editor,
    title: 'Editor',
} as Meta

const Template: Story<EditorProps> = (args) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(false)}>Открыть</Button>

            {open && <Editor {...args}></Editor>}
        </>
    )
}

export const Default = Template.bind({})
Default.args = {
    header: 'Заголовок окна',
}
