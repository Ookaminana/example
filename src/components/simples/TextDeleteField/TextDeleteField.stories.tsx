import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Props as TextDeleteFieldProps, TextDeleteField } from './index'
import { TextDeleteFieldStatus } from './TextDeleteField'

export default {
    component: TextDeleteField,
    title: 'TextDeleteField',
} as Meta

const Template: Story<TextDeleteFieldProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
        }}
    >
        <TextDeleteField {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    placeholder: 'Ваше имя',
}

export const Error = Template.bind({})
Error.args = {
    value: 'Протеиновый коктейль',
    status: TextDeleteFieldStatus.Error,
    note: 'Некорректное значение',
}
