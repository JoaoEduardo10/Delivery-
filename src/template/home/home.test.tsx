import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { act, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TemplateHome } from './home';
import userEvent from '@testing-library/user-event';
import { Login } from '../../helpers/axios/login';

vi.mock('../../helpers/axios/login');

describe('<TemplateHome />', () => {
  it('should render a TemplateHome compoent', async () => {
    await act(async () => renderTheme({ children: <TemplateHome /> }));

    const conteiner_button = screen.getByLabelText('conteiner button');

    expect(conteiner_button).toBeInTheDocument();
  });

  it('should redirect user', async () => {
    await act(async () => renderTheme({ children: <TemplateHome /> }));

    const button = screen.getByRole('button', { name: 'Entrar' });

    await userEvent.click(button);

    expect(Login.signIn).toHaveBeenCalled();
  });
});
