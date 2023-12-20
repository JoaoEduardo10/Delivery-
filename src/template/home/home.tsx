'use client';
import React, { useEffect } from 'react';
import { Balls } from '../../components/balls';
import { Button } from '../../components/button';
import Image from 'next/image';
import { Login } from '../../helpers/axios/login';

export const TemplateHome = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleClick = async () => {
    Login.signIn();
  };

  return (
    <main className="home-conteiner" aria-label="home conteiner">
      <section className="button-conteiner" aria-label="conteiner button">
        <Image
          className="logo"
          alt="logo"
          src={'/logo.png'}
          width={100}
          height={100}
        />
        <Balls />
        <Button text="Entrar" position={true} onClick={handleClick} />
      </section>
    </main>
  );
};
