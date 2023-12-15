import { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    onClick: () => alert('cliclou'),
    text: 'Button with position',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateButtonWithPosition: Story = {
  args: {
    position: true,
  },
};

export const TemplateButtonWithoutPosition: Story = {
  args: {
    position: false,
    text: 'Button without position',
  },
  render: (agrs) => (
    <div>
      <Button {...agrs} />
    </div>
  ),
};
