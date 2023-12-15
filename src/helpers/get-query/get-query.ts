/* eslint-disable @typescript-eslint/no-unused-vars */
const parseQueryString = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const url = window.location.href;
  const [_host, query] = url.split('?');

  if (!query) {
    return null;
  }

  const queryParameters = query.split('&');

  const user = {
    token: '',
    email: '',
    username: '',
  };

  queryParameters.forEach((parameter) => {
    const [key, value] = parameter.split('=');

    if (key === 'username') {
      user.username = value;
    }

    if (key === 'token') {
      user.token = value;
    }

    if (key === 'email') {
      user.email = value;
    }
  });

  if (!user.email || !user.username || !user.token) {
    return null;
  }

  return user;
};

export { parseQueryString };
