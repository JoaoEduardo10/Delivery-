import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Balls } from '.';

describe('<Balls />', () => {
  it('should render balls components', () => {
    render(<Balls />);

    const balls = screen.getAllByLabelText('balls');

    expect(balls.length).toBe(28);
  });
});
