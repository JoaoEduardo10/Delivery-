import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormValidation, FormValidationProps } from '.';
import { Delivery } from '../../../helpers/axios/delivery';

describe('', () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('should return an error for not adding the CPF', async () => {
    const { error, message } = await FormValidation.validate({
      cpf: '',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('Adicione um CPF ou CNPJ');
  });

  it('should return an error for not adding the boletus', async () => {
    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('Adicione o boleto');
  });

  it('should return an error for adding an invalid format number', async () => {
    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
      boletus_id: 1132424,
      number: '8681320524',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('formato invalido! Use esse formato: (xx) xxxxx-xxxx');
  });

  it('should return an error for adding an invalid format email', async () => {
    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
      boletus_id: 1132424,
      number: '86981320524',
      email: 'test@drwa',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('Fomato de email invalido!');
  });

  it('should return an error for adding an invalid CPF', async () => {
    vi.spyOn(Delivery, 'validateCpf').mockReturnValue(
      Promise.resolve({
        error: true,
        message: 'caio no erro test do cpf',
      }),
    );

    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
      boletus_id: 1132424,
      number: '86981320524',
      email: 'test@interativabr.com.br',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('caio no erro test do cpf');
  });

  it('should return an error for not adding the image or latitude or longitude', async () => {
    vi.spyOn(Delivery, 'validateCpf').mockReturnValue(
      Promise.resolve({
        error: false,
        data: {
          id: '2342455',
        },
        message: undefined,
      }),
    );

    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
      boletus_id: 1132424,
      number: '86981320524',
      email: 'test@interativabr.com.br',
      image: null,
      latitude: null,
      longitude: null,
      token: '1234',
    } as FormValidationProps);

    expect(error).toBe(true);
    expect(message).toBe('Tire uma foto');
  });

  it('should not return error', async () => {
    vi.spyOn(Delivery, 'validateCpf').mockReturnValue(
      Promise.resolve({
        error: false,
        data: {
          id: '2342455',
        },
        message: undefined,
      }),
    );

    const { error, message } = await FormValidation.validate({
      cpf: '091.222.333-22',
      boletus_id: 1132424,
      number: '86981320524',
      email: 'test@interativabr.com.br',
      token: '1234',
    } as FormValidationProps);

    expect(error).toBe(false);
    expect(message).toBe('');
  });
});
