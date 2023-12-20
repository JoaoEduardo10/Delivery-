import { beforeEach, describe, expect, it } from 'vitest';
import { SessaoManagerProps, SessionManager } from '.';

describe('sessionManager', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should write the data to the sessionStorage', () => {
    const { success } = SessionManager.setSessionData({
      image: 'data:image/jpeg',
      latitudeAndLongitude: {
        latitude: 2,
        longitude: 3,
      },
    });

    expect(success).toBe(true);
    expect(sessionStorage.getItem('$image')).toBeTruthy();
    expect(sessionStorage.getItem('$latitude')).toBeTruthy();
    expect(sessionStorage.getItem('$longitude')).toBeTruthy();
  });

  it('should not write the data to the sessionStorage', () => {
    const { success } = SessionManager.setSessionData(
      {} as SessaoManagerProps['setSessionData'],
    );

    expect(success).toBe(false);
    expect(sessionStorage.getItem('$image')).toBeFalsy();
    expect(sessionStorage.getItem('$latitude')).toBeFalsy();
    expect(sessionStorage.getItem('$longitude')).toBeFalsy();
  });
});
