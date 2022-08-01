import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PrimaryButton from '../../components/Button/Primary';
import TextButton from '../../components/Button/Text';
import styles from './index.module.scss';

export default function Content() {
  const router = useRouter();

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div>
          <h1>
            Welcome to <span className={styles.blue}>Metahub</span>.
          </h1>
          <h1>
            Your gateway to the <span className={styles.blue}>Metaverse.</span>
          </h1>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton
            className={styles.primary}
            click={() => {
              setRegisterLoading(true);
              if (router.pathname === '/register') {
                return setRegisterLoading(false);
              }

              router.push('/register');
            }}
            loading={loginLoading ? false : registerLoading}
          >
            <div className={styles.apart}>
              <div>Get Started</div> <div>→</div>
            </div>
          </PrimaryButton>
          <TextButton className={styles.textbutton}>
            <div className={styles.something}>
              <div>Explore Features</div> <div>→</div>
            </div>
          </TextButton>
        </div>
      </div>
      <img src="https://cdn.discordapp.com/attachments/778128218128515074/1002715143379095763/unknown.png" />
    </div>
  );
}
