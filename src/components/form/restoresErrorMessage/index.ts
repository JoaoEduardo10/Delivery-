import { Login } from '../../../helpers/axios/login';
import { MessageProps } from '../../message';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface RestoresErrorMessageProps {
  restore: {
    message: string;
    time: NodeJS.Timeout;
    sessionRedirect: boolean;
    setErrorMesssage: (value: React.SetStateAction<MessageProps>) => void;
    setRedirect: (value: React.SetStateAction<boolean>) => void;
    id: string;
  };
}

class RestoresErrorMessage {
  static restore({
    message,
    time,
    setErrorMesssage,
    sessionRedirect,
    setRedirect,
    id,
  }: RestoresErrorMessageProps['restore']) {
    if (message) {
      time = setTimeout(() => {
        setErrorMesssage({
          message: '',
          type: 'error',
        });

        if (sessionRedirect) {
          sessionStorage.clear();
          localStorage.removeItem('$date');
          setRedirect(false);
          Login.signOut(id);
        }
      }, 3000);
    }
  }
}

export { RestoresErrorMessage };
