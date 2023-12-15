'use client';
import React from 'react';

export interface ButtonProps {
  text: string;
  position?: boolean;
  onClick?: () => void;
}

export const Button = ({ text, position = false, onClick }: ButtonProps) => {
  const handleClickButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={
        position
          ? 'button-conteiner-position button'
          : 'button-conteiner button'
      }
      onClick={handleClickButton}
    >
      {text}
    </button>
  );
};
