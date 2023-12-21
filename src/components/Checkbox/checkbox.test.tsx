import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '.';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Checkbox />', () => {
  it('should render chackbox input compoent with value false', () => {
    renderTheme({ children: <Checkbox /> });

    const input = screen.getByLabelText('input checkbox');
    const label = screen.getByLabelText('label checkbox');

    expect(input).toBeInTheDocument();
    expect(label).toHaveTextContent('Tem alguém em casa?');
    expect(sessionStorage.getItem('$someoneAtHome')).toBe('false');
  });

  it('should render chackbox input compoent with value true', async () => {
    renderTheme({ children: <Checkbox /> });

    const input = screen.getByLabelText('input checkbox');
    const label = screen.getByLabelText('label checkbox');

    expect(input).toBeInTheDocument();
    expect(label).toHaveTextContent('Tem alguém em casa?');

    await userEvent.click(input);

    expect(sessionStorage.getItem('$someoneAtHome')).toBe('true');
  });
});
