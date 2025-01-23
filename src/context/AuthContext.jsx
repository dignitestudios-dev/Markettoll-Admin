import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import BASE_URL from "../constants/BaseUrl";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserData, setUserData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blockedModal, setBlockedModal] = useState(false);
  const [DesclimarModal, setDesclimarModal] = useState(false);
  const [SubCatModal, setSubCatModal] = useState(false);
  const [ViewSubCatModal, setViewSubCatModal] = useState(false);
  const [FilterMonthUser, setFilterMonthUser] = useState("");

  const token = Cookie.get("data");
  const navigate = useNavigate("");
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

  const [Categories, SetCategories] = useState([]);

  useEffect(() => {
    setLoader(true);
    const token = isUserData?.token;
    fetch(`${BASE_URL}/users/product-categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetCategories(res?.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false);
      });
  }, [isUserData]);

  const ToggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <AuthContext.Provider
      value={{
        SubCatModal,
        setSubCatModal,
        FilterMonthUser,
        setFilterMonthUser,
        DesclimarModal,
        setDesclimarModal,
        isLoggedIn,
        setIsLoggedIn,
        ToggleUser,
        setUserData,
        SetCategories,
        Categories,
        isUserData,
        loader,
        setLoader,
        setShowModal,
        showModal,
        setBlockedModal,
        blockedModal,
        ViewSubCatModal,
        setViewSubCatModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
