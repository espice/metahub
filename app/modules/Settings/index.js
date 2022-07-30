import { useState } from 'react';
import styles from './index.module.scss';

export default function Content() {
  const [selected, setSelected] = useState('profile');
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <h1>
          Your <span>Settings</span>
        </h1>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.settingType}>ACCOUNT</div>
          <div>
            <div
              className={
                selected == 'profile'
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected('profile')}
            >
              My Profile
            </div>
            <div
              className={
                selected == 'settings'
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected('settings')}
            >
              Settings
            </div>
          </div>
          <hr />
          <div className={styles.settingType}>VERSES</div>
          <div>
            <div
              className={
                selected == 'verses'
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected('verses')}
            >
              Authorized Verses
            </div>
            <div
              className={
                selected == 'reports'
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected('reports')}
            >
              Reports
            </div>
          </div>
          <hr />
          <div className={styles.settingType}>DEVELOPERS</div>
          <div>
            <div
              className={
                selected == 'oauth' ? styles.somebutton : styles.someotherbutton
              }
              onClick={() => setSelected('oauth')}
            >
              OAuth Applications
            </div>
          </div>
        </div>
        <div className={styles.right}>stuff here</div>
      </div>
    </div>
  );
}
