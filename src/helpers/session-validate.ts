class SessionValidate {
  static validateDate({ isData }: { isData: string | null }) {
    if (!isData) {
      window.location.href = '/';
    }

    const data = new Date(Number(isData)).getTime();

    if (Date.now() - data > 71400000) {
      return {
        error: true,
        message:
          'Token inspirado, os dados do cliente não foram adicnados, você será redirecionado!',
      };
    }

    return { error: false, message: '' };
  }
}

export { SessionValidate };
