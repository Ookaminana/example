import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Props as PassFieldProps, PassField } from './index'
import { TextFieldStatus } from '../TextField'

export default {
    component: PassField,
    title: 'PassField',
} as Meta

const Template: Story<PassFieldProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
        }}
    >
        <PassField {...args} />
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
