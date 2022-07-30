import '../styles/globals.scss';

import { UserProvider as UserContextProvider } from '../utils/context/user';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <UserContextProvider> */}
        <Component {...pageProps} />
      {/* </UserContextProvider> */}
    </>
  );
}

export default MyApp;
