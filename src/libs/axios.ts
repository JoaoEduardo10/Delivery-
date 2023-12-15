import axios from 'axios';

const LOGIN_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOGIN_API,
});

export { LOGIN_API };
