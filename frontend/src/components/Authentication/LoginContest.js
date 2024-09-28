import React, { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn1, setIsLoggedIn1] = useState(() => {
    // Check localStorage for the authentication state
    return localStorage.getItem("isLoggedIn1") === "true";
  });

  useEffect(() => {
    // Update localStorage whenever isLoggedIn state changes
    localStorage.setItem("isLoggedIn1", isLoggedIn1);
  }, [isLoggedIn1]);

  return (
    <LoginContext.Provider value={{ isLoggedIn1, setIsLoggedIn1 }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth1 = () => useContext(LoginContext);
