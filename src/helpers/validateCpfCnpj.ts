import { cpf, cnpj } from 'cpf-cnpj-validator';

class Validate {
  private cpf: typeof cpf;
  private cnpj: typeof cnpj;

  constructor() {
    this.cpf = cpf;
    this.cnpj = cnpj;
  }

  cpf_or_cnpj(cpf_cnpf: string) {
    const onlyDigits = cpf_cnpf.replace(/\D/g, '');

    if (onlyDigits.length == 11) {
      return this.validateCpf(onlyDigits);
    } else if (onlyDigits.length == 14) {
      return this.validateCnpj(onlyDigits);
    }

    return { error: true, message: 'cpf ou cnpj invalido!', data: null };
  }

  private validateCpf(cpf: string) {
    const validcpf = this.cpf.isValid(cpf);

    if (validcpf) {
      return { error: false, message: '', data: this.cpf.format(cpf) };
    }

    return { error: true, message: 'cpf invalido!', data: null };
  }

  private validateCnpj(cnpj: string) {
    const validCnpf = this.cnpj.isValid(cnpj);

    if (validCnpf) {
      return { error: false, message: '', data: this.cnpj.format(cnpj) };
    }

    return { error: true, message: 'cnpj invalido!', data: null };
  }
}

export { Validate };
