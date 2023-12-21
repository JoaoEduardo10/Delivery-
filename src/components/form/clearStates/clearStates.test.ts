import { describe, expect, it, vi } from 'vitest';
import { ClearStates } from '.';

describe('clearState', () => {
  it('should clear all inputs', () => {
    const mockSetClearCpfCnpj = vi.fn();
    const mockSetClearBoletus = vi.fn();
    const mockSetClearEmail = vi.fn();
    const mockSetClearNumber = vi.fn();

    expect(mockSetClearCpfCnpj).not.toHaveBeenCalled();
    expect(mockSetClearBoletus).not.toHaveBeenCalled();
    expect(mockSetClearEmail).not.toHaveBeenCalled();
    expect(mockSetClearNumber).not.toHaveBeenCalled();

    ClearStates.clear({
      clearBoletus: true,
      clearCpfCnpj: true,
      clearEmail: true,
      clearNumber: true,
      setClearBoletus: mockSetClearBoletus,
      setClearCpfCnpj: mockSetClearCpfCnpj,
      setClearEmail: mockSetClearEmail,
      setClearNumber: mockSetClearNumber,
    });

    expect(mockSetClearCpfCnpj).toHaveBeenCalled();
    expect(mockSetClearBoletus).toHaveBeenCalled();
    expect(mockSetClearEmail).toHaveBeenCalled();
    expect(mockSetClearNumber).toHaveBeenCalled();
  });
});
