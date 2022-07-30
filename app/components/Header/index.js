import PrimaryButton from '../Button/Primary';
import TextButton from '../Button/Text';
import styles from './shared/index.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import settingsIcon from '../../public/icons/settings.svg';
import useSession from '../../utils/hooks/useSession';

export default function Header() {
  const { user, error, loading } = useSession();
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          src={Logo}
          width={64}
          height={64}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push('/');
          }}
        />
      </div>
      {user ? <AuthLinks /> : <AccountOptions />}
    </div>
  );
}

const AccountOptions = () => {
  const router = useRouter();

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  return (
    <div className={styles.accountOptions}>
      <div className={styles.accountOptions__login}>
        <TextButton
          click={() => {
            setLoginLoading(true);
            if (router.pathname === '/login') {
              return setLoginLoading(false);
            }

            router.push('/login');
          }}
          loading={registerLoading ? false : loginLoading}
        >
          Login
        </TextButton>
      </div>
      <div className={styles.accountOptions__getStarted}>
        <PrimaryButton
          click={() => {
            setRegisterLoading(true);
            if (router.pathname === '/register') {
              return setRegisterLoading(false);
            }

            router.push('/register');
          }}
          loading={loginLoading ? false : registerLoading}
        >
          Get Started
        </PrimaryButton>
      </div>
    </div>
  );
};

const AuthLinks = () => {
  const router = useRouter();

  const links = [
    {
      label: 'Home',
      href: '/home',
      active: router.pathname === '/home',
    },
    {
      label: 'Friends',
      href: '/friends',
      active: router.pathname === '/friends',
    },
  ];

  return (
    <div className={styles.header__nav}>
      {links.map((link) => {
        return (
          <Link href={link.href}>
            <div
              className={`${styles.header__nav__link} ${
                link.active ? styles.header__nav__link__active : ''
              }`}
            >
              {link.label}
            </div>
          </Link>
        );
      })}
      <Image
        src={settingsIcon}
        width={32}
        height={32}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  );
};
