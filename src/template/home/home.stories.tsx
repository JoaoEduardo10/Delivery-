import { Meta, StoryObj } from '@storybook/react';
import { TemplateHome } from './home';

const meta = {
  title: 'Home',
  component: TemplateHome,
} satisfies Meta<typeof TemplateHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomeTemplate: Story = {};
