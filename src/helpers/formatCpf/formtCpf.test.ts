import { describe, expect, it } from 'vitest';
import { formatCPF } from '.';

describe('formatCpf', () => {
  it('should format cpf', () => {
    const cpf = '09193114411';

    const cpfFomatted = formatCPF(cpf);

    expect(cpfFomatted).toBe('091.931.144-11');
  });

  it('should format cpnpj', () => {
    const cnpj = '12345678912345';

    const cnpjFomatted = formatCPF(cnpj);

    expect(cnpjFomatted).toBe('12.345.678/9123-45');
  });

  it('should not format ', () => {
    const cnpj = '123456789123454';

    const cnpjFomatted = formatCPF(cnpj);

    expect(cnpjFomatted).toBe('123456789123454');
  });
});
