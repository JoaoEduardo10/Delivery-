import axios from 'axios';

const LOGIN_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOGIN_API,
});

const Delivery_Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DELIVERY_API,
});

export { LOGIN_API, Delivery_Api };
