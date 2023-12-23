import validator from 'validator';
import { Delivery } from '../../../helpers/axios/delivery';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormValidationProps {
  email: string;
  cpf: string;
  number: string;
  token: string;
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
    token,
  }: FormValidationProps) {
    if (!cpf) {
      return { error: true, message: 'Adicione um CPF ou CNPJ' };
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

    const { error, data, message } = await Delivery.validateCpf({
      cpf_cpnj: cpf,
      token,
    });

    if (error && !data?.id && message) {
      return { error: true, message: message };
    }

    if (image === null || latitude === null || longitude === null) {
      return { error: true, message: 'Tire uma foto' };
    }

    return { error: false, message: '' };
  }
}

export { FormValidation };