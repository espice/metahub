import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "../axios";
const Context = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = async () => {
    const { data } = await axios.post("/auth/logout");
    if (data.success) {
      return setUser(null);
    }
    return setError(data.message);
  };

  const fetchUser = async () => {
    const { data } = await axios.get("/auth/me");
    if (data.success) {
      setUser(data.user);
    }

    if (!["/", "/login", "/register"].includes(window.location.pathname)) {
      window.location.pathname = "/";
      setLoading(false);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = async (user) => {
    const { data } = await axios.get("/auth/me");
    if (data.success) {
      setUser(data.user);
      return data.user;
    }
    return setError(data.message);
  };

  return (
    <Context.Provider
      value={{ user, setUser, error, loading, logout, updateUser }}
    >
      {children}
    </Context.Provider>
  );
}

const useUserContext = () => useContext(Context);

export { UserProvider, useUserContext, Context };
