/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PhotoDisplay } from '.';
import { renderTheme } from '../../styles/utils/render-theme';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<PhotoDisplay />', () => {
  it('should render image display component', () => {
    const setShowMock = vi.fn();

    renderTheme({
      children: <PhotoDisplay image="https://logo.png" setShow={setShowMock} />,
    });

    expect(
      screen.getByLabelText('icons-imageDisplay-close'),
    ).toBeInTheDocument();

    expect(screen.getByAltText('image-display')).toBeInTheDocument();

    expect(screen.getByAltText('image-display')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Flogo.png&w=256&q=75',
    );
  });

  it('should close image display component', async () => {
    const setShowMock = vi.fn();

    renderTheme({
      children: <PhotoDisplay image="https://logo.png" setShow={setShowMock} />,
    });

    const icon = screen.getByLabelText('icons-imageDisplay-close')
      .firstChild as any;

    await userEvent.click(icon);

    expect(setShowMock).toHaveBeenCalledWith(false);
  });
});
