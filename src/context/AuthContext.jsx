import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserData, setUserData] = useState(false);

  useEffect(() => {
    const token = Cookie.get("data");
    if (token) {
      setUserData(JSON.parse(token))
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const ToggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, ToggleUser,setUserData,isUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
