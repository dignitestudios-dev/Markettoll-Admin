import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserData, setUserData] = useState(false);
  const [loader, setLoader] = useState(false)
  const [showModal,setShowModal]=useState(false);
  const token = Cookie.get("data");
  const navigate = useNavigate("")
  useEffect(() => {
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        console.log("data", parsedToken);
        setUserData(parsedToken);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token]);
  const ToggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, ToggleUser, setUserData, isUserData, loader, setLoader,setShowModal,showModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
