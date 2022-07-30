import Image from 'next/image';
import PrimaryButton from '../../..';
import TextButton from '../../components/Button/Text';
import styles from './index.module.scss';

export default function Content() {
  return (
    <div className={styles.content}>
      {/* <div className={styles.left}>
        <div>
          <h1>
            Welcome to <span className={styles.blue}>App Name</span>.
          </h1>
          <h1>
            Your gateway to the <span className={styles.blue}>Metaverse.</span>
          </h1>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton>
            <div className={styles.apart}>
              <div>Get Started</div> <div>→</div>
            </div>
          </PrimaryButton>
          <TextButton>
            <div className={styles.something}>
              <div>Explore Features</div> <div>→</div>
            </div>
          </TextButton>
        </div>
      </div> */}
      <img src="https://cdn.discordapp.com/attachments/778128218128515074/1002715143379095763/unknown.png" />
    </div>
  );
}
