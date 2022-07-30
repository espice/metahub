import PrimaryButton from '../Button/Primary';
import TextButton from '../Button/Text';
import styles from './shared/index.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import settingsIcon from '../../public/icons/settings.svg';
import useSession from '../../utils/hooks/useSession';

export default function Header() {
  const { user, error, loading } = useSession();

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image src={Logo} width={64} height={64} />
      </div>

      <AuthLinks />
    </div>
  );
}

const AccountOptions = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  return (
    <div className={styles.accountOptions}>
      <div className={styles.accountOptions__login}>
        <TextButton
          click={() => {
            setLoginLoading(true);

            setTimeout(() => {
              return setLoginLoading(false);
            }, 2000);
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

            setTimeout(() => {
              return setRegisterLoading(false);
            }, 2000);
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
