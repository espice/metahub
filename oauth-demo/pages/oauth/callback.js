import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import axios from "axios";

const Callback = () => {
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      setError(null);
      setCode(router.query.code);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/access_token?code=${router.query.code}&clientId=${process.env.NEXT_PUBLIC_CLIENT_ID}&clientSecret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        )
        .then((res) => {
          //   console.log(res.data);
          if (res.data.success === false) {
            setError("Invalid Code");
          } else {
            localStorage.setItem("accessToken", res.data.access_token);
            router.push("/");
          }
        });
    } else {
      setError("Invalid Code");
    }
  }, [router.query]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? error : null}
      {!error ? <Loader center /> : null}
    </div>
  );
};

export default Callback;
