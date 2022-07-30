import Head from 'next/head';
import Header from '../Header';
import { Children } from 'react';
import styles from './index.module.scss';
import useSession from '../../utils/hooks/useSession';
import { useRouter } from 'next/router';

export default function Layout({ children, page }) {
  const { user, error, loading } = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{page.title + ` • AppName`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.main}>
        {router.pathname === '/' ? (
          <>
            <Header />
            <div className={styles.content}>{children}</div>
          </>
        ) : loading ? (
          <p>Loading...</p>
        ) : error !== null ? (
          <p>{error}</p>
        ) : (
          <>
            <Header />
            <div className={styles.content}>{children}</div>
          </>
        )}
      </div>
    </>
  );
}
