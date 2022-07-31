import { useEffect, useState } from "react";
import styles from "./index.module.scss";

import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import PrimaryButton from "../../components/Button/Primary";

const OAuthContent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [app, setApp] = useState({});
  const [authorizing, setAuthorizing] = useState(false);
  const [clientId, setClientId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!router.query.clientId) {
      setError("Invalid Client ID");
      setLoading(false);
    } else {
      setClientId(router.query.clientId);
      setError(null);
      setLoading(true);
      axios.get(`/auth/apps/${router.query.clientId}`).then(({ data }) => {
        if (data.success === false) {
          setError("Invalid Client ID");
          setLoading(false);
        } else {
          if (data.alreadyAuthorized) {
            window.location.href = data.redirectTo;
          } else {
            setApp(data.app);
            setLoading(false);
          }
        }
      });
    }
  }, [router.query]);

  return (
    <div className={styles.main}>
      {loading ? (
        <Loader center={true} />
      ) : error ? (
        <div className={styles.main__error}>{error}</div>
      ) : (
        <div className={styles.main__container}>
          <img src={app.logo} />
          <h2>
            Authorize <span>{app.name}</span> to access your account
          </h2>
          <p>{app.description}</p>
          <div style={{ flex: 1 }} />
          <PrimaryButton
            loading={authorizing}
            className={styles.main__container__button}
            onClick={async () => {
              setAuthorizing(true);
              const { data } = await axios.post(
                "/auth/authorize?clientId=" + clientId
              );
              console.log(data);
              if (data.success) {
                window.location.href = data.redirectTo;
              }
              setAuthorizing(false);
            }}
          >
            Authorize
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default OAuthContent;
