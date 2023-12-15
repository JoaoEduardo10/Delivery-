/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input } from '.';
import { renderTheme } from '../../styles/utils/render-theme';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Input />', () => {
  it('should render Input compoent with type text', () => {
    const handleChange = vi.fn();

    renderTheme({
      children: (
        <Input
          clear={false}
          label_name="test"
          onChange={handleChange}
          type="text"
        />
      ),
    });

    const label = screen.getByLabelText('label');
    const input = screen.getByLabelText('input');

    expect(label).toHaveTextContent('test');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render Input compoent with type email', () => {
    const handleChange = vi.fn();

    renderTheme({
      children: (
        <Input
          clear={false}
          label_name="test"
          onChange={handleChange}
          type="email"
        />
      ),
    });

    const label = screen.getByLabelText('label');
    const input = screen.getByLabelText('input');

    expect(label).toHaveTextContent('test');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should be written to the input', async () => {
    const handleChange = vi.fn();

    renderTheme({
      children: (
        <Input
          clear={false}
          label_name="test"
          onChange={handleChange}
          type="text"
        />
      ),
    });

    const input = screen.getByLabelText('input') as any;

    await userEvent.type(input, 'escreveu');

    expect(input.value).toBe('escreveu');
  });

  it('should erase the text from the input', async () => {
    const handleChange = vi.fn();

    const handleClear = () => {
      return true;
    };

    renderTheme({
      children: (
        <Input
          clear={handleClear()}
          label_name="test"
          onChange={handleChange}
          type="text"
        />
      ),
    });

    const input = screen.getByLabelText('input') as any;

    await userEvent.type(input, 'escreveu');

    expect(input.value).toBe('');
  });

  it('should not come out of the input because there is text', async () => {
    const handleChange = vi.fn();

    renderTheme({
      children: (
        <Input
          clear={false}
          label_name="test"
          onChange={handleChange}
          type="text"
        />
      ),
    });

    const input = screen.getByLabelText('input') as any;

    await userEvent.type(input, 'escreveu');

    expect(input.value).toBe('escreveu');

    expect(screen.getByLabelText('label')).toHaveAttribute(
      'class',
      'focus_label',
    );

    await userEvent.tab();

    expect(screen.getByLabelText('label')).toHaveAttribute(
      'class',
      'focus_label',
    );
  });

  it('should come out of the input because there is no text', async () => {
    const handleChange = vi.fn();

    renderTheme({
      children: (
        <Input
          clear={false}
          label_name="test"
          onChange={handleChange}
          type="text"
        />
      ),
    });

    const input = screen.getByLabelText('input') as any;

    await userEvent.type(input, 'escreveu');

    expect(input.value).toBe('escreveu');

    expect(screen.getByLabelText('label')).toHaveAttribute(
      'class',
      'focus_label',
    );

    await userEvent.clear(input);

    await userEvent.tab();

    expect(screen.getByLabelText('label')).toHaveAttribute(
      'class',
      'blur_label',
    );
  });
});
