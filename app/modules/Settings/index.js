import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from '../../utils/axios';

export default function Content() {
  const [selected, setSelected] = useState('profile');
  const [appIndex, setAppIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [OAuthApps, setOAuthApps] = useState([]);
  const [authorizedApps, setAuthorizedApps] = useState([])

  useEffect(() => {
    async function fetchApps() {
     
      const data = await axios.get('/oAuthApps');
      const authdata = await axios.get("/oAuthApps/authorized")
      // console.log(data.data.apps);
      console.log(authdata.data)
      setOAuthApps(data.data.apps);
      setAuthorizedApps(authdata.data.authorizedApps)
    
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
                selected == 'oauth' || selected == 'oauth-edit'
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected('oauth')}
            >
              OAuth Applications
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {selected == 'profile' ? (
            <div className={styles.profile}>
              <div className={styles.oauth__heading}>
                <h2>Your Profile</h2>
              </div>
            </div>
          ) : selected == 'settings' ? (
            <div className={styles.settings}>
              <div className={styles.oauth__heading}>
                <h2>Your Settings</h2>
              </div>
            </div>
          ) : selected == 'verses' ? (
            <div className={styles.verses}>
              <div className={styles.oauth__heading}>
                <h2>Your Verses sd</h2>
                  
              </div>
              <div className={styles.oauth__apps}>

                {console.log(authorizedApps)}
                  { authorizedApps ? (authorizedApps.map((app, index) => (

                    <div className={styles.appCard} key={index}>
                      {console.log(app)}
                      <img src={app.logo} className={styles.appimg}></img>
                      <div className={styles.appshit}>
                        
                        <div className={styles.appName}>{app.name}</div>
                        <div className={styles.something}>
                          <div className={styles.dot}></div>
                          {`${app.authorizedUsers.length} ${
                            app.authorizedUsers.length == 1 ? 'Member' : 'Members'
                          }`}
                        </div>
                      </div>
                      <button
                        className={styles.appRevoke}
                        onClick={() => {
                          console.log(index);
                          setAppIndex(index);
                          setSelected('oauth-edit');
                        }}
                      >
                        Revoke Access
                      </button>
                    </div>
                  )) ) : null}
                </div>
            </div>
          ) : selected == 'reports' ? (
            <div className={styles.reports}>
              <div className={styles.oauth__heading}>
                <h2>Your Reports</h2>
              </div>
            </div>
          ) : selected == 'oauth' ? (
            <div className={styles.oauth}>
              <div className={styles.oauth__heading}>
                <h2>Your OAuth Applications</h2>
              </div>
              <div className={styles.oauth__apps}>
                {OAuthApps.map((app, index) => (
                  <div className={styles.appCard} key={index}>
                    <img src={app.logo} className={styles.appimg}></img>
                    <div className={styles.appshit}>
                      <div className={styles.appName}>{app.name}</div>
                      <div className={styles.something}>
                        <div className={styles.dot}></div>
                        {`${app.authorizedUsers.length} ${
                          app.authorizedUsers.length == 1 ? 'Member' : 'Members'
                        }`}
                      </div>
                    </div>
                    <button
                      className={styles.appEdit}
                      onClick={() => {
                        console.log(index);
                        setAppIndex(index);
                        setSelected('oauth-edit');
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : selected == 'oauth-edit' ? (
            <div className={styles.edit}>
              <div className={styles.edit__heading}>
                <h2>{OAuthApps[appIndex].name}</h2>
                <h3>Owned by You</h3>
              </div>
              <div className={styles.edit__body}>
                <div className={styles.edit__users}>
                  <div className={styles.edit__count}>{`${
                    OAuthApps[appIndex].authorizedUsers.length
                  } ${
                    OAuthApps[appIndex].authorizedUsers.length == 1
                      ? 'User'
                      : 'Users'
                  }`}</div>
                </div>
                <hr />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
