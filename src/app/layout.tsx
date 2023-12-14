import React from 'react';
import type { Metadata } from 'next';
import '../styles/index.scss';

export const metadata: Metadata = {
  title: 'interativa-delivery',
  description: 'registrador de entregas da interativa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="global">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
