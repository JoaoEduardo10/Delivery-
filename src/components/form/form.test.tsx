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

    localStorage.setItem('$date', `${Date.now()}`);
    sessionStorage.setItem('$token', 'test24f33ts');
    sessionStorage.setItem('$email', 'test@interativabr.com.br');
    sessionStorage.setItem('$username', 'test');
    sessionStorage.setItem('$id', '74342594020r');
    sessionStorage.setItem('$image', 'logo.png');
    sessionStorage.setItem('$latitude', '53965235543');
    sessionStorage.setItem('$longitude', '234656');
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.resetAllMocks();
    vi.clearAllMocks();
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
    const mockRedirect = vi.spyOn(SessionStorageValues, 'redirect');

    const inputs = screen.getAllByLabelText('input');
    const input_cpf = inputs[0];
    const input_boletus = inputs[1];

    expect(inputs.length).toBe(4);

    fireEvent.change(input_cpf, { target: { value: '88899900011' } });
    fireEvent.change(input_boletus, { target: { value: '4667487654673' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    });

    expect(mockRedirect).toHaveBeenCalled();
  });

  it('should open camera', async () => {
    await act(async () => renderTheme({ children: <Form /> }));

    const button = screen.getByRole('button', { name: 'Tirar Foto' });
    const camera = screen.queryByLabelText('camera');

    expect(camera).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByLabelText('camera')).toBeInTheDocument();
  });
});
