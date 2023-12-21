import { renderTheme } from '../../styles/utils/render-theme';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Message } from '.';
import { screen } from '@testing-library/react';

describe('<Message />', () => {
  it('Should render message componet with type error', () => {
    renderTheme({ children: <Message message="test" type="error" /> });

    const message = screen.getByRole('alert');

    expect(message).toHaveAttribute('class', 'conteiner-error message');
    expect(message).toHaveTextContent('test');
  });

  it('Should render message componet with type sucess', () => {
    renderTheme({ children: <Message message="test" type="sucess" /> });

    const message = screen.getByRole('alert');

    expect(message).toHaveAttribute('class', 'conteiner-sucess message');
    expect(message).toHaveTextContent('test');
  });
});
