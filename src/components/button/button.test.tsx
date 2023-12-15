import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { act, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '.';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render button with position true', async () => {
    await act(async () =>
      renderTheme({
        children: <Button text="button" position />,
      }),
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('button');
    expect(button).toHaveAttribute('class', 'button-conteiner-position button');
  });

  it('should render button with position false', async () => {
    await act(async () =>
      renderTheme({
        children: <Button text="button" />,
      }),
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('button');
    expect(button).toHaveAttribute('class', 'button-conteiner button');
  });

  it('should click on the', async () => {
    const handleClick = vi.fn();

    await act(async () =>
      renderTheme({
        children: <Button text="button" onClick={handleClick} />,
      }),
    );

    const button = screen.getByRole('button');

    expect(handleClick).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
