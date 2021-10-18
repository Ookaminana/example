import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Search } from './index'

export default {
    component: Search,
    title: 'Search',
} as Meta

const Template: Story = (args) => (
    <div
        style={{
            backgroundColor: '#fff',
            padding: '20px',
        }}
    >
        <Search {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {}
