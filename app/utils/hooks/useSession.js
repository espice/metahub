import { Context as UserContext } from '../context/user';
import { useContext } from 'react';

export default function useSession() {
  const { user, setUser, error, loading, logout, updateUser } =
    useContext(UserContext);
  return { user, setUser, error, loading, logout, updateUser };
}
