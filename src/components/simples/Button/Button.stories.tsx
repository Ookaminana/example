import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Button, ButtonKind, ButtonProps } from './index'

export default {
    component: Button,
    title: 'Button',
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Кнопка</Button>

export const Default = Template.bind({})
Default.args = {}

export const LoadingDefault = Template.bind({})
LoadingDefault.args = {
    loading: true,
}

export const Link = Template.bind({})
Link.args = {
    kind: ButtonKind.Link,
}
