'use client';
import { Form } from '@/components/form';
import { parseQueryString } from '@/helpers/get-query/get-query';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export const TemplateUser = () => {
  useEffect(() => {
    const user = parseQueryString();

    if (!user?.email || !user.token || !user?.username) {
      redirect('/');
    }

    sessionStorage.setItem('$token', user.token);
    sessionStorage.setItem('$username', user.username);
    sessionStorage.setItem('$email', user.email);
    sessionStorage.setItem('$id', user.id);
    localStorage.setItem('$date', `${Date.now()}`);
  }, []);

  return <Form />;
};
