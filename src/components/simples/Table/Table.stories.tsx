import React from 'react'

import { Meta, Story } from '@storybook/react'

import { Table, THead, Th, TBody, Tr, Td } from './index'

export default {
    component: Table,
    title: 'Table',
} as Meta

const Template: Story = (args) => (
    <div
        style={{
            backgroundColor: '#fff',
        }}
    >
        <Table>
            <THead>
                <Th>Название</Th>
                <Th>Мета кей</Th>
                <Th></Th>
            </THead>
            <TBody>
                <Tr>
                    <Td>Шейкер</Td>
                    <Td>Item.Shaker</Td>
                    <Td></Td>
                </Tr>
                <Tr>
                    <Td>Стакан</Td>
                    <Td>Item.Cup</Td>
                    <Td></Td>
                </Tr>
                <Tr>
                    <Td>Бункер</Td>
                    <Td>Item.Bunker</Td>
                    <Td></Td>
                </Tr>
            </TBody>
        </Table>
    </div>
)

export const Default = Template.bind({})
Default.args = {}
