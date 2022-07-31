import Head from 'next/head';
import Header from '../Header';
import { Children } from 'react';
import styles from './index.module.scss';
import useSession from '../../utils/hooks/useSession';
import { useRouter } from 'next/router';
import Loader from '../Loader';

export default function Layout({ children, page }) {
  const { user, error, loading } = useSession();
  console.log(loading, 'hi');
  console.log(error, !error);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{page.title + ` • MetaHub`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <>
        <div className={styles.main}>
          {router.pathname === '/' ||
          router.pathname === '/login' ||
          router.pathname === '/register' ? (
            <>
              {!page.hideHeader && <Header />}
              <div className={styles.content}>{children}</div>
            </>
          ) : loading ? (
            <Loader center={true} />
          ) : error ? (
            <Loader center={true} />
          ) : (
            <>
              {!page.hideHeader && <Header />}
              <div className={styles.content}>{children}</div>
            </>
          )}
        </div>
      </>
    </>
  );
}
