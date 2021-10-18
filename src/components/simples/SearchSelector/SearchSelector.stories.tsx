import React from 'react'

import { Meta, Story } from '@storybook/react'
import { SearchSelector, Props as SearchSelectorProps } from './index'

export default {
    component: SearchSelector,
    title: 'Selector',
} as Meta

const Template: Story<SearchSelectorProps> = (args) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#F9F9F9',
            padding: 20,
        }}
    >
        <SearchSelector {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    label: 'Вкус',
    options: [
        { id: 1, value: 'Яблоко' },
        { id: 2, value: 'Апельсин' },
        { id: 3, value: 'Клубника' },
        { id: 4, value: 'Вишня' },
        { id: 5, value: 'Лимон' },
        { id: 6, value: 'Банан' },
        { id: 7, value: 'asldkfj' },
    ],
}
