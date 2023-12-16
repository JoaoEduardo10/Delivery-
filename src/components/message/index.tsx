import React from 'react';

export interface MessageProps {
  type: 'error' | 'sucess';
  message: string;
}

export const Message = ({ message, type }: MessageProps) => {
  return (
    <div
      role="alert"
      className={
        type == 'error' ? 'conteiner-error message' : 'conteiner-sucess message'
      }
    >
      <p>{message}</p>
    </div>
  );
};
