import { MessageProps } from '../../message';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface RestoresErrorMessageProps {
  restore: {
    message: string;
    time: NodeJS.Timeout;
    sessionRedirect: boolean;
    setErrorMesssage: (value: React.SetStateAction<MessageProps>) => void;
    setRedirect: (value: React.SetStateAction<boolean>) => void;
  };
}

class RestoresErrorMessage {
  static restore({
    message,
    time,
    setErrorMesssage,
    sessionRedirect,
    setRedirect,
  }: RestoresErrorMessageProps['restore']) {
    if (message) {
      time = setTimeout(() => {
        setErrorMesssage({
          message: '',
          type: 'error',
        });

        if (sessionRedirect) {
          setRedirect(false);
          window.location.href = '/';
        }
      }, 3000);
    }
  }
}

export { RestoresErrorMessage };
