import PrimaryButton from '../Button/Primary';
import TextButton from '../Button/Text';
import styles from './shared/index.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image src={Logo} width={64} height={64} />
      </div>

      <AccountOptions />
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
