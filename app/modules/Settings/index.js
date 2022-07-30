import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from '../../utils/axios';

export default function Content() {
  const [selected, setSelected] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [OAuthApps, setOAuthApps] = useState([]);

  useEffect(() => {
    async function fetchApps() {
      setLoading(true);
      const data = await axios.get('/oAuthApps');
      // console.log(data.data.apps);
      setOAuthApps(data.data.apps);
      setLoading(false);
    }

    fetchApps();
  }, [loading]);

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
        <div className={styles.right}>
          {selected == 'profile' ? (
            <div className={styles.profile}>profile</div>
          ) : selected == 'settings' ? (
            <div className={styles.settings}>settings</div>
          ) : selected == 'verses' ? (
            <div className={styles.verses}>verses</div>
          ) : selected == 'reports' ? (
            <div className={styles.reports}>reports</div>
          ) : selected == 'oauth' ? (
            <div className={styles.oauth}>
              <div className={styles.oauth__heading}>
                <h2>Your OAuth Applications</h2>
              </div>
              <div className={styles.oauth__apps}>
                {OAuthApps.map((app, index) => (
                  <div className={styles.appCard} key={index}>
                    <div>
                      <div className={styles.appName}>{app.name}</div>
                      <div className={styles.something}>
                        <div className={styles.dot}></div>
                        {`${app.authorizedUsers.length} ${
                          app.authorizedUsers.length == 1 ? 'Member' : 'Members'
                        }`}
                      </div>
                    </div>
                    <div className={styles.appEdit}>Edit</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
