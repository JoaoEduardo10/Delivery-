import { redirect } from 'next/navigation';

class SessionValidate {
  static validateDate({ isData }: { isData: string | null }) {
    if (!isData) {
      redirect('/');
    }

    const data = new Date(Number(isData)).getTime();

    if (Date.now() - data > 86400000) {
      return {
        error: true,
        message: 'Token inspirado, voçê sera redirecinado!',
      };
    }

    return { error: false, message: '' };
  }
}

export { SessionValidate };
