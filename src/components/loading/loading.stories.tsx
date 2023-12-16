import React from 'react';
import { Meta } from '@storybook/react';
import { Loading } from '.';

const meta = {
  title: 'Loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

export const TemplateLoading = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Loading />
    </div>
  );
};
