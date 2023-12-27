/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeliveryDTO } from '../../interfaces/delivery';

interface CreateeliveryParams {
  params: {
    deliveredByName: string;
    deliveredByEmail: string;
    recipient: {
      cpf_cnpj: string;
      boletus_id: number;
      email?: string;
      number?: string;
      someoneAtHome?: boolean; //alguém em casa
    };
    latitude: number;
    longitude: number;
    imageReference: string;
  };
  token: string;
}

export interface DeliveryReponsesData {
  create_delivery: {
    delivery?: DeliveryDTO;
    error?: string;
  };
  validateCpf: {
    client?: {
      id: string;
    };
    error?: string;
  };
}

class Delivery {
  static async create_delivery({ params, token }: CreateeliveryParams) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELIVERY_API}/delivery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `${process.env.NEXT_PUBLIC_TYPE_AUTHORIZATION} ${token}`,
          },
          body: JSON.stringify(params),
        },
      );

      const data: DeliveryReponsesData['create_delivery'] =
        await response.json();

      if (data.error && !data.delivery?.id) {
        throw new Error(data.error);
      }

      return { error: false, data: data.delivery };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  }

  static async validateCpf({
    cpf_cpnj,
    token,
  }: {
    cpf_cpnj: string;
    token: string;
  }) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELIVERY_API}/delivery?cpf_cnpj=${cpf_cpnj}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_TYPE_AUTHORIZATION} ${token}`,
          },
        },
      );

      const data: DeliveryReponsesData['validateCpf'] = await response.json();

      if (data.error && !data.client?.id) {
        throw new Error(data.error);
      }

      return { error: false, data: data.client };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  }
}

export { Delivery };
