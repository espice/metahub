import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Textfield from "../../components/Textfield";
import axios from "../../utils/axios";
import TextButton from "../../components/Button/Text";

import PrimaryButton from "../../components/Button/Primary";
import useSession from "../../utils/hooks/useSession";

export default function Content() {
  const [selected, setSelected] = useState("profile");
  const [appIndex, setAppIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [OAuthApps, setOAuthApps] = useState([]);
  const [authorizedApps, setAuthorizedApps] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [myData, setMyData] = useState({});
  const [reports, setReports] = useState([]);
  const [reportUsers, setReportUsers] = useState([]);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [description, setDescription] = useState("");
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    callbackUrl: "",
  });
  const { logout } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function fetchApps() {
      const data = await axios.get("/oAuthApps");
      const authdata = await axios.get("/oAuthApps/authorized");
      const mydata = await axios.get("/auth/me");
      const reportsdata = await axios.get("/report");

      setReports(reportsdata.data.reports);
      setOAuthApps(data.data.apps);
      setAuthorizedApps(authdata.data.authorizedApps);
      setMyData(mydata.data.user);

      reports.forEach(async (report) => {
        const user = await axios.get(`/auth/me`);
        const userdata = user.data.user;
        report.user = userdata;
        setReportUsers([...reportUsers, report.user]);
      });
      console.log(reportUsers);
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
                selected == "profile"
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected("profile")}
            >
              My Profile
            </div>
            <div
              className={
                selected == "settings"
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected("settings")}
            >
              Settings
            </div>
          </div>
          <hr />
          <div className={styles.settingType}>VERSES</div>
          <div>
            <div
              className={
                selected == "verses"
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected("verses")}
            >
              Authorized Verses
            </div>
            <div
              className={
                selected == "reports"
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected("reports")}
            >
              Reports
            </div>
          </div>
          <hr />
          <div className={styles.settingType}>DEVELOPERS</div>
          <div>
            <div
              className={
                selected == "oauth" ||
                selected == "oauth-edit" ||
                selected == "oauth-create"
                  ? styles.somebutton
                  : styles.someotherbutton
              }
              onClick={() => setSelected("oauth")}
            >
              OAuth Applications
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {selected == "profile" ? (
            <div className={styles.main}>
              <div className={styles.profile}>
                <div className={styles.profile__field}>
                  <div className={styles.profile__field__label}>USERNAME</div>
                  <div className={styles.profile__field__value}>
                    {myData.username}#{myData.tag}
                  </div>
                </div>

                <div className={styles.profile__field}>
                  <div className={styles.profile__field__label}>EMAIL</div>
                  <div className={styles.profile__field__value}>
                    {myData.email}
                  </div>
                </div>

                <div className={styles.profile__logout}>
                  <PrimaryButton
                    className={styles.profile__logout__button}
                    click={() => {
                      setLoggingOut(true);
                      logout();
                    }}
                    loading={loggingOut}
                  >
                    Logout
                  </PrimaryButton>
                </div>
              </div>

              <div className={styles.avatar}>
                <div className={styles.profile__field__label}>AVATAR</div>
                <img
                  src={myData.avatar}
                  style={{
                    height: "60vh",
                    marginLeft: "40px",
                    marginTop: "80px",
                  }}
                />
              </div>
            </div>
          ) : selected == "settings" ? (
            <div className={styles.settings}>
              <div className={styles.oauth__heading}>
                <h2>Your Settings</h2>
              </div>
            </div>
          ) : selected == "verses" ? (
            <div className={styles.verses}>
              <div className={styles.oauth__heading}>
                <h2>Your Verses</h2>
              </div>
              <div className={styles.oauth__apps}>
                {console.log(authorizedApps)}
                {authorizedApps
                  ? authorizedApps.map((app, index) => (
                      <div className={styles.appCard} key={index}>
                        {console.log(app)}
                        <img src={app.logo} className={styles.appimg}></img>
                        <div className={styles.appshit}>
                          <div className={styles.appName}>{app.name}</div>
                          <div className={styles.something}>
                            <div className={styles.dot}></div>
                            <div>{`${app.authorizedUsers.length} ${
                              app.authorizedUsers.length == 1
                                ? "Member"
                                : "Members"
                            }`}</div>
                          </div>
                        </div>
                        <button
                          className={styles.appRevoke}
                          onClick={() => {
                            axios.post(
                              `/auth/revoke/${authorizedApps[index].clientId}`
                            );
                            const newAuthApps = authorizedApps.filter(
                              (a) =>
                                a.clientId != authorizedApps[index].clientId
                            );
                            setAuthorizedApps(newAuthApps);
                            setSelected("profile");
                          }}
                        >
                          Revoke Access
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ) : selected == "reports" ? (
            <div className={styles.reports}>
              <div className={styles.oauth__heading}>
                <h2>Reports</h2>
              </div>
              <div className={styles.reportsList}>
                {reports.map((report, index) => (
                  <div className={styles.appCard} key={index}>
                    <div className={styles.somerow}>
                      <img
                        src={report.verse.logo}
                        className={styles.appimg}
                      ></img>
                      <div className={styles.appshit}>
                        <div className={styles.appName}>
                          {report.verse.name}
                        </div>
                        <div className={styles.someotherthing}>
                          <div>Reason -</div>
                          <div>{report.reason}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className={styles.appEdit}>Appeal</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selected == "oauth" ? (
            <div className={styles.oauth}>
              <div className={styles.oauth__heading}>
                <h2>Your OAuth Applications</h2>
                <button
                  className={styles.oauth__create}
                  onClick={() => {
                    console.log("clicked");
                    setSelected("oauth-create");
                  }}
                >
                  Create New
                </button>
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
                          app.authorizedUsers.length == 1 ? "Member" : "Members"
                        }`}
                      </div>
                    </div>
                    <button
                      className={styles.appEdit}
                      onClick={() => {
                        console.log(index);
                        setAppIndex(index);
                        setSelected("oauth-edit");
                        setCallbackUrl(OAuthApps[index].callbackUrl);
                        setDescription(OAuthApps[index].description);
                        setRevealed(false);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : selected == "oauth-edit" ? (
            <div className={styles.edit}>
              <button
                onClick={() => {
                  setSelected("oauth");
                }}
                style={{
                  marginBottom: "10px",
                  padding: "4px 12px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#0668e120",
                  fontWeight: 500,
                  color: "#0668e1",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
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
                      ? "User"
                      : "Users"
                  }`}</div>
                </div>
                <hr />
                <div className={styles.clientShit}>
                  <div>
                    <div className={styles.credName}>Client ID</div>
                    <div className={styles.creds}>
                      {OAuthApps[appIndex].clientId}
                    </div>
                    <div className={styles.credName}>Client Secret</div>
                    <div className={styles.creds}>
                      {revealed ? (
                        <div className={styles.creds}>
                          {OAuthApps[appIndex].clientSecret}
                        </div>
                      ) : (
                        <>
                          {OAuthApps[appIndex].clientSecret.slice(0, -28) +
                            "****************************"}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.reveal}>
                    <button
                      className={styles.credReveal}
                      onClick={() => {
                        setRevealed(!revealed);
                      }}
                    >
                      Reveal
                    </button>
                  </div>
                </div>
                <hr />
                <div>
                  <div className={styles.credName}>Callback URL</div>
                  <Textfield
                    id={"url"}
                    type={"url"}
                    placeholder={"Callback URL"}
                    className={styles.content__container__input}
                    value={callbackUrl}
                    onChange={(e) => setCallbackUrl(e.target.value)}
                  ></Textfield>
                  <div className={styles.credName}>Description</div>
                  <Textfield
                    id={"description"}
                    type={"text"}
                    placeholder={"Description"}
                    className={styles.content__container__input}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Textfield>
                  <button
                    className={styles.oauth__save}
                    onClick={() => {
                      console.log("clicked");
                      async function updateApp() {
                        const callbackUrl =
                          document.getElementById("url").value;
                        const description =
                          document.getElementById("description").value;
                        const data = await axios.put(
                          `/oAuthApps/${OAuthApps[appIndex]._id}`,
                          {
                            name: "New App",
                            callbackUrl: "http://localhost:3001",
                            description: "This is a new app",
                          }
                        );
                        console.log(data.data);
                        setLoading(true);
                      }
                      // updateApp();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : selected == "oauth-create" ? (
            <div className={styles.create}>
              <div className={styles.oauth__heading}>
                <h2>Create New OAuth App</h2>
              </div>
              <div className={styles.credName}>Name</div>
              <Textfield
                id={"createName"}
                type={"text"}
                placeholder={"Name"}
                className={styles.content__container__input}
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    name: e.target.value,
                  })
                }
              ></Textfield>
              <div className={styles.credName}>Description</div>
              <textarea
                id={"createDescription"}
                placeholder={"Description"}
                className={styles.content__container__inputDesc}
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div className={styles.credName}>Callback URL</div>
              <Textfield
                id={"createUrl"}
                type={"url"}
                placeholder={"Callback URL"}
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    callbackUrl: e.target.value,
                  })
                }
                className={styles.content__container__input}
              ></Textfield>
              <div className={styles.createButtons}>
                <button
                  className={styles.appCreate}
                  onClick={() => {
                    async function createApp() {
                      const data = await axios.post("/oAuthApps/", createData);
                      console.log(data);

                      if (data.data.success) {
                        setSelected("oauth");
                      }
                      setLoading(true);
                    }
                    createApp();
                    setCreateData({
                      name: "",
                      description: "",
                      callbackUrl: "",
                    });
                  }}
                >
                  Create
                </button>
                <button
                  className={styles.appCancel}
                  onClick={() => {
                    setSelected("oauth");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
