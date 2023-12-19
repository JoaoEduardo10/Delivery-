/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parseQueryString } from './get-query';

interface SetUrlProps {
  token?: string;
  email?: string;
  username?: string;
  id?: string;
}

const setUrl = ({ email, username, token, id }: SetUrlProps) => {
  const new_url = `http://localhost:3000/user?id=${id}&username=${username}&token=${token}&email=${email}`;

  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      href: new_url,
    },
    writable: true,
  });
};

describe('get-query', () => {
  const user = {
    token: 'test',
    username: 'test',
    email: 'test@interativabr.com.br',
  };

  beforeEach(() => {
    setUrl(user);
  });

  afterEach(() => {
    setUrl({} as any);
  });

  it('should ostensibly grab the queries from the URL', () => {
    const query = parseQueryString();

    expect(query?.email).toBeTruthy();
    expect(query?.username).toBeTruthy();
    expect(query?.token).toBeTruthy();
  });

  it('should returns an null for not adding the username', () => {
    setUrl({ ...user, username: '' } as SetUrlProps);

    const query = parseQueryString();

    expect(query).toBe(null);
  });

  it('should returns an null for not adding the user token', () => {
    setUrl({ ...user, token: '' } as SetUrlProps);

    const query = parseQueryString();

    expect(query).toBe(null);
  });

  it('should returns an null for not adding the user email', () => {
    setUrl({ ...user, email: '' } as SetUrlProps);

    const query = parseQueryString();

    expect(query).toBe(null);
  });

  it('should returns an null for not adding the user id', () => {
    setUrl({ ...user, id: '' } as SetUrlProps);

    const query = parseQueryString();

    expect(query).toBe(null);
  });
});
