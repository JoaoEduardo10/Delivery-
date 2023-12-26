import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SessionStorageValues } from '.';

describe('SessionStorageValues', () => {
  beforeEach(() => {
    sessionStorage.setItem('$token', 'test24f33ts');
    sessionStorage.setItem('$email', 'test@interativabr.com.br');
    sessionStorage.setItem('$username', 'test');
    sessionStorage.setItem('$id', '74342594020r');
    localStorage.setItem('$date', `${Date.now()}`);
    sessionStorage.setItem('$image', 'logo.png');
    sessionStorage.setItem('$latitude', '53965235543');
    sessionStorage.setItem('$longitude', '234656');
    sessionStorage.setItem('$someoneAtHome', 'false');
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('should return all storagesValue', () => {
    const { data, error } = SessionStorageValues.get();

    expect(error).toBe(false);
    expect(data.deliveredByEmail).toBeTruthy();
    expect(data.deliveredByEmail).toBeTruthy();
    expect(data.id).toBeTruthy();
    expect(data.image).toBeTruthy();
    expect(data.isDate).toBeTruthy();
    expect(data.latitude).toBeTruthy();
    expect(data.longitude).toBeTruthy();
    expect(data.someoneAtHome).toBe('false');
    expect(data.token).toBeTruthy();
  });

  it('should not return all storagesValue', () => {
    sessionStorage.clear();

    const { data, error } = SessionStorageValues.get();

    expect(error).toBe(true);
    expect(data.deliveredByEmail).toBeFalsy();
    expect(data.deliveredByEmail).toBeFalsy();
    expect(data.id).toBeFalsy();
    expect(data.image).toBeFalsy();
    expect(data.isDate).toBeFalsy();
    expect(data.latitude).toBeFalsy();
    expect(data.longitude).toBeFalsy();
    expect(data.someoneAtHome).toBe(null);
    expect(data.token).toBeFalsy();
  });

  it('should redirect', () => {
    const redirectSpy = vi.spyOn(SessionStorageValues, 'redirect');

    SessionStorageValues.redirect();

    expect(redirectSpy).toHaveBeenCalled();
  });
});
