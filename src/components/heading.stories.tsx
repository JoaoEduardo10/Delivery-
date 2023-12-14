import { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading';

const meta = {
  title: 'Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateHeading: Story = {};
