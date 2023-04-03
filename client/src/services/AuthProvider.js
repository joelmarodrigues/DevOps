import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import useFetchUserRole from "./useFetchUserRole";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const role = useFetchUserRole(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      /* console.log("Auth state changed, user:", user); */
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    role,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
