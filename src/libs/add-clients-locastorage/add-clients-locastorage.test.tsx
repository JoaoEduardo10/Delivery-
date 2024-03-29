/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import { AddClientsLocalStorage } from './add-clients-locastorage';

describe('add-clients-locastorage', () => {
  it('should add clients storage', async () => {
    AddClientsLocalStorage.add({
      deliveredByEmail: 'test@example.com',
      deliveredByName: 'test',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 4354364,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    });

    const { data } = AddClientsLocalStorage.getAll();

    expect(data?.length).toBe(1);
  });

  it('should not add clients storage', async () => {
    AddClientsLocalStorage.add({
      deliveredByEmail: 'test@example.com',
      deliveredByName: 'test',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 4354364,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    });

    const { error, message } = AddClientsLocalStorage.add({
      deliveredByEmail: 'test@example.com',
      deliveredByName: 'test',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 4354364,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    }) as any;

    expect(error).toBe(true);
    expect(message).toBe('Boleto ja adicinado');
  });

  it('should delete all clients storage', async () => {
    AddClientsLocalStorage.add({
      deliveredByEmail: 'test@example.com',
      deliveredByName: 'test',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 4354364,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    });

    AddClientsLocalStorage.getAll();

    AddClientsLocalStorage.deleteAllClinets();

    expect(sessionStorage.getItem('$clients')).toBeFalsy();
  });

  it('should not  delete one clients storage', async () => {
    AddClientsLocalStorage.add({
      deliveredByEmail: 'test@example.com',
      deliveredByName: 'test',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 4354364,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    });

    AddClientsLocalStorage.add({
      deliveredByEmail: 'test43@example.com',
      deliveredByName: 'test4',
      imageReference: 'http://images.example.com',
      latitude: 565475,
      longitude: 43565,
      recipient: {
        boletus_id: 43543645667,
        cpf_cnpj: '09188765411',
      },
      deliveryDate: new Date(),
    });

    AddClientsLocalStorage.removeClient(43543645667);

    const { data } = AddClientsLocalStorage.getAll();

    expect(data?.length).toBe(1);
  });

  it('should  delete one clients storage', async () => {
    localStorage.clear();

    AddClientsLocalStorage.removeClient(43546);

    const { data } = AddClientsLocalStorage.getAll();

    expect(data?.length).toBe(undefined);
  });
});
