import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '.';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCheckbox: Story = {};
