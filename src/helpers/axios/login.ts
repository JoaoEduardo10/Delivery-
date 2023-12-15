/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDTO } from '../../interfaces/user';
import { LOGIN_API } from '../../libs/axios';

export interface LoginReponsesData {
  get_all_ids: {
    ids?: string[];
    error?: string;
  };
  get_token: {
    token?: string;
    error?: string;
  };
  get_user: {
    error?: string;
    user?: UserDTO;
  };
}

export interface LoginParams {
  token: string;
  id: string;
}

class Login {
  static signIn() {
    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_API}/auth/microsoft`;
  }

  static signOut(id: string) {
    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_API_URL}/logout/${id}`;
  }

  static async get_all_ids() {
    try {
      const response = await LOGIN_API('/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: LoginReponsesData['get_all_ids'] = await response.data;

      if (!data.ids) {
        throw new Error(data.error);
      }

      return { error: false, ids: data.ids };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  }

  static async get_token(id: string) {
    try {
      const response = await LOGIN_API(`/token/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: LoginReponsesData['get_token'] = await response.data;

      if (!data.token) {
        throw new Error(data.error);
      }

      return { error: false, token: data.token };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  }

  static async get_user({ id, token }: LoginParams) {
    try {
      const response = await LOGIN_API(`/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.NEXT_PUBLIC_TYPE_AUTHORIZATION} ${token}`,
        },
      });

      const data: LoginReponsesData['get_user'] = await response.data;

      if (!data.user) {
        throw new Error(data.error);
      }

      return { error: false, user: data.user };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  }
}

export { Login };
