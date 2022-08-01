import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Callback = () => {
  const [code, setCode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code);
    }
  }, [router.query]);

  return <div>{code}</div>;
};

export default Callback;
