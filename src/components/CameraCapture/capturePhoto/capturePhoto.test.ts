/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CapturePhoto } from '.';

describe('campturePhoto', () => {
  beforeEach(() => {
    vi.mock('../../../helpers/getLatitudeAndLongitude', () => ({
      getLocation: vi.fn(() => Promise.resolve({ latitude: 1, longitude: 2 })),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should capture photo data', async () => {
    const videoRef = { current: document.createElement('video') };

    vi.spyOn(CapturePhoto, 'get').mockReturnValue(
      Promise.resolve({
        fotoDataURL: 'data:image/jpeg',
        latitude: 1,
        longitude: 2,
      }),
    );

    const { fotoDataURL, latitude, longitude } = await CapturePhoto.get({
      videoRef,
    });

    expect(fotoDataURL).toContain('data:image/jpeg');
    expect(latitude).toBe(1);
    expect(longitude).toBe(2);
  });

  it('should throw an error if context is not available', async () => {
    const videoRef = { current: document.createElement('video') };

    vi.spyOn(document.createElement('canvas'), 'getContext').mockReturnValue(
      null,
    );

    expect(await CapturePhoto.get({ videoRef })).not.toBeTruthy();
  });
});
