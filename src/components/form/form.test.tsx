/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Form } from '.';
import { act, fireEvent, screen } from '@testing-library/react';
import { SessionValidate } from '../../helpers/session-validate';
import { FormValidation } from './form-validation';
import { Delivery } from '../../helpers/axios/delivery';
import { SessionStorageValues } from './sessionStorageValues';

describe('<Form />', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    sessionStorage.setItem('$token', 'test24f33ts');
    sessionStorage.setItem('$email', 'test@interativabr.com.br');
    sessionStorage.setItem('$username', 'test');
    sessionStorage.setItem('$id', '74342594020r');
    sessionStorage.setItem('$date', `${Date.now()}`);
    sessionStorage.setItem('$image', 'logo.png');
    sessionStorage.setItem('$latitude', '53965235543');
    sessionStorage.setItem('$longitude', '234656');
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('should created delivery', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    vi.spyOn(SessionValidate, 'validateDate').mockReturnValue({
      error: false,
      message: '',
    });

    vi.spyOn(FormValidation, 'validate').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(Delivery, 'create_delivery').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Entrega gravada com sucesso',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should redirect the user for not seeing anything in the storage session', async () => {
    sessionStorage.clear();

    await act(async () => renderTheme({ children: <Form /> }));

    vi.spyOn(SessionStorageValues, 'get').mockReturnValue({
      data: {} as any,
      error: true,
    });

    vi.spyOn(SessionValidate, 'validateDate').mockReturnValue({
      error: false,
      message: '',
    });

    vi.spyOn(FormValidation, 'validate').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(Delivery, 'create_delivery').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });
  });

  it('should show an error message when the date is exceeded', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    vi.spyOn(SessionStorageValues, 'get').mockReturnValue({
      data: {} as any,
      error: false,
    });

    vi.spyOn(SessionValidate, 'validateDate').mockReturnValue({
      error: true,
      message: 'erro test de prazo estendido',
    });

    vi.spyOn(FormValidation, 'validate').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(Delivery, 'create_delivery').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'erro test de prazo estendido',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should return some error from the user', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    vi.spyOn(SessionStorageValues, 'get').mockReturnValue({
      data: {} as any,
      error: false,
    });

    vi.spyOn(SessionValidate, 'validateDate').mockReturnValue({
      error: false,
      message: '',
    });

    vi.spyOn(FormValidation, 'validate').mockReturnValue(
      Promise.resolve({
        error: true,
        message: 'Error no checagem do formulário',
      }),
    );

    vi.spyOn(Delivery, 'create_delivery').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Error no checagem do formulário',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should generate an error when attempting to create a delivery', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    vi.spyOn(SessionStorageValues, 'get').mockReturnValue({
      data: {} as any,
      error: false,
    });

    vi.spyOn(SessionValidate, 'validateDate').mockReturnValue({
      error: false,
      message: '',
    });

    vi.spyOn(FormValidation, 'validate').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(Delivery, 'create_delivery').mockReturnValue(
      Promise.resolve({
        error: true,
        message: 'error na tentativa de cria uma entrega',
      }),
    );

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'error na tentativa de cria uma entrega',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should open camera', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    const button = screen.getByRole('button', { name: 'Tirar Foto' });
    const camera = screen.queryByLabelText('camera');

    expect(camera).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByLabelText('camera')).toBeInTheDocument();
  });
});
