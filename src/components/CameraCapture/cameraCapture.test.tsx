import React from 'react';
import { renderTheme } from '../../styles/utils/render-theme';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CameraCapture } from '.';
import { StartCapture } from './startCapture';
import { act, fireEvent, screen } from '@testing-library/react';
import { CapturePhoto } from './capturePhoto';
import { SessionManager } from './sessionManager';

describe('<CameraCapture />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mock('next/image');
  });

  it('should render CameraCapture component with camera open', () => {
    const mockSetShow = vi.fn();

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    renderTheme({ children: <CameraCapture setShow={mockSetShow} /> });

    const photo_display_component = screen.queryByLabelText('photo-display');
    const message = screen.queryByRole('alert');

    expect(photo_display_component).not.toBeInTheDocument();
    expect(message).not.toBeInTheDocument();

    const button_close = screen.getByLabelText('icon-close-camera');
    const video = screen.getByLabelText('conteiner-video');
    const capturePhotoButton = screen.getByRole('button');

    expect(button_close).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(capturePhotoButton).toHaveTextContent('Tirar foto');
  });

  it('should not open the camera', async () => {
    const mockSetShow = vi.fn();

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: true,
        message: 'não foi possovel abre a camera',
      }),
    );

    await act(async () =>
      renderTheme({ children: <CameraCapture setShow={mockSetShow} /> }),
    );

    const message = screen.getByRole('alert');

    expect(message).toHaveTextContent('não foi possovel abre a camera');
  });

  it('this should take a photo and close photoDisplay compoent', async () => {
    const mockSetShow = vi.fn();

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(CapturePhoto, 'get').mockReturnValue(
      Promise.resolve({
        fotoDataURL: 'http://logo.png',
        latitude: 1234356251,
        longitude: 684600565,
      }),
    );

    vi.spyOn(SessionManager, 'setSessionData').mockReturnValue({
      success: true,
    });

    const videoElementMock = document.createElement('video');
    videoElementMock.play = vi.fn();

    await act(async () =>
      renderTheme({ children: <CameraCapture setShow={mockSetShow} /> }),
    );

    const button = screen.getByRole('button', { name: 'Tirar foto' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByLabelText('photo-display')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByLabelText('icons-imageDisplay-close'));
    });

    vi.resetAllMocks();
    vi.clearAllMocks();

    expect(screen.queryByLabelText('photo-display')).not.toBeInTheDocument();
  });

  it('this should take a photo', async () => {
    const mockSetShow = vi.fn();

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    vi.spyOn(CapturePhoto, 'get').mockRejectedValue(
      new Error('Erro ao capturar a foto'),
    );

    vi.spyOn(SessionManager, 'setSessionData').mockReturnValue({
      success: true,
    });

    const videoElementMock = document.createElement('video');
    videoElementMock.play = vi.fn();

    await act(async () =>
      renderTheme({ children: <CameraCapture setShow={mockSetShow} /> }),
    );

    const button = screen.getByRole('button', { name: 'Tirar foto' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByLabelText('photo-display')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Erro ao capturar a foto',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should close CameraCapture component', () => {
    const mockSetShow = vi.fn();

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    renderTheme({ children: <CameraCapture setShow={mockSetShow} /> });

    const button_close = screen.getByLabelText('icon-close-camera');

    expect(button_close).toBeInTheDocument();

    fireEvent.click(button_close);

    expect(mockSetShow).toHaveBeenCalled();
  });
});
