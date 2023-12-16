import { Meta, StoryObj } from '@storybook/react';
import { CameraCapture } from '.';

const meta = {
  title: 'CameraCapture',
  component: CameraCapture,
  args: {
    setShow: () => console.log(),
  },
} satisfies Meta<typeof CameraCapture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCameraCapture: Story = {};
