import { describe, expect, it, vi } from 'vitest';
import { StartCapture } from '.';

describe('StartCapture', () => {
  it('should start capturing video successfully', async () => {
    const videoRef = { current: document.createElement('video') };

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: false,
        message: '',
      }),
    );

    const result = await StartCapture.start({ videoRef });

    expect(result.error).toBe(false);
    expect(result.message).toBe('');
  });

  it('should start capturing video successfully', async () => {
    const videoRef = { current: document.createElement('video') };

    vi.spyOn(StartCapture, 'start').mockReturnValue(
      Promise.resolve({
        error: true,
        message: 'Não foi possivel abre a camera',
      }),
    );

    const result = await StartCapture.start({ videoRef });

    expect(result.error).toBe(true);
    expect(result.message).toBe('Não foi possivel abre a camera');
  });
});
