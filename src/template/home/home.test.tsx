import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TemplateHome } from './home';

describe('<TemplateHome />', () => {
  it('should render a TemplateHome compoent', async () => {
    await act(async () => renderTheme({ children: <TemplateHome /> }));

    const conteiner_button = screen.getByLabelText('conteiner button');

    expect(conteiner_button).toBeInTheDocument();
  });
});
