import { Validate } from '@/helpers/validateCpfCnpj';
import validator from 'validator';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormValidationProps {
  email: string;
  cpf: string;
  number: string;
  image: string | null;
  latitude: string | null;
  longitude: string | null;
  boletus_id: number;
}

class FormValidation {
  static async validate({
    boletus_id,
    cpf,
    email,
    image,
    latitude,
    longitude,
    number,
  }: FormValidationProps) {
    if (!cpf) {
      return { error: true, message: 'Adicione um CPF ou CNPJ' };
    }

    const validateCpf = new Validate();

    const { error, message, data } = validateCpf.cpf_or_cnpj(cpf);

    if (data == null && error && message) {
      return { error: true, message };
    }

    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ cpf: data }),
    });

    const dataValidateUser = await response.json();

    if (dataValidateUser.error) {
      return { error: true, message: 'Cliente invalido!' };
    }

    if (!boletus_id) {
      return { error: true, message: 'Adicione o boleto' };
    }

    if (number) {
      const new_number = number.replace(/[^\d]/g, '');

      if (new_number.length != 11) {
        return {
          error: true,
          message: 'formato invalido! Use esse formato: (xx) xxxxx-xxxx',
        };
      }
    }

    if (email) {
      const isEmail = validator.isEmail(email);

      if (!isEmail) {
        return { error: true, message: 'Fomato de email invalido!' };
      }
    }

    if (image === null || latitude === null || longitude === null) {
      return { error: true, message: 'Tire uma foto' };
    }

    return { error: false, message: '' };
  }
}

export { FormValidation };
