import { Meta, StoryObj } from '@storybook/react';
import { PhotoDisplay } from '.';
import image from './image/logo.png';

const meta = {
  title: 'PhotoDisplay',
  component: PhotoDisplay,
  args: {
    image: `${image}`,
  },
} satisfies Meta<typeof PhotoDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplatePhotoDisplay: Story = {};
