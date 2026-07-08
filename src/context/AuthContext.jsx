/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
    return res.data;
  };

  useEffect(() => {
    const token = localStorage.getItem("mt_token");
    if (token) {
      fetchMe()
        .catch(() => {
          localStorage.removeItem("mt_token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("mt_token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const register = async (payload) => {
    const res = await api.post("/auth/register", payload);
    localStorage.setItem("mt_token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const googleLogin = async (role) => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const res = await api.post("/auth/google-login", {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoUrl: firebaseUser.photoURL,
      firebaseUid: firebaseUser.uid,
      role: role || null,
    });

    localStorage.setItem("mt_token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const refreshUser = async () => {
    try {
      await fetchMe();
    } catch {
      // silent fail — token may have expired, handled by the axios 401 interceptor
    }
  };

  const logout = () => {
    localStorage.removeItem("mt_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);