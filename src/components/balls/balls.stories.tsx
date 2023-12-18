import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Balls } from '.';

const meta = {
  title: 'Balls',
  component: Balls,
} satisfies Meta<typeof Balls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateBalls: Story = {
  render: () => (
    <div style={{ width: '100%', position: 'relative' }}>
      <Balls />
    </div>
  ),
};
