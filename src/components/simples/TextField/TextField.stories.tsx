import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Props as TextFieldProps, TextField } from './index'
import { TextFieldStatus } from './TextField'

export default {
    component: TextField,
    title: 'TextField',
} as Meta

const Template: Story<TextFieldProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
        }}
    >
        <TextField {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    placeholder: 'Ваше имя',
}

export const Error = Template.bind({})
Error.args = {
    value: 'Протеиновый коктейль',
    status: TextFieldStatus.Error,
    note: 'Некорректное значение',
}
