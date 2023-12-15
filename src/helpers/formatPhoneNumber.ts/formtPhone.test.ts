import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from '.';

describe('FormaPhoneNumber', () => {
  it('should format number', () => {
    const number = '86981320524';

    const numberFormatted = formatPhoneNumber(number);

    expect(numberFormatted).toBe('(86) 98132-0524');
  });
});
