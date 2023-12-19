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
    id: '',
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

    if (key === 'id') {
      user.id = value;
    }
  });

  if (!user.email || !user.username || !user.token || !user.id) {
    return null;
  }

  const new_username = decodeURIComponent(user.username);

  user.username = new_username;

  return user;
};

export { parseQueryString };
