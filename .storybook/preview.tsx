import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <html className="global">
        <body>
          <Story />
        </body>
      </html>
    ),
  ],
};

export default preview;
