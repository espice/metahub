import Head from 'next/head';
import Header from '../Header';
import { Children } from 'react';

export default function Layout({ children, page }) {
  return (
    <>
      <Head>
        <title>{page.title + ` • AppName`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div>
        <Header />
        {children}
      </div>
    </>
  );
}
