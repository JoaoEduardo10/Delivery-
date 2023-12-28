/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeliveryDTO } from '../../interfaces/delivery';

export interface AddClientsLocalStorageProps {
  add: Omit<DeliveryDTO, 'id'>;
}

class AddClientsLocalStorage {
  static add(params: AddClientsLocalStorageProps['add']) {
    try {
      const clientsStorage = localStorage.getItem('$clients');

      if (clientsStorage == null) {
        localStorage.setItem('$clients', JSON.stringify([params]));
        return;
      }

      const clients = JSON.parse(clientsStorage) as Omit<DeliveryDTO, 'id'>[];

      clients.forEach((client) => {
        if (client.recipient.boletus_id === params.recipient.boletus_id) {
          throw new Error('Boleto ja adicinado');
        }
      });

      clients.push(params);

      localStorage.setItem('$clients', JSON.stringify(clients));

      return { error: false, message: '' };
    } catch (error: any) {
      return { error: true, message: `${error.message}` };
    }
  }

  static getAll() {
    const clientsStorage = localStorage.getItem('$clients');

    if (clientsStorage == null) {
      return {
        error: true,
        message: 'Não há cliente cadastrado em memoria!',
        data: null,
      };
    }

    const clients = JSON.parse(clientsStorage) as Omit<DeliveryDTO, 'id'>[];

    return { error: false, data: clients, message: '' };
  }

  static deleteAllClinets() {
    localStorage.removeItem('$clients');
  }
}

export { AddClientsLocalStorage };
