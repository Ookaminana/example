import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Props as EmailFieldProps, EmailField } from './index'
import { TextFieldStatus } from '../TextField'

export default {
    component: EmailField,
    title: 'EmailField',
} as Meta

const Template: Story<EmailFieldProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
        }}
    >
        <EmailField {...args} />
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
