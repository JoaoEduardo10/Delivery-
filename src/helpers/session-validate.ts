import { redirect } from 'next/navigation';

class SessionValidate {
  static validateDate({ isData }: { isData: string | null }) {
    if (!isData) {
      redirect('/');
    }

    const data = new Date(Number(isData)).getTime();

    if (Date.now() - data > 81400000) {
      return {
        error: true,
        message: 'Token inspirado, você será redirecionado!',
      };
    }

    return { error: false, message: '' };
  }
}

export { SessionValidate };
