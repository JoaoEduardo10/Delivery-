/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';
import { Login } from './axios/login';

interface ValidationProps {
  id: string;
}

class UserValidation {
  static async validate({ id }: ValidationProps) {
    try {
      const { token } = await Login.get_token(id);

      if (!token) {
        throw new Error('Usuário invalido!');
      }

      const { user } = await Login.get_user({ id, token });

      if (!user) {
        throw new Error('Usuário invalido!');
      }

      return { token, ...user };
    } catch (error: any) {
      console.log(error.message);
      redirect('/');
    }
  }
}

export { UserValidation };
