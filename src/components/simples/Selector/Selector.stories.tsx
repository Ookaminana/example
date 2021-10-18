import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Selector, Props as SelectorProps } from './index'

export default {
    component: Selector,
    title: 'Selector',
} as Meta

const Template: Story<SelectorProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#F9F9F9',
            padding: 20,
        }}
    >
        <Selector {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    label: 'Вкус',
    options: [
        { value: 1, label: 'Яблоко' },
        { value: 2, label: 'Апельсин' },
        { value: 3, label: 'Клубника' },
        { value: 4, label: 'Вишня' },
        { value: 5, label: 'Лимон' },
        { value: 6, label: 'Банан' },
        { value: 7, label: 'asldkfj' },
    ],
}
