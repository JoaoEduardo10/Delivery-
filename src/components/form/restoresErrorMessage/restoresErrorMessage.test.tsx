/* eslint-disable prefer-const */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RestoresErrorMessage } from '.';
import { act } from '@testing-library/react';

describe('RestoresErroMessage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should restore message error', () => {
    const mockSetErrorMesssage = vi.fn();
    const mockSessionRedirect = vi.fn();

    RestoresErrorMessage.restore({
      setErrorMesssage: mockSetErrorMesssage,
      setRedirect: mockSessionRedirect,
      message: 'test',
      sessionRedirect: true,
      time: setTimeout(() => {}),
    });

    expect(mockSessionRedirect).not.toHaveBeenCalled();
    expect(mockSetErrorMesssage).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockSessionRedirect).toHaveBeenCalled();
    expect(mockSetErrorMesssage).toHaveBeenCalled();
  });
});
